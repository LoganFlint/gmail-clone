<template>
  <div class="p-8 m-auto flex w-full justify-center items-center">
    <img src="../../assets/launchBadgeLogo.svg" />
    <div class="font-bold text-xl m-3">launchmail</div>
  </div>
  <div>
    <div
      v-for="(email, i) in state.emails"
      :key="email.id"
      class="
        transition-all
        duration-300
        hover:bg-lbLightBlue
        flex
        w-full
        min-w-screen
        whitespace-nowrap
        pr-8
        pl-8
        h-10
        items-center
      "
      :class="{
        'bg-unicornSilver': i % 2 === 0,
      }"
    >
      <div class="w-1/4">
        {{ email.from }}
      </div>
      <div class="w-1/2 flex mr-2">
        <div class="font-bold mr-8 overflow-hidden overflow-ellipsis">
          {{ email.subject }}
        </div>
        <div class="overflow-hidden overflow-ellipsis">
          {{ email.body }}
        </div>
      </div>
      <div class="w-1/4 overflow-ellipsis text-right">
        {{ new Date(email.sentAt).toLocaleTimeString() }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { sendEmail, requestEmails, getEmailById } from "../../services/api";
import { Email } from "../../services/modules/emails";

export default defineComponent({
  name: "Inbox",
  setup() {
    const state = reactive({
      emails: [] as Email[],
    });

    async function send(email: Email): Promise<void> {
      await sendEmail(email);
    }

    function getEmails(): void {
      requestEmails().then((response) => {
        state.emails = response;
      });
    }

    getEmails();

    return {
      state,
      send,
      getEmails,
    };
  },
});
</script>
