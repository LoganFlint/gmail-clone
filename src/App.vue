
<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { requestEmails } from "../src/services/api";

import "./index.css";

export default defineComponent({
  name: "App",
  setup() {
    onMounted(async () => {
      requestEmails().then((res) => {
        console.log(res);
        return res;
      });
    });
  }
});
</script>