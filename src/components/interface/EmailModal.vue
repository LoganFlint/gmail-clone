<template>
  <Modal :is-open="isOpen" blur @close="$emit('close')">
    <div class="pt-5 backdrop-blur-none max-h-screen">
      <div class="pb-8">
        <Button
          data-cy="archive-button"
          keydown="(e)"
          class="mr-4"
          :label="state.email.archived === true ? 'Un-Archive' : 'Archive'"
          :color="state.email.archived === true ? 'blue' : ''"
          @click="toggleArchived"
        />
        <Button
          keydown="(r)"
          class="mr-4"
          :label="state.email.read === true ? 'Mark-Unread' : 'Mark-Read'"
          :color="state.email.read === true ? 'blue' : ''"
          @click="toggleReadMail"
        />
        <Button data-cy="next-email" keydown="(k)" class="mr-4" label="Newer" @click="nextEmail" />
        <Button data-cy="prev-email" keydown="(j)" class="mr-4" label="Older" @click="prevEmail" />
      </div>
      <div class="text-2xl font-bold pr-16 pb-3">
        Subject: <span class="pl-1"> {{ state.email.subject }} </span>
      </div>
      <div class="text-lg">
        From <span class="italic">{{ state.email.from }}</span> on
        <span>{{ new Date(state.email.sentAt).toLocaleString() }}</span>
      </div>
      <div class="pt-10 pr-32">
        {{ state.email.body }}
      </div>
      <Button
        data-cy="reply-to-email"
        class="mt-4 flex justify-center"
        label="Reply"
        @click="$emit('sendReply')"
      />
    </div>
  </Modal>
</template>

<script lang="ts">
  import {
    getEmailById,
    toggleArchive,
    toggleRead,
    updateEmail,
  } from "../../services/api";
  import { Email } from "../../services/modules/emails";
  import { defineComponent, reactive, watch } from "vue";
  export default defineComponent({
    props: {
      modelValue: { type: Number, required: true },
      isOpen: { type: Boolean, default: false },
    },
    emits: ["update:modelValue", "close", "emailsUpdated", "sendReply"],
    setup(props, { emit }) {
      const state = reactive({
        email: {} as Email,
        open: props.isOpen,
        id: props.modelValue,
      });

      function toggleArchived(): void {
        toggleArchive(state.email).then((res) => {
          state.email = res;
        });
        emit("emailsUpdated");
      }

      function toggleReadMail() {
        toggleRead(state.email).then((res: Email) => {
          state.email = res;
        });
        emit("emailsUpdated");
      }

      function nextEmail() {
        getEmailById(props.modelValue + 1).then((res) => {
          state.email = res;
          state.email.read = true;
          updateEmail(state.email);
        });
        emit("update:modelValue", props.modelValue + 1);
      }

      function prevEmail() {
        getEmailById(props.modelValue - 1).then((res) => {
          state.email = res;
          state.email.read = true;
          updateEmail(state.email);
        });
        emit("update:modelValue", props.modelValue - 1);
      }

      watch(
        () => props.modelValue,
        () => {
          state.id = props.modelValue;
          getEmailById(props.modelValue).then((res) => {
            state.email = res;
          });
        }
      );

      return {
        toggleArchived,
        toggleReadMail,
        nextEmail,
        prevEmail,
        state
      };
    },
  });
</script>
