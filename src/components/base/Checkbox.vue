<template>
  <div>
    <input
      :disabled="disabled"
      :checked="modelValue"
      type="checkbox"
      class="
        rounded
        w-4
        h-4
        border border-black
        focus:ring-0 focus:ring-offset-0
        cursor-pointer
      "
      @input="$emit('update:modelValue', !modelValue)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";

export default defineComponent({
  props: {
    modelValue: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
});
</script>
