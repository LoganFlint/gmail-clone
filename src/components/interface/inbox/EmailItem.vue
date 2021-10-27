<template>
  <div
    class="clear-both w-full hover:bg-lbLightBlue cursor-pointer flex whitespace-nowrap pr-8 pl-8 h-10 items-center"
    :class="{
      'bg-unicornSilver': index % 2 === 0  
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

import { Email } from "../../../services/modules/emails";

import Checkbox from "../../base/Checkbox.vue";
import Button from "../../base/Button.vue";

export default defineComponent({
    name: "EmailItem",
    components: {
      Checkbox,
      Button,
    },
    props: {
        email: { type: Object as PropType<Email>, required: true },
        index: { type: Number, default: 0 },
        modelValue: { type: Boolean, default: false }
    },
    emits: [
      "update:modelValue",
      "openEmail"
    ],
    setup(props){
      const state = reactive({
        selected: false
      });

      watch(() => props.modelValue, () => {
        state.selected = props.modelValue
      })
      
      return {
        state,
      }
    }
});
</script>