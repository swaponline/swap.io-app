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

    <v-btn class="external-form__qr-button" text @click="openCamera">
      <span class="external-form__qr-text text-left flex-grow-1">Scan qr-code</span>
    </v-btn>
    <input ref="camera" type="file" accept="image/*;capture=camera" class="visually-hidden" @input="getPhoto" />

    <swap-button class="external-form__button">Add wallet</swap-button>
  </form>
</template>

<script>
import FormSelector from '../FormSelector.vue'
import SwapButton from '../UI/SwapButton.vue'

const currencies = ['BTC', 'ETH', 'XRP', 'DOGE', 'USDT']
export default {
  name: 'ExternalForm',
  currencies,
  components: {
    FormSelector,
    SwapButton
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
    openCamera() {
      this.$refs.camera.click()
    },
    getPhoto({ target }) {
      console.log(target.files[0])
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
    height: auto !important;
    font-weight: $--font-weight-bold;
    text-transform: none;
    flex-grow: 0;
    padding: 0 0 !important;
    margin: 14px 0 25px;
    width: 100%;
    span {
      letter-spacing: 0.01em;
      color: $--purple;
      font-size: $--font-size-medium;
    }
  }
  &__button {
    margin-top: auto;
  }
  .visually-hidden {
    position: absolute;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
  }
}
</style>
