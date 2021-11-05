<template>
  <div
    class="cursor-pointer flex items-center px-4 py-2 border border-lbBlue rounded hover:bg-lbLightBlue"
    :class="{
      'bg-unicornSilver': modelValue === true
    }"
    @click="selected"
  >
    <component
      class="w-6 h-6 mr-6"
      :is="icon"
    />
    <div data-cy="tab-label">
      {{ title }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
  modelValue: { type: Boolean, default: false },
  icon: { type: Object, required: true }
});

const emit = defineEmits([ "update:modelValue" ]);

function selected() {
  if (props.modelValue === true) return;

  emit("update:modelValue", true)
}
</script>
