<template>
  <div class="fee-edit-base">
    <v-row dense class="fee-edit-base__speeds">
      <v-col>
        <swap-button small block @click="setFee(speed.slow)">Slow</swap-button>
      </v-col>
      <v-col>
        <swap-button small block @click="setFee(speed.best)">Best</swap-button>
      </v-col>
      <v-col>
        <swap-button small block @click="setFee(speed.fast)">Fast</swap-button>
      </v-col>
    </v-row>
    <form-indent class="fee-edit-base__fee">
      <span class="fee-edit-base__fee-title">Transaction fee:</span>
      <div class="fee-edit-base__value">
        <span>{{ fee }} {{ currency }}</span>
        <span class="fee-edit-base__sum">~USD 323.00</span>
      </div>
    </form-indent>
    <swap-button large block class="fee-edit-base__update-button" @click="saveFee">Update transaction fee</swap-button>
  </div>
</template>

<script>
import FormIndent from '@/components/UI/Forms/Indent.vue'

export default {
  name: 'FeeEditBase',
  components: { FormIndent },
  props: {
    speed: { type: Object, default: () => {} },
    fee: { type: [Number, String], default: '' },
    currency: { type: String, default: '' }
  },
  methods: {
    setFee(value) {
      this.$emit('update-fee', value)
    },
    saveFee() {
      this.$emit('save-fee')
    }
  }
}
</script>

<style lang="scss">
.fee-edit-base {
  &__field {
    margin-bottom: 14px;
  }

  &__speeds {
    margin-bottom: 14px;
  }

  &__update-button {
    margin-bottom: 14px;
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
