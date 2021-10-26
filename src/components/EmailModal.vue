<template>
  <Modal @keydown.esc="onKeyDown" :is-open="false" :blur="false" @close="$emit('close')">
    <div  class="pt-5 backdrop-blur-none max-h-screen">
      <div class="pb-8">
        <Button class="mr-4" label="Archived" @click="archiveEmail" />
        <Button class="mr-4" label="Mark Unread" @click="markUnread" />
        <Button class="mr-4" label="Newer" @click="nextEmail" />
        <Button class="mr-4" label="Older" @click="prevEmail" />
      </div>
      <div class="text-2xl font-bold">Subject: {{ subject }}</div>
      <div>from {{ contact }}</div>
    </div>
  </Modal>
</template>

<script lang="ts">
import Button from "./Button.vue";
import Modal from "./Modal.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    Modal,
    Button,
  },
  props: {
    subject: { type: String, default: "" },
    contact: { type: String, default: "" },
  },
  emits: ["close", "archive", "unread", "newer", "older"],
  setup(_, { emit }) {
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

     function onKeyDown() {
      console.log("key down")
      // const val = (event.target as KeyboardEvent.value)
    //   if(event.key == "scape") {
        emit("close")
    //   }
    }

    return { archiveEmail, markUnread, nextEmail, prevEmail, closeModal, onKeyDown };
  },
});
</script>
