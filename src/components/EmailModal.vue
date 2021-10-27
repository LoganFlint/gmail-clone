<template>
  <Modal :is-open="false" :blur="false" @close="$emit('close')">
    <div class="pt-5 backdrop-blur-none max-h-screen">
      <div class="pb-8">
        <Button
          keydown="(e)"
          class="mr-4"
          label="Archived"
          @click="archiveEmail"
        />
        <Button
          keydown="(r)"
          class="mr-4"
          label="Mark Unread"
          @click="markUnread"
        />
        <Button keydown="(k)" class="mr-4" label="Newer" @click="nextEmail" />
        <Button keydown="(j)" class="mr-4" label="Older" @click="prevEmail" />
      </div>
      <div class="text-2xl font-bold pr-16 pb-3">
        Subject: <span class="pl-1"> {{ state.email.subject }} </span> 
      </div>
      <div class="text-lg">
        From <span class="italic">{{ state.email.from }}</span> on
        <span>{{ state.email.sentAt }}</span>
      </div>
      <div class="pt-10 pr-32">{{ state.email.body }}</div>
    </div>
  </Modal>
</template>

<script lang="ts">
import Button from "./Button.vue";
import Modal from "./Modal.vue";
import { getEmailById, updateEmail, requestEmails } from "../services/api";
import { Email } from "../services/modules/emails";

import { defineComponent, reactive, watch } from "vue";
export default defineComponent({
  components: {
    Modal,
    Button,
  },
  props: {
    emailId: { type: Number, required: true },
  },
  emits: ["close", "unread", "newer", "older"],
  setup(props, { emit }) {
    const state = reactive({
      email: {} as Email,
    });
    function archiveEmail() {
      updateEmail(state.email, state.email.archived).then((res) => {
        if (state.email.archived == false) {
          state.email.archived = true
          console.log(state.email.archived)
        } else if ( state.email.archived == true) {
          state.email.archived = false
          console.log(state.email.archived)
        }
        return res
      })
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
        console.log(props.emailId);
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
