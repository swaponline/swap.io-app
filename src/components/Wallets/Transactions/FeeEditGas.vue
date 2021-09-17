<template>
  <div class="fee-edit-gas">
    <text-field v-model="localPrice" class="fee-edit-gas__field" type="number" label="Gas price" />
    <text-field v-model="localGas" class="fee-edit-gas__field" type="number" label="Gas" />

    <fee-edit-base
      :speed="$options.SPEED"
      :fee="formattedFee"
      :currency="currency"
      @update-fee="updateFee"
      @save-fee="saveFee"
    />
  </div>
</template>

<script>
import TextField from '@/components/UI/Forms/TextField.vue'
import FeeEditBase from '@/components/Wallets/Transactions/FeeEditBase.vue'

import { convertToDecimalNotation } from '@/utils/common'

const SPEED = {
  slow: 50000,
  best: 150000,
  fast: 300000
}

export default {
  name: 'FeeEditGas',
  components: { TextField, FeeEditBase },
  SPEED,
  props: {
    gas: { type: Number, default: 0 },
    gasPrice: { type: Number, default: 0 },
    decimals: { type: Number, default: 0 },
    currency: { type: String, default: '' }
  },
  data() {
    return {
      localPrice: 0,
      localGas: 0
    }
  },
  computed: {
    formattedFee() {
      return convertToDecimalNotation(this.localGas * this.localPrice, this.decimals).toFixed(5)
    }
  },
  mounted() {
    this.localGas = this.gas
    this.localPrice = this.gasPrice
  },
  methods: {
    updateFee(value) {
      this.localGas = value
    },
    saveFee() {
      this.$emit('save-fee', { gas: this.localGas, gasPrice: this.localPrice })
    }
  }
}
</script>

<style lang="scss">
.fee-edit-gas {
  &__field {
    margin-bottom: 16px;
  }
}
</style>
