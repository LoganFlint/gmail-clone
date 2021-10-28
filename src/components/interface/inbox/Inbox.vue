<template>
  <div class="p-8 m-auto flex w-full justify-center items-center">
    <img src="../../../assets/launchBadgeLogo.svg">
    <div class="font-bold text-xl m-3">
      launchmail
    </div>
  </div>

  <ActionMenu
    class="mr-4"
    :open="state.showActionMenu"
    @select-all="selectAll"
    @delete-selected="deleteSelected"
    @archive-selected="archiveSelected"
    @unarchive-selected="unarchiveSelected"
    @read-selected="readSelected"
    @unread-selected="unreadSelected"
  />
  <div
    v-for="(email, i) in state.emails"
    :key="email.email.id"
  >
    <EmailItem
      v-model="state.emails[i].selected"
      :email="email.email"
      :index="i"
      @open-email="openEmail"
      @update:model-value="handleActionMenu"
    />
  </div>

  <EmailModal
    v-model="state.open"
    :is-open="state.showEmail"
    @close="closeModal"
    @emails-updated="getEmails"
  />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import {
  requestEmails,
  archiveEmail,
  unarchiveEmail,
  readEmail,
  readEmailById,
  unreadEmail
} from "../../../services/api"
import { Email } from "../../../services/modules/emails";

interface SelectedEmail {
  email: Email;
  selected: boolean;
  read: boolean;
  archived: boolean
}
export default defineComponent({

  setup() {
    const state = reactive({
      emails: [] as SelectedEmail[],
      open: 0,
      showEmail: false,
      showActionMenu: false,
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

    function deleteSelected(): void {
      console.log("Need to create this function in email.ts");
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

    getEmails();

    return {
      state,
      getEmails,
      closeModal,
      selectAll,
      deleteSelected,
      archiveSelected,
      unarchiveSelected,
      readSelected,
      unreadSelected,
      handleActionMenu,
      openEmail
    }
  }
});
</script>
