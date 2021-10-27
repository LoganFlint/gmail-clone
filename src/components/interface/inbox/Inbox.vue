<template>
  <div class="p-8 m-auto flex w-full justify-center items-center">
    <img src="../../../assets/launchBadgeLogo.svg" />
    <div class="font-bold text-xl m-3">launchmail</div>
  </div>

  <div v-for="(email, i) in state.emails" :key="email.email.id">
    <EmailItem
      v-model="state.emails[i].selected"
      :email="email.email"
      :index="i"
      @click="openEmail(email.email.id)"
    />
  </div>

  <EmailModal
    :email-id="state.open"
    :is-open="state.showEmail"
    @close="closeModal"
    @archive="closeModal"
    @unread="closeModal"
    @newer="nextEmail"
    @older="closeModal"
    @read="toggleRead"
  />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import {
  sendEmail,
  requestEmails,
  getEmailById,
  goNewer,
} from "../../../services/api";
import { Email } from "../../../services/modules/emails";

import EmailItem from "./EmailItem.vue";
import EmailModal from "../EmailModal.vue";

interface SelectedEmail {
  email: Email;
  selected: boolean;
  read: boolean;
}

export default defineComponent({
  name: "Inbox",
  components: {
    EmailItem,
    EmailModal,
  },
  setup() {
    const state = reactive({
      email: {} as Email,
      emails: [] as SelectedEmail[],
      open: 0,
      showEmail: false,
    });

    async function send(email: Email): Promise<void> {
      await sendEmail(email);
    }

    function getEmails(): void {
      requestEmails().then((response) => {
        for (const item of response) {
          state.emails.push({
            email: item,
            selected: false,
          } as SelectedEmail);
        }
      });
    }

    function toggleRead(read: boolean) {
      requestEmails().then((res) => {
        return res;
      });
    }

    function nextEmail(id: number) {
      getEmailById(state.email.id).then((res) => {
        state.email.read = true;
        state.email.id = id
        console.log(res, state.email.id);
        return id ++
      });
    }

    function openEmail(id: number): void {
      state.open = id;
      state.showEmail = true;
    }

    function closeModal(read: boolean): void {
      state.showEmail = false;
    }

    getEmails();

    return {
      state,
      send,
      getEmails,
      openEmail,
      closeModal,
      toggleRead,
      nextEmail,
    };
  },
});
</script>
