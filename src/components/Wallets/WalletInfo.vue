<template>
  <div class="wallet-info" :class="compressed ? 'wallet-info--compressed' : ''" @click="stretchWallet">
    <svg-icon class="wallet-info__background-icon" name="background-btc"></svg-icon>
    <header class="wallet-info__header">
      <div>
        <span class="wallet-info__crypto-value">0.200332btc</span>
        <span class="wallet-info__fiat-value">3000.04$</span>
      </div>
      <div class="wallet-info__optional-buttons">
        <v-btn icon class="wallet-info__optional-button">
          <svg-icon name="share" class="wallet-info__icon"></svg-icon>
        </v-btn>
        <v-btn icon class="wallet-info__optional-button">
          <svg-icon name="settings" class="wallet-info__icon"></svg-icon>
        </v-btn>
      </div>
    </header>
    <v-tooltip v-model="show" top :open-on-hover="false" activator="#copyAdress">
      <span>Copied</span>
    </v-tooltip>
    <button id="copyAdress" class="wallet-info__address" tabindex="-1" @click="copy">
      1C9Uae6kyDtPo4ykzd5AJaLzLEZSpEbP3y
      <svg-icon class="wallet-info__icon-copy" name="copy"></svg-icon>
    </button>
    <div class="wallet-info__buttons">
      <v-btn :to="{ name: 'Invoice', params: { walletAddress } }" depressed class="wallet-info__button">Invoice</v-btn>
      <v-btn depressed class="wallet-info__button">Swap</v-btn>
      <v-btn :to="{ name: 'Send', params: { walletAddress } }" depressed class="wallet-info__button">Send</v-btn>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue'

export default {
  name: 'WalletInfo',
  components: {
    SvgIcon
  },
  props: {
    compressed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    walletAddress() {
      return this.$route.params.walletAddress
    }
  },
  methods: {
    stretchWallet() {
      this.$emit('stretchWallet')
    },
    copy() {
      if (navigator && navigator.clipboard) {
        navigator.clipboard
          .writeText(this.wallet)
          .then(() => {
            this.show = true
            if (this.tooltipTimer) {
              clearTimeout(this.tooltipTimer)
            }
            this.tooltipTimer = setTimeout(() => {
              this.show = false
            }, 1500)
          })
          .catch(err => {
            console.log('Значение не скопировано', err)
          })
      }
    }
  }
}
</script>

<style lang="scss">
.wallet-info {
  outline: none;
  position: relative;
  padding: 20px 30px 25px 25px;
  overflow: hidden;
  background: $--white;
  height: 250px;
  border-radius: 12px;
  transition: 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  --display-value: block;
  --icon-opacity: 0;
  --height-button-address: 30px;
  --backgroun-icon-bottom: 0;
  &--compressed {
    height: 150px;

    --display-value: inline;
    --height-button-address: 0;
    --backgroun-icon-bottom: -50px;
  }
  &:hover {
    --icon-opacity: 1;
  }
  &__background-icon {
    position: absolute;
    right: -25%;
    bottom: var(--backgroun-icon-bottom);
    width: 100%;
    height: 250px;
    transition: 0.5s;
    pointer-events: none;
  }
  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__crypto-value {
    display: var(--display-value);
    font-weight: $--font-weight-bold;
    font-size: $--font-size-extra-title;
    margin-right: 15px;
  }
  &__fiat-value {
    display: var(--display-value);
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-medium;
    color: $--grey;
  }
  &__sys-icons {
    display: flex;
    align-items: center;
  }
  &__icon {
    width: 18px;
    height: 23px;
  }
  &__address {
    margin: var(--height-button-address) 0;
    max-height: var(--height-button-address);
    flex-grow: 1;
    display: flex;
    align-items: center;
    font-size: $--font-size-small-subtitle;
    outline: none;
    overflow: hidden;
    transition: 0.5s;
  }
  &__icon-copy {
    margin-left: 11px;
    width: 22px;
    height: 29px;
    transition: 0.3s;
    opacity: var(--icon-opacity);
  }
  &__button {
    margin-right: 11px;
    text-transform: none;
    font-weight: $--font-weight-bold;
    font-size: $--font-size-medium !important;
    min-width: 144px;
  }
}
</style>
