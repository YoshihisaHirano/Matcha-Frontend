<template>
    <main>
        <LoginForm/>
    </main>
</template>

<script setup>
definePageMeta({
  layout: "empty",
})

useSeoMeta({
    title: 'Login | Matcha'
})

</script>

<style scoped>
main {
    margin: 0 auto;
    max-width: 60vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>