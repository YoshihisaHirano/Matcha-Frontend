<script setup lang="ts">
</script>

<template>
    <span>
        <slot name="icon">
            <span class="typicons-info"></span>
        </slot>
    </span>
    <div>
        <slot name="content"/>
    </div>
</template>