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
    @update:modelValue="state.email.read && state.email.archived"
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
  setup(props) {
    const state = reactive({
      read: props.email.read,
      archived: props.email.archived,
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
