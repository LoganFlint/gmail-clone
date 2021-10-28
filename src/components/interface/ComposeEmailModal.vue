<template>
   <Modal :is-open="isOpen" blur @close="$emit('close')">
    <div class="pt-5 max-h-screen pb-5">
        <div class="flex items-center pt-8 pb-4">
            <div class="text-lg"> To: </div>
            <input class="rounded cursor-auto outline-none border border-unicornSilver w-full ml-2 pl-3" :placeholder="state.email.from"
                readonly />
            </div>
        <div class="border border-unicornSilver rounded w-full pt-2 pb-5 pl-3 pr-3">
            <div class="text-sm pr-10 pt-1 pb-5 font-light">"{{state.email.body}}"</div>
            <textarea v-model="emailBody" class="focus:outline-none outline-none border border-unicornSilver focus:border-lbBlue  text-gray rounded w-full h-72 pr-3 pt-2 pl-4"
                placeholder="Email Body">
            </textarea>
        </div>
         <Button
          class="mt-4 flex justify-center"
          label="Send"
          @click="sendAnEmail"
        />
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue"
import { Email, getEmailById } from "../../services/modules/emails";
export default defineComponent({
    props: {
        isOpen: { type: Boolean, default: false },
        modelValue: { type: Number, default: 0},
    },
  emits: ["close", "update:modelValue"],
  setup(props) {

    const state = reactive({
      email: {} as Email,
    });

    function sendAnEmail() {
        console.log("")
    }

    const emailBody = ref<string>("")
    const to = ref<string>(state.email.from)

    watch(
      () => props.modelValue,
      () => {
        getEmailById(props.modelValue).then((res) => {
          state.email = res;
        });
      }
    );

    return { state, emailBody, sendAnEmail, to }
  }
})
</script>

