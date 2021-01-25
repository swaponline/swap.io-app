<template>
  <div class="wallet-info" :class="compressed ? 'wallet-info--compressed' : ''" @click="stretchWallet">
    <svg-icon class="wallet-info__background-icon" name="background-btc"></svg-icon>
    <div class="wallet-info__optional-buttons">
      <v-btn icon class="wallet-info__optional-button">
        <svg-icon name="share" class="wallet-info__icon"></svg-icon>
      </v-btn>
      <v-btn icon class="wallet-info__optional-button">
        <svg-icon name="settings" class="wallet-info__icon"></svg-icon>
      </v-btn>
    </div>
    <header class="wallet-info__header">
      <div>
        <span class="wallet-info__crypto-value">0.200332btc</span>
        <span class="wallet-info__fiat-value">3000.04$</span>
      </div>
    </header>
    <div class="wallet-info__address">
      <v-tooltip v-model="show" top :open-on-hover="false" activator="#copyAdress">
        <span>Copied</span>
      </v-tooltip>
      <button id="copyAdress" class="wallet-info__address" depressed tabindex="-1" @click="copy">
        1C9Uae6kyDtPo4ykzd5AJaLzLEZSpEbP3y
        <svg-icon class="wallet-info__icon-copy" name="copy"></svg-icon>
      </button>
      <button class="wallet-info__address" icon>
        <svg-icon class="wallet-info__icon-copy" name="qrcode"></svg-icon>
      </button>
    </div>
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
  --icon-opacity: 0;
  --margin-button-address: 0;
  --height-header: 70px;
  --backgroun-icon-bottom: 0;

  outline: none;
  position: relative;
  padding: 20px 25px 25px;
  overflow: hidden;
  background: $--white;
  height: 250px;
  border-radius: 12px;
  transition: 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  @include tablet {
    height: 220px;
    padding: 20px 15px;
    margin: 8px 8px;
  }

  &--compressed {
    --margin-button-address: 22px;
    --height-header: 0;
    --backgroun-icon-bottom: -50px;

    height: 140px;
    cursor: pointer;

    @include tablet {
      height: 60px;
      border-radius: 12px 12px 0 0;
      padding: 20px 15px 5px;
      margin: 10px 12px 0;
      box-shadow: inset 0px -3px 5px -1px rgba(0, 0, 0, 0.2);
    }
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
    @include tablet {
      opacity: 0;
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    transition: 0.5s;
    max-height: var(--height-header);
  }
  &__optional-buttons {
    position: absolute;
    right: 25px;
    @include tablet {
      top: 15px;
    }
  }
  &__crypto-value {
    display: block;
    font-weight: $--font-weight-bold;
    font-size: $--font-size-extra-title;
    margin-right: 15px;
  }
  &__fiat-value {
    display: block;
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
    margin: 0 0 var(--margin-button-address);
    display: flex;
    align-items: center;
    font-size: $--font-size-small-subtitle;
    outline: none;
  }
  &__icon-copy {
    margin-left: 11px;
    width: 22px;
    height: 29px;
    transition: 0.3s;
    opacity: var(--icon-opacity);
    @include tablet {
      display: none;
    }
  }
  &__button {
    margin-right: 11px;
    text-transform: none;
    font-weight: $--font-weight-bold;
    font-size: $--font-size-medium !important;
    min-width: 144px;
  }
  &__buttons {
    overflow: hidden;
    max-height: var(--height-header);
  }
}
</style>
