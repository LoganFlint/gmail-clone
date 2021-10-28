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
          :color="state.email.read === true ? 'blue' : ''"
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
       <Button
          class="mt-4 flex justify-center"
          label="Reply"
          @click="openReply"
        />
        <ComposeEmailModal  
          v-model="state.id"
          :is-open="showReply"
          @close="closeModal"
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
import { defineComponent, reactive, ref, watch } from "vue";
export default defineComponent({
  props: {
    modelValue: { type: Number, required: true },
    isOpen: { type: Boolean, default: false },
  },
  emits: ["update:modelValue", "close", "emailsUpdated"],
  setup(props, { emit }) {
    const state = reactive({
      email: {} as Email,
      open: props.isOpen,
      id: props.modelValue
    });

    function toggleArchived(archived: boolean): void {
      toggleArchive(state.email).then((res) => {
        state.email = res;
      });
      archived = state.email.archived;
      emit("emailsUpdated");
      console.log(archived)
    }

    function toggleReadMail(read: boolean) {
      toggleRead(state.email).then((res: Email) => {
        state.email = res;
      });
      read = state.email.read;
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

    const showReply = ref(false) 

    function openReply() { 
      state.open = !state.open
      emit("close")
      showReply.value = true
    }

  function handleSendTo(): void {
    console.log()
    }

    function closeModal() {
      showReply.value = false
      emit("close");
    }

    watch(
      () => props.modelValue,
      () => {
        state.id = props.modelValue
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
      openReply,
      showReply,
      handleSendTo
    };
  },
});
</script>
