<template>
  <div class="transaction-edit-fee">
    <template v-if="isEthereum">
      <text-field v-model="localPrice" class="transaction-edit-fee__field" type="number" label="Gas price" />
      <text-field v-model="localGas" class="transaction-edit-fee__field" type="number" label="Gas" />
    </template>
    <text-field v-else v-model="localFee" class="transaction-edit-fee__field" type="number" label="Transaction fee" />
    <v-row dense class="transaction-edit-fee__speeds">
      <v-col>
        <swap-button class="transaction-edit-fee__button" @click="setFee($options.SPEED[currency].slow)"
          >Slow</swap-button
        >
      </v-col>
      <v-col>
        <swap-button class="transaction-edit-fee__button" @click="setFee($options.SPEED[currency].best)"
          >Best</swap-button
        >
      </v-col>
      <v-col>
        <swap-button class="transaction-edit-fee__button" @click="setFee($options.SPEED[currency].fast)"
          >Fast</swap-button
        >
      </v-col>
    </v-row>
    <form-indent class="transaction-edit-fee__fee">
      <span class="transaction-edit-fee__fee-title">Transaction fee:</span>
      <div class="transaction-edit-fee__value">
        <span>{{ formattedFee }} {{ currency }}</span>
        <span class="transaction-edit-fee__sum">~USD 323.00</span>
      </div>
    </form-indent>
    <swap-button class="transaction-edit-fee__update-button" @click="updateFee">Update transaction fee</swap-button>
  </div>
</template>

<script>
import TextField from '@/components/UI/Forms/TextField.vue'
import FormIndent from '@/components/UI/Forms/Indent.vue'

import { convertToDecimalNotation, convertToScientificNotation } from '@/utils/common'

const ETH_CURRENCY = 'ETH'
const BTC_CURRENCY = 'BTC'

const SPEED = {
  [ETH_CURRENCY]: {
    slow: 50000,
    best: 150000,
    fast: 300000
  },
  [BTC_CURRENCY]: {
    slow: 0.0002,
    best: 0.0005,
    fast: 0.0008
  }
}

export default {
  name: 'TransactionFeeEdit',
  components: { TextField, FormIndent },
  SPEED,
  props: {
    gas: { type: Number, default: 0 },
    gasPrice: { type: Number, default: 0 },
    decimals: { type: Number, default: 0 },
    fee: { type: Number, default: 0 },
    currency: { type: String, default: '' }
  },
  data() {
    return {
      localGas: 0,
      localPrice: 0,
      localFee: 0
    }
  },
  computed: {
    formattedFee() {
      return this.isEthereum
        ? convertToDecimalNotation(this.localGas * this.localPrice, this.decimals).toFixed(5)
        : this.localFee
    },
    isEthereum() {
      return this.currency === ETH_CURRENCY
    }
  },
  mounted() {
    this.localGas = this.gas
    this.localPrice = this.gasPrice
    this.localFee = convertToDecimalNotation(Math.abs(this.fee), this.decimals)
  },
  methods: {
    updateFee() {
      this.$emit('update-fee', {
        gas: this.localGas,
        gasPrice: this.localPrice,
        fee: convertToScientificNotation(this.localFee)
      })
    },
    setFee(value) {
      if (this.isEthereum) {
        this.localGas = value
      } else {
        this.localFee = value
      }
    }
  }
}
</script>

<style lang="scss">
.transaction-edit-fee {
  &__button {
    min-height: 0 !important;
    min-width: 100% !important;
    letter-spacing: initial;

    &.v-btn.v-size--default {
      height: 31px;
      padding: 8px;
    }

    .v-btn__content {
      font-size: $--font-size-base;
    }
  }

  &__field {
    margin-bottom: 14px;
  }

  &__speeds {
    margin-bottom: 14px;
  }

  &__update-button {
    width: 100%;
  }

  &__fee {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: $--font-size-base;
    font-weight: $--font-weight-semi-bold;
    line-height: 19px;
  }

  &__value {
    text-align: right;
    display: flex;
    flex-direction: column;
  }

  &__fee-title {
    color: $--grey-3;
  }

  &__sum {
    color: $--grey-3;
  }
}
</style>
