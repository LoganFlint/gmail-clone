<template>
  <div class="flex items-start w-full">
    <div
      v-for="(tab, i) of state.tabs"
      :key="i"
      class="m-2 mr-4 w-1/5"
    >
      <Tab
        v-model="state.tabs[i].selected"
        :title="tab.name"
        :icon="tab.icon"
        @update:model-value="handleSelect(i)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";

import Tab from "./Tab.vue";
import archived from "../../../assets/archive.svg";
import inbox from "../../../assets/inbox.svg";
import trash from "../../../assets/trash.svg";

interface TabItem {
    name: string,
    icon: string,
    selected: boolean
}

export default defineComponent({
    name: "TabBar",
    components: {
        Tab
    },
    props: {
        modelValue: { type: String, default: "primary" }
    },
    emits: [ "update:modelValue" ],
    setup(props, { emit }){
        const state = reactive({
            tabs: [
                {
                    name: "Primary",
                    icon: inbox,
                    selected: true
                },
                {
                    name: "Archived",
                    icon: archived,
                    selected: false
                },
                {
                    name: "Trash",
                    icon: trash,
                    selected: false
                }
            ] as TabItem[]
        });

        function handleSelect(index: number): void {
            for(const i in state.tabs) {
                if(Number(i) !== index) state.tabs[i].selected = false;
            }
            switch(index) {
                case 0:
                    emit("update:modelValue", "primary");
                    break;
                case 1:
                    emit("update:modelValue", "archived");
                    break;
                case 2:
                    emit("update:modelValue", "trash");
                    break;
                default:
                    console.warn("Invalid option.");
            }
        }

        watch(() => props.modelValue, () => {
            switch(props.modelValue) {
                case "primary":
                    handleSelect(0);
                    break;
                case "archived":
                    handleSelect(1);
                    break;
                case "trash":
                    handleSelect(2);
                    break;
                default:
                    console.warn("Invalid option.");
            }
        });

        return{
            state,
            handleSelect
        }
    }
});

</script>