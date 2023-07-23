<template>
  <p class="no-data">
    <span class="typicons-warning"></span>
    There were some troubles loading data.<br />Please try refreshing your page
  </p>
</template>

<style scoped>
.no-data {
  text-align: center;
  text-transform: uppercase;
  color: var(--gray-stroke);
  opacity: 0.5;
  font-size: 1.2rem;
  width: 100%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.no-data span {
  display: block;
  text-transform: none;
  font-size: 3rem;
}
</style>
