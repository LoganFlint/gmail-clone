<template>
  <div class="relative">
    <div class="relative">
      <input
        v-if="small"
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        :class="{
          'rounded cursor-auto outline-none border border-unicornSilver ml-2 pl-3': small,
        }"
        v-bind="$attrs"
        @input="updateValue"
        @focus="state.focused = true"
        @blur="state.focused = false"
      />
      <textarea
        v-else
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        :class="{
          'focus:outline-none outline-none border border-unicornSilver focus:border-lbBlue text-gray rounded h-72 pr-3 pt-2 pl-4': !small,
        }"
        v-bind="$attrs"
        @input="updateValue"
        @focus="state.focused = true"
        @blur="state.focused = false"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from "vue";
  export default defineComponent({
    props: {
      modelValue: { type: [String, Number], default: null },
      placeholder: { type: String, default: null },
      inputType: { type: String, default: "" },
      small: Boolean,
    },
    emits: ["update:modelValue"],

    setup(props, { emit }) {
      const state = reactive({
        focused: false,
      });

      function updateValue(event: Event) {
        emit("update:modelValue", (event.target as HTMLInputElement).value);
      }

      return { updateValue, state };
    },
  });
</script>
