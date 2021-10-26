<template>
  <div>
    <EmailModal
      :blur="false"
      :is-open="true"
      @close="handleMouseDrag"
    >
      <div class="max-w-lg pr-20 pt-12 pl-16 flex flex-col max-h-screen overflow-scroll">
      HELLOOOOO
      </div>
    </EmailModal>
  </div>
</template>

<script lang="ts">
import EmailModal from "./EmailModal.vue"
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        EmailModal
    },
    props: {
        isOpen: Boolean,
        blur: Boolean
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