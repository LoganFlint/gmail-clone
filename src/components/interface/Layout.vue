<template>
  <div>
    <Button label="Hello" @click="openEmail" />
    <EmailModal
      :blur="true"
      :is-open="showEmail"
      @close="closeModal"
      subject="Subject"
      contact="team@vuemastery.com"
      @archive="closeModal"
      @unread="closeModal"
      @newer="closeModal"
      @older="closeModal"
    />
  </div>

  <Inbox />
</template>

<script lang="ts">
// TODO we should figure out how auto imports work!!!
import Button from "../Button.vue";
import EmailModal from "../EmailModal.vue";
import SomeModal from "../SomeModal.vue";
import Inbox from "../interface/Inbox.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Layout",
  components: {
    Button,
    EmailModal,
    SomeModal,
    Inbox,
  },
  setup() {
    const showEmail = ref(false);

    function openEmail() {
      showEmail.value = true;
    }

    function closeModal() {
      showEmail.value = false;
    }

    console.log("from Layout");
    return { showEmail, openEmail, closeModal };
  },
});
</script>
