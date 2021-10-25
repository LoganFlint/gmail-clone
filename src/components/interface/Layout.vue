<template>
    <div class="">
        Test
    </div>
    <Button label="Hello" />
</template>

<script lang = "ts">
import Button from "../Button.vue"
import { defineComponent } from "vue";

export default defineComponent({
    name: "Layout",
    components: {
        Button
    },
    props: {

    },
    setup(){
        console.log("from Layout");
    }

});
</script>