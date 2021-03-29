<template>
  <form class="external-form" @submit.prevent>
    <form-selector
      v-model="currency"
      class="external-form__select"
      outlined
      placegolder="BTC"
      :items="$options.currencies"
    ></form-selector>

    <v-textarea
      v-if="currency"
      v-model="wallet"
      placeholder="Enter wallet adress"
      class="external-form__wallet rounded-lg"
      :class="{ 'external-form__wallet--error': error }"
      rows="1"
      row-height="18"
      outlined
      hide-details
      no-resize
      auto-grow
    ></v-textarea>

    <span v-if="error" outlined class="external-form__error">{{ error }}</span>

    <qr-code-reader class="external-form__qr-button" @input="setPhoto" />

    <swap-button class="external-form__button">Add wallet</swap-button>
  </form>
</template>

<script>
import FormSelector from '../UI/Forms/Selector.vue'
import QrCodeReader from '../QrCodeReader.vue'
import SwapButton from '../UI/SwapButton.vue'

const currencies = ['BTC', 'ETH', 'XRP', 'DOGE', 'USDT']
export default {
  name: 'ExternalForm',
  currencies,
  components: {
    FormSelector,
    SwapButton,
    QrCodeReader
  },
  data() {
    return {
      currency: 'BTC',
      wallet: '',
      error: '',
      photo: null
    }
  },
  methods: {
    setPhoto(file) {
      console.log(file)
    }
  }
}
</script>

<style lang="scss">
.external-form {
  display: flex;
  flex-direction: column;
  padding: 0 25px 22px;
  height: 100%;
  @include tablet {
    padding: 0 40px 30px;
  }
  @include small {
    padding: 0 15px 10px;
  }
  &__select {
    margin-bottom: 20px !important;
  }
  &__wallet {
    flex: 0 0 auto;
    .v-input__slot {
      min-height: 52px !important;
      fieldset {
        border-color: $--black;
      }
      textarea {
        min-height: 18px;
        font-size: $--font-size-extra-small-subtitle;
        line-height: 25px;
        color: $--black;
        margin: 13px 0 !important;
      }
    }
    &--error {
      .v-input__slot {
        fieldset {
          border-color: $--red;
        }
      }
    }
  }
  &__error {
    width: 100%;
    margin-top: 12px;
    text-align: center;
    line-height: 22px;
    color: $--red;
  }
  &__qr-button {
    margin: 14px 0 25px;
  }
  &__button {
    margin-top: auto;
  }
}
</style>
