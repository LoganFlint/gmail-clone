<template>
  <div
    class="flex flex-col text-center items-center transition-all duration-300 cursor-pointer"
    data-cy="action-bar-item"
  >
    <img
      class="w-8 h-8 p-1"
      :src="icon"
      @mouseover="state.showLabel = true"
      @mouseleave="state.showLabel = false"
    >
    <div
      data-cy="label"
      class="whitespace-nowrap text-sm bg-black bg-opacity-75 text-white px-3 rounded transition-all duration-300 mt-4"
      :class="{
        'invisible opacity-0': state.showLabel === false
      }"
    >
      {{ label }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
    props: {
        icon: { type: String, required: true },
        label: { type: String, default: "" }
    },
    setup(){
        const state = reactive({
            showLabel: false
        });

        return {
            state
        }
    }
});
</script>