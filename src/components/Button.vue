<template>
    <button class="py-4 px-5 text-sm uppercase rounded font-semibold whitespace-nowrap text-white bg-lbBlue text-white">
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