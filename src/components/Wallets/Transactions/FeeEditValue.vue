<template>
  <div class="fee-edit-value">
    <text-field v-model="localFee" class="fee-edit-value__field" type="number" label="Transaction fee" />
    <fee-edit-base
      :speed="$options.SPEED"
      :fee="localFee"
      :currency="currency"
      @update-fee="updateFee"
      @save-fee="saveFee"
    />
  </div>
</template>

<script>
import TextField from '@/components/UI/Forms/TextField.vue'
import FeeEditBase from '@/components/Wallets/Transactions/FeeEditBase.vue'

import { convertToScientificNotation, convertToDecimalNotation } from '@/utils/common'

const SPEED = {
  slow: 0.0002,
  best: 0.0005,
  fast: 0.0008
}

export default {
  name: 'FeeEditValue',
  components: { TextField, FeeEditBase },
  SPEED,
  props: {
    fee: { type: Number, default: 0 },
    decimals: { type: Number, default: 0 },
    currency: { type: String, default: '' }
  },
  data() {
    return {
      localFee: 0
    }
  },
  mounted() {
    this.localFee = convertToDecimalNotation(Math.abs(this.fee), this.decimals)
  },
  methods: {
    updateFee(value) {
      this.localFee = value
    },
    saveFee() {
      this.$emit('save-fee', { fee: convertToScientificNotation(this.localFee, this.decimals) })
    }
  }
}
</script>

<style lang="scss">
.fee-edit-value {
  &__field {
    margin-bottom: 16px;
  }
}
</style>
