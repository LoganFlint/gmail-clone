<template>
  <Inbox />
</template>

<script lang="ts">
import Inbox from "./inbox/Inbox.vue";
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
