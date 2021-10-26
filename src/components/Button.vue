<template>
    <button class="py-4 px-5 border-2 border-unicornSilver rounded font-mono text-lg whitespace-nowrap ">
        {{ label }}
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        label: {type: String, default: ""}
    },
    setup() {
        
    },
})
</script>