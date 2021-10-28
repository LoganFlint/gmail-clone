<template>
  <div class="relative">
    <div class="relative">
      <input
        v-if="small"
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        class="rounded cursor-auto outline-none border border-unicornSilver ml-2 pl-3"
        v-bind="$attrs"
        @input="updateValue"
      />
      <textarea
        v-else
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        class="focus:outline-none outline-none border border-unicornSilver focus:border-lbBlue text-gray rounded h-72 pr-3 pt-2 pl-4"
        v-bind="$attrs"
        @input="updateValue"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({
    props: {
      modelValue: { type: [String, Number], default: null },
      placeholder: { type: String, default: null },
      inputType: { type: String, default: "" },
      small: Boolean,
    },
    emits: ["update:modelValue"],

    setup(_, { emit }) {
      function updateValue(event: Event) {
        emit("update:modelValue", (event.target as HTMLInputElement).value);
      }
      return { updateValue };
    },
  });
</script>
