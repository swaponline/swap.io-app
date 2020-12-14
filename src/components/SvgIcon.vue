<template>
  <svg :class="className" xmlns="http://www.w3.org/2000/svg">
    <title v-if="title">
      {{ title }}
    </title>
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      icon: {}
    }
  },
  computed: {
    iconPath() {
      let icon = {}
      if (Object.prototype.hasOwnProperty.call(this.icon, 'default')) {
        icon = this.icon.default
      }

      return `#${icon.id}`
    },
    className() {
      return `svg-icon svg-icon--${this.name}`
    }
  },
  async created() {
    this.icon = await import(`@/assets/icons/${this.name}.svg`)
  }
}
</script>
