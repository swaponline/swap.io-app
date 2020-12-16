<template>
  <div class="page-layout">
    <slot name="main-block"></slot>
    <slot name="more-info-block"></slot>
  </div>
</template>

<script>
export default {
  name: 'PageLayout'
}
</script>

<style lang="scss">
.page-layout {
  display: flex;
  width: 100%;
  height: 100%;
}
@include tablet {
  .page-layout {
    flex-direction: column;
  }
}
</style>
