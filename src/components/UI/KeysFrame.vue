<template>
  <iframe :name="name" class="keys-iframe" frameborder="0"></iframe>
</template>

<script>
export default {
  name: 'KeysFrame',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.keys-iframe {
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
}
</style>
