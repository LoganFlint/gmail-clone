<template>
  <div
    class="clear-both w-full cursor-pointer flex whitespace-nowrap pr-8 pl-8 h-10 items-center"
    :class="{
      'hover:bg-lbLightBlue hover:text-gray': !email.read && !email.archived,
      'bg-unicornSilver text-black hover:bg-unicornSilver hover:text-gray':
        email.read,
      'bg-lbBlue text-white hover:bg-lbLightBlue hover:text-black':
        email.archived,
    }"
  >
    <Checkbox
      v-model="state.selected"
      class="m-3 mt-4"
      @update:model-value="$emit('update:modelValue', state.selected)"
    />
    <table class="w-full table-fixed" @click="$emit('openEmail', email.id)">
      <tr>
        <td class="w-1/5 overflow-hidden overflow-ellipsis">
          {{ email.from }}
        </td>
        <td>
          <div class="flex w-full">
            <div
              class="w-4/5 flex-grow font-bold mr-8 overflow-hidden overflow-ellipsis"
            >
              {{ email.subject }}
            </div>
            <div class="w-2/6 overflow-hidden overflow-ellipsis">
              {{ email.body }}
            </div>
            <div class="px-6 flex w-52 justify-center">
              <img
                @click="sendEmail"
                src="../../../assets/sendEmail.svg"
                alt="send email"
              />
            </div>
          </div>
        </td>
        <td class="w-28 overflow-ellipsis text-right">
          {{ new Date(email.sentAt).toLocaleTimeString() }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, reactive, watch } from "vue";

  import { requestEmails } from "../../../services/api";

  import { Email } from "../../../services/modules/emails";

  export default defineComponent({
    props: {
      email: { type: Object as PropType<Email>, required: true },
      index: { type: Number, default: 0 },
      modelValue: { type: Boolean, default: false },
    },
    emits: ["update:modelValue", "openEmail", "sendReply"],
    setup(props, { emit }) {
      const state = reactive({
        read: props.email.read,
        archived: props.email.archived,
        selected: false,
        emails: [] as Email[],
      });

      function getEmails(): void {
        requestEmails().then((res) => {
          return res;
        });
      }

      function sendEmail() {
        emit("sendReply");
      }

      watch(
        () => props.modelValue,
        () => {
          state.selected = props.modelValue;
        }
      );

      return {
        state,
        getEmails,
        sendEmail,
      };
    },
  });
</script>
