<template>
  <div class="flex items-center m-4 ml-9 p-2">
    <Checkbox
      v-model="state.open"
      class="mr-2 mb-2"
      @update:model-value="update"
    />

    <div class="-mb-6 flex">
      <ActionMenuItem
        data-cy="send-email-action-bar"
        :icon="sendEmail"
        label="Send Email"
        @click="$emit('sendEmail')"
      />

      <div
        class="transition-all duration-300 flex -ml-6"
        :class="{
          'opacity-0 invisible -ml-36': modelValue === false,
        }"
      >
        <ActionMenuItem
          :icon="mode === 'trash' ? deleteForever : trash"
          :label="mode === 'trash' ? 'Delete Forever' : 'Delete'"
          @click="$emit(mode === 'trash'? 'deleteForever' : 'deleteSelected')"
        />

        <ActionMenuItem
          v-if="mode === 'trash'"
          :icon="undelete"
          label="Undelete"
          class="-ml-12"
          @click="$emit('undeleteSelected')"
        />

        <ActionMenuItem
          :icon="mode === 'archived' ? unarchive : archive"
          :label="mode === 'archived' ? 'Unarchive' : 'Archive'"
          class="-ml-5"
          @click="
            $emit(mode === 'archived' ? 'unarchiveSelected' : 'archiveSelected')
          "
        />

        <ActionMenuItem
          :icon="openMail"
          label="Mark as read"
          class="-ml-9"
          @click="$emit('readSelected')"
        />

        <ActionMenuItem
          :icon="mail"
          label="Mark as unread"
          class="-ml-14"
          @click="$emit('unreadSelected')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, watch } from "vue";

  import trash from "../../../assets/trash.svg";
  import archive from "../../../assets/archive.svg";
  import unarchive from "../../../assets/unarchive.svg";
  import openMail from "../../../assets/openmail.svg";
  import mail from "../../../assets/mail.svg";
  import deleteForever from "../../../assets/delete.svg";
  import undelete from "../../../assets/undelete.svg";
  import sendEmail from "../../../assets/sendEmail.svg";

  export default defineComponent({
    props: {
      modelValue: { type: Boolean, default: "false" },
      id: { type: Number, default: 0 },
      mode: { type: String, default: "primary" },
    },
    emits: [
      "update:modelValue",
      "sendEmail",
      "selectAll",
      "deleteSelected",
      "deleteForever",
      "undeleteSelected",
      "archiveSelected",
      "unarchiveSelected",
      "readSelected",
      "unreadSelected",
    ],
    setup(props, {emit}) {
      const state = reactive({
        open: false,
      });

      watch(
        () => props.modelValue,
        () => {
          state.open = props.modelValue;
        }
      );

      function update(e: boolean): void {
        emit("update:modelValue", e);
      }

      return {
        state,
        trash,
        archive,
        unarchive,
        openMail,
        mail,
        deleteForever,
        undelete,
        sendEmail,
        update,
      };
    },
  });
</script>
