<template>
  <div>
    <input
      :disabled="disabled"
      :checked="modelValue"
      type="checkbox"
      class="rounded w-4 h-4 border border-black focus:ring-0 focus:ring-offset-0"
      @input="toggle"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
    props: {
        modelValue: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false }
    },
    emits: [
        "update:modelValue"
    ],
    setup(props, context){
        const state = reactive({
            checked: false
        });

        function toggle(): void {
            if(props.disabled === true) return;
            state.checked = !state.checked;
            context.emit("update:modelValue", state.checked);
        }

        return {
            state,
            toggle
        }
    }
});
</script>