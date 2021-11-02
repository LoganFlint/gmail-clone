<template>
  <div
    class="cursor-pointer flex whitespace-nowrap pr-8 pl-8 h-10 items-center"
    :class="{
      'hover:bg-lbLightBlue hover:text-gray': !email.read && !email.archived,
      'bg-unicornSilver text-black hover:bg-unicornSilver hover:text-gray':
        email.read,
    }"
  >
    <Checkbox
      v-model="state.selected"
      @update:model-value="$emit('update:modelValue', state.selected)"
    />
    <table class="w-full table-fixed">
      <tr>
        <td
          class="w-1/5 overflow-hidden overflow-ellipsis pl-4"
          @click="$emit('openEmail', email.id)"
        >
          {{ email.from }}
        </td>
        <td class="w-3/5 pr-8" @click="$emit('openEmail', email.id)">
          <div class="flex w-full">
            <div
              class="
                w-4/5
                flex-grow
                font-bold
                overflow-hidden overflow-ellipsis
              "
            >
              {{ email.subject }}
            </div>
            <div class="w-2/6 overflow-hidden overflow-ellipsis">
              {{ email.body }}
            </div>
          </div>
        </td>
        <td class="pl-6">
          <img
            src="../../../assets/sendEmail.svg"
            alt="send email"
            class="w-5 h-5"
            @click="$emit('sendReply')"
          />
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
