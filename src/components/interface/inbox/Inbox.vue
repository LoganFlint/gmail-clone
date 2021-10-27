<template>
  <div
    class="p-8 m-auto flex w-full justify-center items-center"
  >
    <img src="../../../assets/launchBadgeLogo.svg">
    <div class="font-bold text-xl m-3">
      launchmail
    </div>
  </div>

  <div
    v-for="(email, i) in state.emails"
    :key="email.email.id"
  >
    <EmailItem
      v-model="state.emails[i].selected"
      :email="email.email"
      :index="i"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { sendEmail, requestEmails, getEmailById } from "../../../services/api"
import { Email } from "../../../services/modules/emails";
import EmailItem from "./EmailItem.vue";

interface SelectedEmail {
  email: Email,
  selected: boolean
}

export default defineComponent({
    name: "Inbox",
    components: {
      EmailItem
    },
    setup(){
        const state = reactive({
            emails: [] as SelectedEmail[]
        });

        async function send(email: Email): Promise<void> {
            await sendEmail(email);
        }

        function getEmails(): void {
            requestEmails().then(response => {
                for(const item of response) {
                  state.emails.push({
                    email: item,
                    selected: false
                  } as SelectedEmail);
                }
            });
        }

        getEmails();

        return {
            state,
            send,
            getEmails,
        }
    }
});

</script>