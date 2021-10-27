<template>
  <Modal :is-open="isOpen" blur @close="$emit('close')">
    <div class="pt-5 backdrop-blur-none max-h-screen">
      <div class="pb-8">
        <Button
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
          :color="state.email.blue === true ? 'blue' : ''"
          @click="toggleReadMail"
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
      <div class="pt-10 pr-32">
        {{ state.email.body }}
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import Button from "../base/Button.vue";
import Modal from "../base/Modal.vue";
import {
  getEmailById,
  toggleArchive,
  toggleRead,
  updateEmail,
} from "../../services/api";
import { Email } from "../../services/modules/emails";
import { defineComponent, reactive, watch } from "vue";
export default defineComponent({
  components: {
    Modal,
    Button,
  },
  props: {
    modelValue: { type: Number, required: true },
    isOpen: { type: Boolean, default: false },
  },
  emits: ["update:modelValue", "close", "read", "unread", "archived"],
  setup(props, { emit }) {
    const state = reactive({
      email: {} as Email,
    });

    function toggleArchived(archived: boolean): void {
      toggleArchive(state.email).then((res) => {
        state.email = res;
      });
      archived = state.email.archived;
      emit("archived", archived);
      console.log(archived)
      closeModal();
    }

    function toggleReadMail(read: boolean) {
      toggleRead(state.email).then((res) => {
        state.email = res;
      });
      read = state.email.read;
            console.log(read)

      emit("read", read);
      closeModal();
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

    function closeModal() {
      emit("close");
    }

    watch(
      () => props.modelValue,
      () => {
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
      closeModal,
      state,
    };
  },
});
</script>
