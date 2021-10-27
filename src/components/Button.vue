<template>
  <button
    class="
      py-4
      px-5
      border-2 border-unicornSilver
      rounded
      font-mono
      text-lg
      whitespace-nowrap
    "
  >
    <div class="flex">
      <div class="pr-3  tracking-wider">{{ label }}</div>
      <div v-if="keydown">{{ keydown }}</div>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: { type: String, default: "" },
    keydown: { type: String, default: "" },
  },
});
</script>
