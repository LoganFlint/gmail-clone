<template>
   <Modal :is-open="isOpen" blur @close="$emit('close')">
    <div class="pt-5 max-h-screen pb-5">
        <div class="flex items-center mt-8">
            <div class="text-lg"> To: </div>
            <input class="outline-none border border-unicornSilver h-auto w-full  ml-2 pt-2 pl-3.5"
                readonly />
            </div>
  
      <textarea
        v-model="emailBody"
        class="focus:ring-0 border border-unicornSilver focus:border-black focus:border-solid resize-none h-96 w-full mt-4 pt-2 pl-3.5"
        placeholder="Email Body"
        />

         <Button
          class="mt-4 flex justify-center"
          label="Send"
          @click="sendAnEmail"
        />
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
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

    function sendAnEmail() {
        console.log("sends the email")
    }

    const emailBody = ref<string>("")
    return { state, emailBody, sendAnEmail }
  }
})
</script>

