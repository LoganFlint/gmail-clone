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
      'bg-unicornSilver': email.read,
    }"
    @update:modelValue="state.email.read"
  >
    <Checkbox
      v-model="state.selected"
      class="m-3 mt-4"
      @update:model-value="$emit('update:modelValue', state.selected)"
    />
    <div class="w-1/4 overflow-hidden overflow-ellipsis">
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
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted } from "vue";

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
  // emits: ["update:modelValue"],
  setup(props) {
    // onMounted(async () => {
    //   requestEmails().then((res) => {
    //     return res;
    //   });
    // });

    const state = reactive({
      read: props.email.read,
      selected: false,
      emails: [] as Email[],
    });

    function getEmails(): void {
      requestEmails().then((res) => {
        console.log(res);
        return res;
      });
    }

    return {
      state,
      getEmails,
    };
  },
});
</script>
