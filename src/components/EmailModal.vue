<template>
    <teleport
    to="#modal"
    class="modal"
  >
    <div
      :class="[
        'fixed z-30 inset-0 transform transition-all duration-300 ease-in-out',
        {
          'opacity-100 filter': isOpen,
        },
        { 'opacity-0 invisible filter none': !isOpen },
        { 'backdrop-filter backdrop-blur-[5px]': blur },
      ]"
    >
      <div
        class="flex flex-col min-h-screen items-center justify-center bg-black bg-opacity-30"
        @mousedown.stop="handleMouseDrag"
      >
        <div
          :class="['transition-all duration-300 transform z-50']"
          @mousedown.stop
        >
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        isOpen: Boolean,
        blue: Boolean
    },
    emits: ["close"],
    setup(_, {emit}) {
        function handleMouseDrag(event: MouseEvent) {
            if(event.button == 0) {
                emit("close")
            }
        }
        return {handleMouseDrag}
    }
})
</script>