<template>
  <vue-element-loading :active="active" class="loader-wrapper" background-color="get-theme-for($background, 'primary')">
    <svg
      :width="width"
      :height="height"
      fill="none"
      viewBox="0 -20 45 65"
      xmlns="http://www.w3.org/2000/svg"
      class="loader-animation"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 5.625L11.25 0v44.625L0 40.875V5.625z"
        fill="var(--main-color)"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.25 8.25l11.25-3V39l-11.25-3.375V8.25z"
        fill="var(--main-color)"
      />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M34.5 12H48L34.5 29.25V12z" fill="var(--main-color)" />
    </svg>
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
      default: '56px'
    },
    height: {
      type: String,
      default: '56px'
    }
  }
}
</script>

<style lang="scss">
.loader-wrapper {
  z-index: 150 !important;
}
.loader-animation > path {
  &:nth-child(1) {
    animation: loader-animation 1.3s infinite;
  }

  &:nth-child(2) {
    animation: loader-animation 1.3s infinite;
    animation-delay: 0.1s;
  }

  &:nth-child(3) {
    animation: loader-animation 1.3s infinite;
    animation-delay: 0.2s;
  }
}

@keyframes loader-animation {
  from {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}
</style>
