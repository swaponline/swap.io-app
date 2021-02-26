<template>
  <div class="swap">
    <header class="swap__header">
      <span>Swap</span>
      <span class="swap__balance">Balance: BTC 1231231</span>
    </header>
    <div class="swap__row">
      <v-text-field
        v-model="from.address"
        placeholder="From"
        class="swap__input"
        outlined
        dense
        color="black"
        hide-details
      ></v-text-field>
      <v-select
        v-model="from.currency"
        :items="['BTC', 'ETH']"
        class="swap__select"
        outlined
        dense
        color="black"
        hide-details
      ></v-select>
    </div>
    <div class="swap__row">
      <v-btn icon @click="swapWallet">
        <v-icon>mdi-swap-vertical</v-icon>
      </v-btn>
    </div>
    <div class="swap__row">
      <v-text-field
        v-model="to.address"
        placeholder="To"
        class="swap__input"
        outlined
        dense
        color="black"
        hide-details
      ></v-text-field>
      <v-select
        v-model="to.currency"
        :items="['BTC', 'ETH']"
        class="swap__select"
        outlined
        dense
        color="black"
        hide-details
      ></v-select>
    </div>
    <p class="swap__info">
      <span class="swap__info-row">
        <span>Rate:</span>
        <span>1 BTC = 0.123213 ETH</span>
      </span>
      <span class="swap__info-row">
        <span>Inverse rate:</span>
        <span>1 ETH = 1.67513 BTC</span>
      </span>
      <span class="swap__info-row">
        <span>USD Price:</span>
        <span>1 BTC = $131232 </span>
      </span>
      <span class="swap__info-row">
        <span>Estimated Fee:</span>
        <span>~ $213</span>
      </span>
    </p>
    <v-btn class="swap__button" depressed>Call to action</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Swap',
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
.swap {
  position: relative;
  width: 100%;
  max-width: 370px;
  height: 100%;
  max-height: 520px;
  margin: 25px auto;
  display: flex;
  flex-direction: column;
  background: $--white;
  border-radius: 12px;
  box-shadow: 0px 0px 15px rgba($--black, 0.015);
  padding: 24px 20px 20px;
  overflow-x: hidden;
  overflow-y: auto;
  @include tablet {
    max-width: 374px;
  }
  @include phone {
    margin: 14px 14px;
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
    margin-top: 25px;
  }
  &__input {
    width: 70%;
  }
  &__select {
    width: 30%;
    margin-left: 10px !important;
  }
  &__info {
    margin: 25px 0;
    color: $--dark-grey;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-medium;
    @include tablet {
      margin: 30px 0;
    }
    @include phone {
      margin: 20px 0 25px;
      font-size: $--font-size-base;
    }
  }
  &__info-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    &:not(:first-child) {
      margin-top: 6px;
    }
  }
  &__button {
    text-transform: none;
    margin-top: auto;
    border-radius: 8px;
    min-height: 52px;
    > span {
      font-weight: $--font-weight-semi-bold;
      font-size: $--font-size-extra-small-subtitle;
    }
  }
}
</style>
