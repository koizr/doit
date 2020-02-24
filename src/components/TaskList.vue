<template>
  <v-list>
    <v-subheader>2019/11/20</v-subheader>
    <v-list-item-group color="primary">
      <template v-for="(task, index) in tasks">
        <task-list-item :task="task" :key="task.id" />
        <v-divider
          v-if="index + 1 < tasks.length"
          :key="'task-list-divider:' + task.id"
        ></v-divider>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import TaskListItem from "./TaskListItem.vue";

export default Vue.component("task-list", {
  name: "TaskList",
  components: {
    TaskListItem
  },
  data() {
    return {
      tasks: [
        {
          id: "1",
          title: "タスク1",
          done: false,
          dueDate: new Date("2019-12-25 23:59:59"),
          completedDate: null,
          expectedTotalDuration: null,
          durations: []
        },
        {
          id: "2",
          title: "タスク2",
          done: true,
          dueDate: new Date("2019-11-08 12:00:00"),
          completedDate: new Date("2019-11-10 12:00:00"),
          expectedTotalDuration: 2,
          durations: [4]
        },
        {
          id: "3",
          title: "タスク3",
          done: true,
          dueDate: new Date("2019-12-25 23:59:59"),
          completedDate: new Date("2019-12-23 12:15:20"),
          expectedTotalDuration: 7,
          durations: [5, 0.5, 1]
        },
        {
          id: "4",
          title: "タスク4",
          done: false,
          dueDate: null,
          completedDate: null,
          expectedTotalDuration: null,
          durations: []
        },
        {
          id: "5",
          title: "タスク5",
          done: false,
          dueDate: new Date("2019-12-25 23:59:59"),
          completedDate: null,
          expectedTotalDuration: null,
          durations: []
        }
      ]
    };
  }
});
</script>
