<template>
  <div class="swap-stepper">
    <template v-for="step in stepsCount">
      <slot v-if="step === activeStep" :name="step"></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SwapStepper',
  props: {
    activeStep: {
      type: Number,
      default: null
    }
  },
  computed: {
    stepsCount() {
      return Object.keys(this.$scopedSlots).length
    }
  }
}
</script>
