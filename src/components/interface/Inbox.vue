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
      @click="openEmail(email.id)"
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

  <EmailModal
    :emailId="state.id"
    :blur="true"
    :is-open="showEmail"
    @close="closeModal"
    @archive="closeModal"
    @unread="closeModal"
    @newer="closeModal"
    @older="closeModal"
  />
</template>

<script lang="ts">
import EmailModal from "../EmailModal.vue";
import { defineComponent, reactive, ref } from "vue";
import { sendEmail, requestEmails } from "../../services/api";
import { Email } from "../../services/modules/emails";

export default defineComponent({
  name: "Inbox",
  components: {
    EmailModal,
  },
  setup() {
    const state = reactive({
      emails: [] as Email[],
      id: 0,
    });

    const showEmail = ref(false);

    // async function getEmailsId(id: number): Promise<void> {
    //   await getEmailById(id).then((response) => {
    //     return response;
    //   });
    // }

    function openEmail(id: number) {
      state.id = id;
      showEmail.value = true;

      // let email = state.emails.filter((emails) => emails.id === emails.id)

      // getEmailsId()
    }

    function closeModal() {
      showEmail.value = false;
    }

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
      showEmail,
      openEmail,
      closeModal,
      // getEmailsId,
    };
  },
});
</script>
