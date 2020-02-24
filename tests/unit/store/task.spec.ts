import {
  Task,
  todoQuick,
  setExpectedDuration,
  setDueDate,
  stop,
  Start,
  start,
  complete
} from "@/models/task";

describe("task", () => {
  describe("todoQuick", () => {
    it("make a task", () => {
      const task = todoQuick("task title");
      expect(task.id.length).toBe(36);
      expect(task.title).toBe("task title");
      expect(task.note).toBe("");
      expect(task.completedDate).toBeUndefined();
      expect(task.dueDate).toBeUndefined();
      expect(task.expectedTotalDuration).toBeUndefined();
      expect(task.duration).toBe(0);
    });
  });

  describe("setExpectedDuration", () => {
    it("set duration to task", () => {
      const task = setExpectedDuration(todoQuick("title"), 3);
      expect(task.expectedTotalDuration).toBe(3);
    });
  });

  describe("setDueDate", () => {
    it("set duration to task", () => {
      const task = setDueDate(todoQuick("title"), new Date("2020-01-01 12:30"));
      expect(task.dueDate).toEqual(new Date("2020-01-01 12:30"));
    });
  });

  describe("start", () => {
    it("start task", () => {
      const task = todoQuick("title");
      const s = start(task, new Date("2020-01-10 15:00"));
      expect(s.taskId).toEqual(task.id);
      expect(s.at).toEqual(new Date("2020-01-10 15:00"));
    });
  });

  describe("stop", () => {
    it("stop task", () => {
      const originalTask = todoQuick("task title");
      const [task, stopEvent] = stop(
        originalTask,
        new Date("2020-01-31 10:50"),
        start(originalTask, new Date("2020-01-31 9:20"))
      );
      expect(task.duration).toBe(1.5);
      expect(stopEvent.taskId).toEqual(originalTask.id);
      expect(stopEvent.at).toEqual(new Date("2020-01-31 10:50"));
    });
  });

  describe("complete", () => {
    it("complete task", () => {
      const task = todoQuick("task title");
      const [completed, stopped] = complete(task, new Date("2020-02-01 11:20"));
      expect(completed.completedDate).toEqual(new Date("2020-02-01 11:20"));
    });
  });
});
