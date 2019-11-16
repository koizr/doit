<template>
  <v-list-item color="primary">
    <v-list-item-action>
      <v-row align="center" justify="center">
        <v-checkbox v-model="task.done"></v-checkbox>
      </v-row>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>{{ task.title }}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-content>
      <v-list-item-subtitle>
        <span v-if="task.expectedTotalDuration"
          >{{ task.expectedTotalDuration }}h</span
        >
        <span v-if="task.expectedTotalDuration" class="ml-3 mr-3">=></span>
        <span v-if="taskTotalDuration">{{ taskTotalDuration }}h</span>
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <div class="mr-3" v-if="task.dueDate">
          Due: {{ task.dueDate | formatDateTime }}
        </div>
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <div v-if="task.completedDate">
          Completed: {{ task.completedDate | formatDateTime }}
        </div>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.component("task-list-item", {
  name: "TaskListItem",
  props: {
    task: Object
  },
  computed: {
    taskTotalDuration(): number {
      return this.task.durations.reduce((sum: number, n: number) => sum + n, 0);
    }
  }
});
</script>
