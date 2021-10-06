<template>
  <iframe :name="name" class="base-iframe" />
</template>

<script>
export default {
  name: 'SwapIframe',
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.base-iframe {
  width: 100%;
  min-width: 1065px;
  height: 100%;
  overflow: hidden;
  border: 0;

  @include tablet {
    min-width: auto;
  }
}
</style>
