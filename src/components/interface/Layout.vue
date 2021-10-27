<template>
  <Inbox />
</template>

<script lang="ts">
// TODO we should figure out how auto imports work!!!
import Inbox from "../interface/Inbox.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Layout",
  components: {
    Inbox,
  },
  setup() {
    console.log("from Layout");
  },
});
</script>
