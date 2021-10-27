<template>
  <div class="flex items-center m-4 ml-9 p-2">
    <Checkbox
      v-model="state.selectAll"
      class="mr-8 mb-2"
      @update:model-value="$emit('selectAll', state.selectAll)"
    />
    <div
      class="-mb-4 transition-all duration-300 flex"
      :class="{
        'opacity-0 invisible -ml-36': open === false
      }"
    >
      <ActionMenuItem
        :icon="trash"
        label="Delete"
        @click="$emit('deleteSelected')"
      />

      <ActionMenuItem
        :icon="archive"
        label="Archive"
        class="-ml-3"
        @click="$emit('archiveSelected')"
      />

      <ActionMenuItem
        :icon="unarchive"
        label="Unarchive"
        class="-ml-6"
        @click="$emit('unarchiveSelected')"
      />

      <ActionMenuItem
        :icon="read"
        label="Mark as read"
        class="-ml-9"
        @click="$emit('readSelected')"
      />

      <ActionMenuItem
        :icon="unread"
        label="Mark as unread"
        class="-ml-14"
        @click="$emit('unreadSelected')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

import Checkbox from "../../base/Checkbox.vue";
import ActionMenuItem from "./ActionMenuItem.vue";

import trash from "../../../assets/trash.svg";
import archive from "../../../assets/archive.svg";
import unarchive from "../../../assets/unarchive.svg";
import read from "../../../assets/read.svg";
import unread from "../../../assets/unread.svg";

export default defineComponent({
    name: "ActionMenu",
    components: {
      Checkbox,
      ActionMenuItem
    },
    props: {
      open: { type: Boolean, default: false },
      id: { type: Number, default: 0 },
    },
    emits: [
      "selectAll", "deleteSelected", "archiveSelected", "unarchiveSelected", "readSelected", "unreadSelected"
    ],
    setup(){
        const state = reactive({
          selectAll: false
        });

        return {
          state,
          trash,
          archive,
          unarchive,
          read,
          unread
        }
    }
});
</script>