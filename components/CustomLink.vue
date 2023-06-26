<script setup lang="ts">

interface LinkProps {
    internal?: boolean
    className?: string
    href: string
}

const props = withDefaults(defineProps<LinkProps>(), {
    internal: false,
    className: ''
})

const componentType = ref(props.internal ? 'nuxt-link' : 'a')
</script>

<template>
    <component :class="className" :href="href" :is="componentType">
        <slot/>
    </component>
</template>