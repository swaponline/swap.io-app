<template>
  <vue-element-loading :active="active">
    <img src="/pikchu.gif" :width="width" :height="height" />
  </vue-element-loading>
</template>

<script>
import VueElementLoading from 'vue-element-loading'

export default {
  name: 'VLoader',
  components: {
    VueElementLoading
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  }
}
</script>
