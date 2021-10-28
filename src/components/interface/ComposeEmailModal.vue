<template>
   <Modal :is-open="isOpen" blur @close="$emit('close')">
    <div class="pt-5 max-h-screen">
      <div class="text-lg">
        To: {{ state.email.from }}
      </div>

    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import { Email } from "../../services/modules/emails";
export default defineComponent({
    props: {
        isOpen: { type: Boolean, default: false },
  },
  emits: ["close"],
  setup() {

    const state = reactive({
      email: {} as Email,
    });

    return { state }
  }
})
</script>

