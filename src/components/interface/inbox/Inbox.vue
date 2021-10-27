<template>
  <div class="p-8 m-auto flex w-full justify-center items-center">
    <img src="../../../assets/launchBadgeLogo.svg" />
    <div class="font-bold text-xl m-3">launchmail</div>
  </div>

  <div v-for="(email, i) in state.emails" :key="buildKey(email.email.id)">
    <EmailItem
      v-model="state.emails[i].selected"
      :email="email.email"
      :index="i"
      @click="openEmail(email.email.id)"
    />
  </div>

  <EmailModal
    v-model="state.open"
    :is-open="state.showEmail"
    @close="closeModal"
    @archive="closeModal"
    @unread="closeModal"
    @read="toggleRead"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import { sendEmail, requestEmails } from "../../../services/api";
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
      emails: [] as SelectedEmail[],
      open: 0,
      showEmail: false,
      count: 0,
    });

    async function send(email: Email): Promise<void> {
      await sendEmail(email);
    }

    function getEmails(): void {
      state.emails = [];
      requestEmails().then((response) => {
        for (const item of response) {
          state.emails.push({
            email: item,
            selected: false,
          } as SelectedEmail);
        }
      });
    }
    
    function toggleRead() {
      getEmails();
      state.count++;
    }

    function nextEmail() {
      console.log();
    }

    function openEmail(id: number): void {
      state.open = id;
      state.showEmail = true;
    }

    function closeModal(read: boolean): void {
      state.showEmail = false;
    }

    function buildKey(id: number): string {
      return `${id}.${state.count}`;
    }

    getEmails();

    watch(
      () => state.open,
      () => {
        console.log(state.open);
      }
    );

    return {
      state,
      send,
      getEmails,
      openEmail,
      closeModal,
      toggleRead,
      nextEmail,
      buildKey,
    };
  },
});
</script>
