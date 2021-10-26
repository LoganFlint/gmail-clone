<template>
  <Modal
    :is-open="isOpen"
    :blur="blur"
    @close="$emit('close')"
  >
    <div
      class="backdrop-blur-none max-h-screen flex bg-white">
      <slot />
    </div>
  </Modal>
  </template>

<script lang="ts">
    import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>

