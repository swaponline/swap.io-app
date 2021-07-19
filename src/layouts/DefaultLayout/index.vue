<template>
  <div class="default-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style lang="scss">
.default-layout {
  width: 100%;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
</style>
