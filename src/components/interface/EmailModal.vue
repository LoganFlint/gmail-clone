<template>
  <Modal
    :is-open="isOpen"
    blur
    @close="$emit('close')"
  >
    <div class="pt-5 backdrop-blur-none max-h-screen">
      <div class="pb-8">
        <Button
          keydown="(e)"
          class="mr-4"
          label="Archived"
          :color="state.email.archived === true? 'blue' : ''"
          @click="toggleArchived"
        />
        <Button
          keydown="(r)"
          class="mr-4"
          label="Mark Unread"
          @click="toggleReadMail"
        />
        <Button
          keydown="(k)"
          class="mr-4"
          label="Newer"
          @click="nextEmail"
        />
        <Button
          keydown="(j)"
          class="mr-4"
          label="Older"
          @click="prevEmail"
        />
      </div>
      <div class="text-2xl font-bold pr-16 pb-3">
        Subject: <span class="pl-1"> {{ state.email.subject }} </span> 
      </div>
      <div class="text-lg">
        From <span class="italic">{{ state.email.from }}</span> on
        <span>{{ state.email.sentAt }}</span>
      </div>
      <div class="pt-10 pr-32">
        {{ state.email.body }}
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import Button from "../base/Button.vue";
import Modal from "../base/Modal.vue";
import { getEmailById, toggleArchive, toggleRead } from "../../services/api";
import { Email } from "../../services/modules/emails";

import { defineComponent, reactive, watch } from "vue";
export default defineComponent({
  components: {
    Modal,
    Button,
  },
  props: {
    emailId: { type: Number, required: true },
    isOpen: { type: Boolean, default: false }
  },
  emits: ["close", "update:modelValue", "unread", "newer", "older"],
  setup(props, { emit }) {
    const state = reactive({
      email: {} as Email,
    });

    function toggleArchived(): void {
      toggleArchive(state.email).then((res) => {
        state.email = res;
      });
    }

    function toggleReadMail(read: boolean) {
      toggleRead(state.email).then((res) => {
        state.email = res
      })
      read = state.email.read
      emit("update:modelValue", read)
      closeModal(read)

    }

    function nextEmail() {
      emit("newer");
    }

    function prevEmail() {
      emit("older");
    }

    function closeModal(read: boolean) {
      console.log("read", read)
      emit("close", read);
    }

    watch(
      () => props.emailId,
      () => {
        getEmailById(props.emailId).then((res) => {
          state.email = res;
        });
      }
    );

    return {
      toggleArchived,
      toggleReadMail,
      nextEmail,
      prevEmail,
      closeModal,
      state,
    };
  },
});
</script>
