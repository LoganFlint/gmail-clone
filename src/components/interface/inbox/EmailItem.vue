<template>
  <div
    class="
      clear-both
      w-full
      hover:bg-lbLightBlue
      cursor-pointer
      flex
      whitespace-nowrap
      pr-8
      pl-8
      h-10
      items-center
    "
    :class="{
      'bg-unicornSilver text-black hover:bg-unicornSilver hover:text-gray': email.read,
      'bg-lbBlue text-white hover:bg-lbLightBlue hover:text-black': email.archived,
    }"
  >
    <Checkbox
      v-model="state.selected"
      class="m-3 mt-4"
      @update:model-value="$emit('update:modelValue', state.selected)"
    />
    <table
      class="w-full table-fixed"
      @click="$emit('openEmail', email.id)"
    >
      <tr>
        <td class="w-1/5 overflow-hidden overflow-ellipsis">
          {{ email.from }}
        </td>
        <td>
          <div class="flex w-full">
            <div class="max-w-5/6 font-bold mr-8 overflow-hidden overflow-ellipsis">
              {{ email.subject }}
            </div>
            <div class="w-full overflow-hidden overflow-ellipsis">
              {{ email.body }}
            </div>
          </div>
        </td>
        <td class="w-1/6 overflow-ellipsis text-right">
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

import Checkbox from "../../base/Checkbox.vue";

export default defineComponent({
  name: "EmailItem",
  components: {
    Checkbox,
  },
  props: {
    email: { type: Object as PropType<Email>, required: true },
    index: { type: Number, default: 0 },
    modelValue: { type: Boolean, default: false },
  },
  emits: [ "update:modelValue", "openEmail" ], 
  setup(props) {
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

    watch(() => props.modelValue, ()=> {
      state.selected = props.modelValue;
    })

    return {
      state,
      getEmails,
    };
  },
});
</script>
