<template>
  <div
    class="absolute -z-50 top-0 left-0 w-full h-full min-h-screen"
    :class="{
      invisible: !isOpen,
      'filter blur-lg': blur === true,
    }"
    @click="handleMouseDrag"
  >
    <teleport to="#modal">
      <div
        :class="[
          'min-w-64 max-h-screen overflow-y-auto my-10 mx-40 fixed inset-0 bg-white border border-black rounded',
          'transform transition-all duration-300 ease-out',
          {
            'scale-1 opacity-100': isOpen,
            'scale-0 opacity-0 invisible': !isOpen,
          },
        ]"
      >
        <div>
          <img
            data-cy="close-modal"
            src="../../assets/close.svg"
            class="absolute right-5 top-2 z-50 cursor-pointer w-8 h-8 p-1.5"
            @click="
              $emit('close')
            "
          />
          <div class="w-full px-6">
            <slot  />
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isOpen: Boolean,
    blur: Boolean,
  },
  emits: ["close"],
  setup(_, { emit }) {
    function handleMouseDrag(event: MouseEvent) {
      if (event.button == 0) {
        emit("close");
      }
    }

    return { handleMouseDrag };
  },
});
</script>
