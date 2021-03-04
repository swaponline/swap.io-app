<template>
  <form class="swap-form" @submit.prevent>
    <header class="swap-form__header">
      <span>Swap</span>
      <span class="swap-form__balance">Balance: BTC 1231231</span>
    </header>
    <div class="swap-form__row">
      <v-text-field
        v-model="from.address"
        placeholder="From"
        class="swap-form__input"
        outlined
        dense
        color="black"
        hide-details
      ></v-text-field>
      <v-select
        v-model="from.currency"
        :items="['BTC', 'ETH']"
        class="swap-form__select"
        outlined
        dense
        color="black"
        hide-details
      ></v-select>
    </div>
    <div class="swap-form__row">
      <v-btn icon @click="swapWallet">
        <v-icon>mdi-swap-vertical</v-icon>
      </v-btn>
    </div>
    <div class="swap-form__row">
      <v-text-field
        v-model="to.address"
        placeholder="To"
        class="swap-form__input"
        outlined
        dense
        color="black"
        hide-details
      ></v-text-field>
      <v-select
        v-model="to.currency"
        :items="['BTC', 'ETH']"
        class="swap-form__select"
        outlined
        dense
        color="black"
        hide-details
      ></v-select>
    </div>
    <p class="swap-form__info">
      <span class="swap-form__info-row">
        <span>Rate:</span>
        <span>1 BTC = 0.123213 ETH</span>
      </span>
      <span class="swap-form__info-row">
        <span>Inverse rate:</span>
        <span>1 ETH = 1.67513 BTC</span>
      </span>
      <span class="swap-form__info-row">
        <span>USD Price:</span>
        <span>1 BTC = $131232 </span>
      </span>
      <span class="swap-form__info-row">
        <span>Estimated Fee:</span>
        <span>~ $213</span>
      </span>
    </p>
    <swap-button type="submit" class="swap-form__button" depressed>Call to action</swap-button>
  </form>
</template>

<script>
export default {
  name: 'SwapForm',
  data() {
    return {
      to: { address: '', currency: 'BTC' },
      from: { address: '', currency: 'BTC' }
    }
  },
  methods: {
    swapWallet() {
      const wrap = { ...this.to }
      this.to = { ...this.from }
      this.from = { ...wrap }
    }
  }
}
</script>

<style lang="scss">
.swap-form {
  z-index: 2;
  background: $--white;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  overflow-y: auto;
  width: 100%;
  max-width: 370px;
  @include tablet {
    max-width: none;
  }
  fieldset {
    border-color: $--black;
    border-radius: 8px;
    & + div {
      min-height: 52px;
      .v-input__append-inner {
        margin-top: 14px !important;
      }
    }
  }
  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-subtitle;
  }
  &__balance {
    color: $--dark-grey;
    font-size: $--font-size-medium;
  }
  &__row {
    display: flex;
    justify-content: center;
    height: auto;
    margin-top: 15px;
  }
  &__input {
    width: 70%;
  }
  &__select {
    width: 30%;
    margin-left: 10px !important;
    min-width: 100px;
  }
  &__info {
    margin: 25px 0;
    color: $--dark-grey;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-medium;
    @include phone {
      font-size: $--font-size-base;
    }
  }
  &__info-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    &:not(:first-child) {
      margin-top: 10px;
    }
  }
  &__button {
    margin-top: auto;
    width: 100%;
  }
}
</style>
