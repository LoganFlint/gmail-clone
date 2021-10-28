<template>
  <button
    class="
      py-2
      px-5
      border-2 border-unicornSilver
      rounded
      font-mono
      text-sm
      whitespace-nowrap
      transition-all
      duration-300
      w-44
      justify-center
    "
    :class="{
      'bg-lbLightBlue': color === 'blue'
    }"
  >
    <div class="flex">
      <div class="pr-3  tracking-wider">
        {{ label }}
      </div>
      <div>{{ keydown }}</div>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: { type: String, default: "" },
    keydown: { type: String, default: "" },
    color: { type: String, default: "" }
  },
});
</script>
