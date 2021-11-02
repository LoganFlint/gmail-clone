<template>
  <div class="flex flex-col justify-center overflow-auto sm:overflow-visible">
    <div class="p-8 m-auto flex w-full justify-center items-center">
      <img src="../../../assets/launchBadgeLogo.svg" alt="launch badge">
      <div class="font-bold text-xl m-3">
        launchmail
      </div>
    </div>

    <div class="flex items-center">
      <ActionMenu
        v-model="state.showActionMenu"
        class="mr-4"
        data-cy="action-menu"
        :mode="state.mode"
        @update:modelValue="selectAll"
        @delete-forever="goneForever"
        @delete-selected="markDelete"
        @undelete-selected="unmarkDelete"
        @archive-selected="archiveSelected"
        @unarchive-selected="unarchiveSelected"
        @read-selected="readSelected"
        @unread-selected="unreadSelected"
        @send-email="quickSend"
      />
    </div>

    <TabBar v-model="state.mode" class="pb-8" />

    <div v-if="current.length > 0">
      <div
        v-for="(email, i) in current"
        :key="email.email.id"
        class="min-w-[600px]"
      >
        <EmailItem
          v-model="state.emails[i].selected"
          :email="email.email"
          :index="i"
          @open-email="openEmail"
          @update:model-value="handleActionMenu"
          @send-reply="openSend"
          @click="state.open = email.email.id"
        />
      </div>
    </div>

    <div v-else class="w-full font-xl font-bold text-center pt-24">
      There's nothing to show here!
    </div>
    <EmailModal
      v-model="state.open"
      :is-open="state.showEmail"
      @close="closeEmail"
      @emails-updated="getEmails"
      @send-reply="openSend"
    />

    <ComposeEmailModal
      v-model="state.open"
      :is-open="state.showEmailSend"
      @close="closeSend"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from "vue";
import {
  requestAllEmails,
  archiveEmail,
  unarchiveEmail,
  readEmail,
  readEmailById,
  unreadEmail,
  markForDeletion,
  unmarkForDeletion,
  deleteForever,
} from "../../../services/api";

import { Email } from "../../../services/modules/emails";

interface SelectedEmail {
  email: Email;
  selected: boolean;
  read: boolean;
  archived: boolean;
  markedToDelete: boolean;
}

export default defineComponent({
  name: "Inbox",
  setup() {
    const current = computed(() => {
      switch (state.mode) {
        case "archived":
          return state.emails.filter((email) => email.email.archived === true);
        case "primary":
          return state.emails.filter(
            (email) =>
              email.email.archived === false &&
              email.email.markedToDelete === false
          );
        case "trash":
          return state.emails.filter(
            (email) => email.email.markedToDelete === true
          );
      }
      return state.emails;
    });

    const state = reactive({
      emails: [] as SelectedEmail[],
      open: 0,
      showEmail: false,
      showEmailSend: false,
      showActionMenu: false,
      mode: "primary",
    });

    const allSelected = computed(() => {
      for (const email of state.emails) {
        if (email.selected === false) return false;
      }

      return true;
    });

    function getEmails(): void {
      state.emails = [];
      requestAllEmails().then((response) => {
        for (const item of response) {
          state.emails.push({
            email: item,
            selected: false,
          } as SelectedEmail);
        }
      });
    }

    function openEmail(id: number): void {
      state.open = id;
      state.showEmail = true;
      readEmailById(id);
    }

    function closeEmail() {
      state.showEmail = false;
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
      state.showActionMenu = false;
      getEmails();
    }

    async function unmarkDelete(): Promise<void> {
      for (const email of state.emails) {
        if (email.selected === true) await unmarkForDeletion(email.email);
      }
      state.showActionMenu = false;
      getEmails();
    }

    async function archiveSelected(): Promise<void> {
      for (const email of state.emails) {
        if (email.selected === true) await archiveEmail(email.email);
      }
      state.showActionMenu = false;
      getEmails();
    }

    async function unarchiveSelected(): Promise<void> {
      for (const email of state.emails) {
        if (email.selected === true) await unarchiveEmail(email.email);
      }
      state.showActionMenu = false;
      getEmails();
    }

    async function readSelected(): Promise<void> {
      for (const email of state.emails) {
        if (email.selected === true) await readEmail(email.email);
      }
      state.showActionMenu = false;
      getEmails();
    }

    async function unreadSelected(): Promise<void> {
      for (const email of state.emails) {
        if (email.selected === true) await unreadEmail(email.email);
      }
      state.showActionMenu = false;
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

    function openSend() {
      state.showEmail = false;
      state.showEmailSend = true;
    }

    function closeSend() {
      state.showEmailSend = false;
    }

    function quickSend() {
      window.location.assign("mailto:launchmail@gmail.com");
    }

    async function goneForever(): Promise<void> {
      for (const email of state.emails) {
        if (email.selected === true) await deleteForever(email.email);
      }
      state.showActionMenu = false;
      getEmails();
    }

    getEmails();

    return {
      state,
      current,
      getEmails,
      selectAll,
      archiveSelected,
      unarchiveSelected,
      readSelected,
      unreadSelected,
      handleActionMenu,
      openEmail,
      quickSend,
      openSend,
      closeSend,
      markDelete,
      unmarkDelete,
      goneForever,
      closeEmail,
    };
  },
});
</script>
