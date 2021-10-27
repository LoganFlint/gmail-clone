<template>
  <Modal
    :is-open="isOpen"
    :blur="false"
    @close="$emit('close')"
  >
    <div class="pt-5 backdrop-blur-none max-h-screen">
      <div class="pb-8">
        <Button
          class="mr-4"
          label="Archived"
          @click="archiveEmail"
        />
        <Button
          class="mr-4"
          label="Mark Unread"
          @click="markUnread"
        />
        <Button
          class="mr-4"
          label="Newer"
          @click="nextEmail"
        />
        <Button
          class="mr-4"
          label="Older"
          @click="prevEmail"
        />
      </div>
      <div class="text-2xl font-bold pr-16 pb-3">
        Subject:{{ state.email.subject }}
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
import { getEmailById } from "../../services/api";
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
  emits: ["close", "archive", "unread", "newer", "older"],
  setup(props, { emit }) {
    const state = reactive({
      email: {} as Email,
    });
    function archiveEmail() {
      emit("archive");
    }

    function markUnread() {
      emit("unread");
    }

    function nextEmail() {
      emit("newer");
    }

    function prevEmail() {
      emit("older");
    }

    function closeModal() {
      emit("close");
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
      archiveEmail,
      markUnread,
      nextEmail,
      prevEmail,
      closeModal,
      state,
    };
  },
});
</script>
