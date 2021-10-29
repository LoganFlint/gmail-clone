<template>
  <div
    class="cursor-pointer flex whitespace-nowrap pr-8 pl-8 h-10 min-w-[600px]"
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
    <table
      class="w-full table-fixed"
    >
      <tr>
        <td
          class="w-1/5 overflow-hidden overflow-ellipsis"
          @click="$emit('openEmail', email.id)"
        >
          {{ email.from }}
        </td>
        <td
          class="w-3/5"
          @click="$emit('openEmail', email.id)"
        >
          <div class="flex w-full">
            <div class="max-w-5/6 font-bold mr-8 overflow-hidden overflow-ellipsis">
              {{ email.subject }}
            </div>
            <div class="w-full overflow-hidden overflow-ellipsis">
              {{ email.body }}
            </div>
          </div>
        </td>
        <td
          class="justify-right"
          @click="$emit('sendReply')"
        >
          <img
            src="../../../assets/sendEmail.svg"
            alt="send email"
            class="w-6 h-6"
          >
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

  import { Email } from "../../../services/modules/emails";

  export default defineComponent({
    props: {
      email: { type: Object as PropType<Email>, required: true },
      index: { type: Number, default: 0 },
      modelValue: { type: Boolean, default: false },
    },
    emits: ["update:modelValue", "openEmail", "sendReply"],
    setup(props) {
      const state = reactive({
        read: props.email.read,
        archived: props.email.archived,
        selected: false,
        emails: [] as Email[],
      });

      watch(
        () => props.modelValue,
        () => {
          state.selected = props.modelValue;
        }
      );

      return {
        state,
      };
    },
  });
</script>
