<template>
    <div>

    <Button label="Hello" @click="openEmail" />
    <EmailModal :blur="true" :is-open="showEmail" @close="showEmail === false" />
    </div>
</template>

<script lang = "ts">
import Button from "../Button.vue"
import EmailModal from "../Modal.vue"
import SomeModal from "../SomeModal.vue"
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "Layout",
    components: {
        Button,
        EmailModal,
        SomeModal
    },
    props: {

    },
    setup(){
       const showEmail = ref(false)
        
        function openEmail() {
        
        showEmail.value = true
        console.log(showEmail.value)
        }
        console.log("from Layout");
        return {showEmail, openEmail}
    }

});
</script>