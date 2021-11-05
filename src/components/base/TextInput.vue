<template>
  <div class="relative">
    <div class="relative">
      <input
        v-if="small"
        :type="inputType"
        :placeholder="placeholder"
        class="rounded cursor-auto outline-none border border-unicornSilver ml-2 pl-3"
        v-bind="$attrs"
        v-model="value"
      />
      <textarea
        v-else
        :type="inputType"
        :placeholder="placeholder"
        v-model="value"
        class="focus:outline-none outline-none border border-unicornSilver focus:border-lbBlue text-gray rounded h-72 pr-3 pt-2 pl-4"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { useVModel } from "@vueuse/core";

  export default defineComponent({
    props: {
      modelValue: { type: [String, Number], default: null },
      placeholder: { type: String, default: null },
      inputType: { type: String, default: "" },
      small: Boolean,
    },
    emits: ["update:modelValue"],

    setup(props, { emit }) {
      const value = useVModel(props, 'modelValue', emit);
      return { value };
    },
  });
</script>
