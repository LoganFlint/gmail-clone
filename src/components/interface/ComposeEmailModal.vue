<template>
  <Modal :is-open="isOpen" blur @close="$emit('close')">
    <div class="pt-5 max-h-screen pb-5">
      <div class="pt-8 pb-4">
        <div class="text-lg pr-8 flex pb-4">
          To:
          <TextInput
            class="w-full"
            v-model="state.email.from"
            small
            readonly
            :placeholder="state.email.from"
          />
        </div>

        <div class="text-lg pr-8 flex">
          Subject:
          <TextInput
            class="w-full"
            v-model="emailSubject"
            small
            placeholder="subject"
          />
        </div>
      </div>
      <div class="border border-unicornSilver rounded pt-2 pb-5 pl-3 pr-3 mr-5">
        <div class="text-sm pr-8 pt-1 pb-5 font-light">
          "{{ state.email.body }}"
        </div>
        <TextInput
          class="w-full"
          v-model="emailBody"
          placeholder="Email Body"
        />
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
  import { defineComponent, reactive, ref, watch } from "vue";
  import { sendEmail } from "../../services/api";
  import { Email, getEmailById } from "../../services/modules/emails";
  export default defineComponent({
    props: {
      isOpen: { type: Boolean, default: false },
      modelValue: { type: Number, default: 0 },
    },
    emits: ["close", "update:modelValue"],
    setup(props) {
      const emailBody = ref<string>("");
      const emailSubject = ref<string>("");

      const state = reactive({
        email: {} as Email,
      });

      function sendAnEmail() {
        sendEmail({
          body: emailBody.value,
          subject: emailSubject.value,
          from: state.email.from,
          archived: false,
          read: false,
          sentAt: new Date().toISOString(),
        } as Email);
        console.log(state.email);
      }

      watch(
        () => props.modelValue,
        () => {
          getEmailById(props.modelValue).then((res) => {
            state.email = res;
          });
        }
      );

      return { state, emailBody, sendAnEmail, emailSubject };
    },
  });
</script>
