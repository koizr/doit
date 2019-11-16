<template>
  <div class="home">
    <task-list />
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";

export default {
  name: "home",
  components: {
    TaskList
  }
};
</script>
