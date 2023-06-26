<template>
  <div>
    <SidebarNav />
  <main>
    <slot />
  </main>
  </div>
</template>

<style scoped>
  main {
    padding: 6rem 0 0;
    position: relative;
    min-height: 100vh;
  }

  div {
    display: flex;
  }

  div > nav:first-child {
    flex-basis: 20%;
    min-width: 250px;
  }
</style>
