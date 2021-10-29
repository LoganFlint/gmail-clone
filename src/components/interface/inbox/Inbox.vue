<template>
  <div class="p-8 m-auto flex w-full justify-center items-center">
    <img src="../../../assets/launchBadgeLogo.svg">
    <div class="font-bold text-xl m-3">
      launchmail
    </div>
  </div>

  <div class="flex items-center">
    <ActionMenu
      class="mr-4"
      :open="state.showActionMenu"
      :mode="state.mode"
      @select-all="selectAll"
      @delete-selected="markDelete"
      @undelete-selected="unmarkDelete"
      @archive-selected="archiveSelected"
      @unarchive-selected="unarchiveSelected"
      @read-selected="readSelected"
      @unread-selected="unreadSelected"
      @send-email="quickSend"
    />
  </div>

  <TabBar
    v-model="state.mode"
    class="ml-16 mb-8"
  />

  <div v-if="current.length > 0">
    <div
      v-for="(email, i) in current"
      :key="email.email.id"
    >
      <EmailItem
        v-model="state.emails[i].selected"
        :email="email.email"
        :index="i"
        @open-email="openEmail"
        @update:model-value="handleActionMenu"
        @send-reply="openSend"
      />
    </div>
  </div>

  <div
    v-else
    class="w-full font-xl font-bold text-center mt-24"
  >
    There's nothing to show here!
  </div>

  <EmailModal
    v-model="state.open"
    :is-open="state.showEmail"
    @close="closeModal"
    @emails-updated="getEmails"
  />
  <ComposeEmailModal
    v-model="state.open"
    :is-open="showSendEmail"
    @close="closeSend"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from "vue";
import {
  sendEmail,
  requestEmails,
  getEmailById,
  archiveEmail,
  unarchiveEmail,
  readEmail,
  readEmailById,
  unreadEmail,
  markForDeletion,
  unmarkForDeletion
} from "../../../services/api"

import { Email } from "../../../services/modules/emails";

import sendMail from "../../../assets/sendEmail.svg";

interface SelectedEmail {
  email: Email;
  selected: boolean;
  read: boolean;
  archived: boolean;
}

export default defineComponent({
  name: "Inbox",
  setup() {

    const current = computed(() => {
      switch (state.mode) {
        case "archived":
          return state.emails.filter((email) => email.email.archived === true);
        case "primary":
          return state.emails.filter((email) => email.email.archived === false && email.email.markedToDelete === false);
        case "trash":
          return state.emails.filter((email) => email.email.markedToDelete === true);
      }
      return state.emails;
    });

    const state = reactive({
      emails: [] as SelectedEmail[],
      open: 0,
      showEmail: false,
      showActionMenu: false,
      mode: "primary"
    });

    function getEmails(): void {
      state.emails = [];
      requestEmails().then(response => {
        for (const item of response) {
          state.emails.push({
            email: item,
            selected: false
          } as SelectedEmail);
        }
      });
    }

    function openEmail(id: number): void {
      console.log("from open email");
      state.open = id;
      state.showEmail = true;
      readEmailById(id);
    }

    function selectAll(selected: boolean): void {
      state.showActionMenu = selected;
      for (const i in state.emails) {
        state.emails[i].selected = selected;
      }
    }

    async function markDelete(): Promise<void> {
      for (const email of state.emails) {
        if (email.selected === true) await markForDeletion(email.email);
      }
      getEmails();
    }

    async function unmarkDelete(): Promise<void> {
      for (const email of state.emails) {
        if (email.selected === true) await unmarkForDeletion(email.email);
      }
      getEmails();
    }

    async function archiveSelected(): Promise<void> {
      for (const email of state.emails) {
        if (email.selected === true) await archiveEmail(email.email);
      }
      getEmails();
    }

    async function unarchiveSelected(): Promise<void> {
      for (const email of state.emails) {
        if (email.selected === true) await unarchiveEmail(email.email);
      }
      getEmails();
    }

    async function readSelected(): Promise<void> {
      for (const email of state.emails) {
        if (email.selected === true) await readEmail(email.email);
      }
      getEmails();
    }

    async function unreadSelected(): Promise<void> {
      for (const email of state.emails) {
        if (email.selected === true) await unreadEmail(email.email);
      }
      getEmails();
    }

    function handleActionMenu(): void {
      for (const email of state.emails) {
        if (email.selected === true) {
          state.showActionMenu = true;
          return;
        }
      }
      state.showActionMenu = false;
    }

    function closeModal(): void {
      getEmails();
      state.showEmail = false;
    }

    const showSendEmail = ref(false);

    function openSend() {
      showSendEmail.value = true;
    }

    function closeSend() {
      showSendEmail.value = false;
    }

    function quickSend() {
      window.location.assign("mailto:launchmail@gmail.com");
    }

    getEmails();

    return {
      state,
      current,
      getEmails,
      closeModal,
      selectAll,
      archiveSelected,
      unarchiveSelected,
      readSelected,
      unreadSelected,
      handleActionMenu,
      openEmail,
      showSendEmail,
      sendMail,
      quickSend,
      openSend,
      closeSend,
      markDelete,
      unmarkDelete,
    }
  }
});
</script>
