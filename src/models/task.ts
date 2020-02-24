import uuid from "uuid";
import { Optional } from "@/util/types";

export type Task = Readonly<{
  id: string;
  title: string;
  note: string;
  expectedTotalDuration?: number;
  duration: number;
  dueDate?: Date;
  completedDate?: Date;
}>;

export type Start = Readonly<{
  type: "start";
  taskId: Task["id"];
  at: Date;
}>;

/**
 * Start constructor
 */
const Start = (taskId: Start["taskId"], at: Start["at"]): Start => ({
  type: "start",
  taskId,
  at
});

export type Stop = Readonly<{
  type: "stop";
  taskId: Task["id"];
  at: Date;
}>;

/**
 * Stop constructor
 */
const Stop = (taskId: Stop["taskId"], at: Stop["at"]): Stop => ({
  type: "stop",
  taskId,
  at
});

export type Doing = Start | Stop;

/**
 * タイトルだけ入力して未完了タスクを生成する
 */
export const todoQuick = (title: string): Task => ({
  id: uuid.v4(),
  title: title,
  note: "",
  duration: 0
});

/**
 * タスクの想定所要時間を設定する
 */
export const setExpectedDuration = (task: Task, duration: number): Task => ({
  ...task,
  expectedTotalDuration: duration
});

/**
 * タスクの期限を設定する
 */
export const setDueDate = (task: Task, dueDate: Date): Task => ({
  ...task,
  dueDate: dueDate
});

/**
 * タスクの実行を開始する
 */
export const start = (task: Task, startedAt: Date): Start =>
  Start(task.id, startedAt);

/**
 * タスクの実行を停止する
 */
export const stop = (
  task: Task,
  stoppedAt: Date,
  start: Start
): [Task, Stop] => [
  timeGoesBy(task, diffTime(start.at, stoppedAt)),
  Stop(task.id, stoppedAt)
];

export const complete = (
  task: Task,
  completedAt: Date,
  unstoppedStart?: Start
): [Task, Optional<Stop>] => {
  if (unstoppedStart) {
    const [t, s] = stop(task, completedAt, unstoppedStart);
    return [{ ...t, completedDate: completedAt }, s];
  }
  return [{ ...task, completedDate: completedAt }, undefined];
};

const timeGoesBy = (task: Task, duration: Task["duration"]): Task => ({
  ...task,
  duration: task.duration + duration
});

const diffTime = (past: Date, future: Date): number =>
  timestampToHours(future.getTime() - past.getTime());

const timestampToHours = (ts: number): number =>
  cutDecimal(ts / 1000 / 60 / 60, 1);

/**
 * 小数点切り捨て
 * @param n 対象の数値
 * @param level 小数第何位まで残すか。小数全部なくすなら 0
 */
const cutDecimal = (n: number, level: number): number =>
  level === 0 ? Math.floor(n) : Math.floor(n * (level * 10)) / (level * 10);
