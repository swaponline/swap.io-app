<template>
  <a class="share-link" :target="target" :href="url" @click="$emit('copy')">
    <v-icon v-if="icon" color="white">{{ icon }}</v-icon>
    {{ name }}
  </a>
</template>

<script>
export default {
  name: 'ShareLink',
  props: {
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.share-link {
  text-decoration: none;
  width: 100%;
  min-height: 48px;
  line-height: 48px;
  color: $--white !important;
}
</style>
