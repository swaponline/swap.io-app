<template>
  <form class="swap-form" @submit.prevent="$emit('submit')">
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
      <v-btn class="swap-form__swap-button" icon height="auto" min-height="none" @click="swapWallet">
        <svg-icon class="swap-form__icon" name="swap" />
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
    <swap-button type="submit" class="swap-form__button">Call to action</swap-button>
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
  border-radius: 12px;
  @include tablet {
    max-width: none;
  }
  @include small {
    padding: 16px 12px 14px;
  }
  fieldset {
    border-color: $--black;
    border-radius: 8px;
    & + div {
      min-height: 52px;
      @include small {
        min-height: 45px;
      }
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
    line-height: 33px;
    @include tablet {
      margin-bottom: 7px;
    }
    @include small {
      margin-bottom: 5px;
      line-height: 25px;
      font-size: $--font-size-extra-small-subtitle;
    }
  }
  &__balance {
    color: $--dark-grey;
    font-size: $--font-size-medium;
    @include phone {
      font-size: $--font-size-base;
    }
  }
  &__row {
    display: flex;
    justify-content: center;
    height: auto;
    margin-top: 15px;
    flex-shrink: 0;
    @include tablet {
      margin-top: 18px;
    }
    @include small {
      margin-top: 10px;
    }
  }
  &__input {
    width: 70%;
  }
  &__select {
    width: 30%;
    margin-left: 10px !important;
    min-width: 100px;
  }
  &__swap-button {
    padding: 5px 0;
  }
  &__icon {
    width: 22px;
    height: 15px;
  }
  &__info {
    margin: 25px 0;
    color: $--dark-grey;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-medium;
    line-height: 22px;
    @include tablet {
      margin-top: 24px;
    }
    @include small {
      margin-top: 20px;
      font-size: $--font-size-base;
      line-height: 19px;
    }
  }
  &__info-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    &:not(:first-child) {
      margin-top: 10px;
      @include small {
        margin-top: 6px;
      }
    }
  }
  &__button {
    margin-top: auto;
    width: 100%;
    @include phone {
      min-height: 52px;
    }
    @include phone {
      min-height: 42px;
    }
  }
}
</style>
