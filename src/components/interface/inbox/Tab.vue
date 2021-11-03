<template>
  <div
    data-cy=tab-bar
    class="cursor-pointer flex items-center px-4 py-2 border border-lbBlue rounded hover:bg-lbLightBlue"
    :class="{
      'bg-unicornSilver': modelValue === true
    }"
    @click="selected"
  >
    <img
      class="w-6 h-6 mr-6"
      :src="icon"
    >
    <div>
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Tab",
    props: {
        title: { type: String, required: true },
        modelValue: { type: Boolean, default: false },
        icon: { type: String, required: true }
    },
    emits: [ "update:modelValue" ],
    setup(props, { emit }){
        function selected(): void {
            if(props.modelValue === true) return;
            emit("update:modelValue", true)
        }   
        
        return {
            selected
        }
    }
});
</script>