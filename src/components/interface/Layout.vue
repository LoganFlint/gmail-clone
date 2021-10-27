<template>
  <Inbox />    
</template>

<script lang = "ts">
import { defineComponent } from "vue";

import Inbox from "./inbox/Inbox.vue"

export default defineComponent({
    name: "Layout",
    components: {
        Inbox
    },
    props: {

    },
    setup(){
        console.log("from Layout");
    }

});
</script>