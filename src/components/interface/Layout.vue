<template>
  <div class="min-w-[400px]">
    <Inbox />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({

  setup() {
    console.log("from Layout");
  },
});
</script>
