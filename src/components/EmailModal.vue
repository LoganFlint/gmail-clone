<template>
    <Modal :is-open="false" :blur="false" @close="$emit('close')">
        <div class="backdrop-blur-none max-h-screen flex bg-white">
            <slot />
        </div>
    </Modal>
</template>


<script lang="ts">
import Modal from "./Modal.vue" 
import {defineComponent} from "vue"
export default defineComponent({
    components: {
        Modal
    },
    emits: ["close"]
})
</script>   