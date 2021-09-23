<template>
  <v-tooltip v-model="copyTooltip.value" top internal-activator :open-on-hover="false">
    <template #activator="{ on }">
      <slot :copy="copyData" :tooplip-on="on" />
    </template>
    <span>Copied</span>
  </v-tooltip>
</template>

<script>
import copy from '@/utils/copy'

export default {
  name: 'SwapCopyWrapper',
  data() {
    return {
      copyTooltip: {
        value: false,
        timer: 0
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.copyTooltip.timer)
  },
  methods: {
    copyData(data) {
      copy(data)
        .then(() => {
          this.copyTooltip.value = true
          if (this.copyTooltip.timer) {
            clearTimeout(this.copyTooltip.timer)
          }
          this.copyTooltip.timer = setTimeout(() => {
            this.copyTooltip.value = false
          }, 1500)
        })
        .catch(err => {
          console.log('Copy failed', err)
        })
    }
  }
}
</script>
