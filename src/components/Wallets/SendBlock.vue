<template>
  <transition-translate>
    <send-form v-if="visible" @close="close"></send-form>
  </transition-translate>
</template>

<script>
import TransitionTranslate from '../Transitions/Translate.vue'
import SendForm from './SendForm.vue'

export default {
  name: 'SendBlock',
  components: {
    TransitionTranslate,
    SendForm
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style></style>
