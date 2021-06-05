<template>
  <vue-element-loading :active="active">
    <svg
      :width="width"
      :height="height"
      fill="none"
      viewBox="0 -20 45 65"
      xmlns="http://www.w3.org/2000/svg"
      class="loader-wrapper"
    >
      <path
        class="loader-animation"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 5.625L11.25 0v44.625L0 40.875V5.625z"
        fill="var(--main-color)"
      ></path>
      <path
        class="loader-animation"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.25 8.25l11.25-3V39l-11.25-3.375V8.25z"
        fill="var(--main-color)"
      />
      <path
        class="loader-animation"
        ill-rule="evenodd"
        clip-rule="evenodd"
        d="M34.5 12H48L34.5 29.25V12z"
        fill="var(--main-color)"
      />
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
      default: '48px'
    },
    height: {
      type: String,
      default: '48px'
    }
  }
}
</script>

<style lang="scss">
.loader-animation {
  &:nth-child(1) {
    animation: loader-first-wand 1.3s infinite;
  }

  &:nth-child(2) {
    animation: loader-first-wand 1.3s infinite;
    animation-delay: 0.1s;
  }

  &:nth-child(3) {
    animation: loader-third-wand 1.3s infinite;
    animation-delay: 0.2s;
  }
}

@keyframes loader-first-wand {
  from {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

@keyframes loader-second-wand {
  from {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

@keyframes loader-third-wand {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

@keyframes loader3 {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}
</style>
