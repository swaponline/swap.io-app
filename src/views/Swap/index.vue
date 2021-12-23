<template>
  <div class="swap">
    <form class="swap-form" @submit.prevent="$emit('submit')">
      <header class="swap-form__header">
        <span>Swap</span>
        <span class="swap-form__balance"
          >Balance: {{ from && from.value ? `${from.coin.toUpperCase()} ${from.value}` : '0.0' }}</span
        >
      </header>
      <div class="swap-form__row">
        <form-text-field class="swap-form__input" hide-details label="From">
          <template #form-field-append>
            <swap-button small @click="selectWallet('from')">
              <template v-if="!from">Select wallet</template>
              <template v-else>
                <coin-logo class="swap-form__button-icon" :path="from.logo" :name="from.coin" />

                <span class="swap-form__button-currency">{{ from.coin.toUpperCase() }}</span>
                <span class="swap-form__button-name">{{ from.name || minifyAddress(from.address) }}</span>
              </template>
            </swap-button>
          </template>
        </form-text-field>
      </div>

      <div class="swap-form__row">
        <swap-button icon @click="swapWallet"><svg-icon class="swap-form__swap-icon" name="swap"/></swap-button>
      </div>

      <div class="swap-form__row">
        <form-text-field class="swap-form__input" hide-details label="To">
          <template #form-field-append>
            <swap-button small @click="selectWallet('to')">
              <template v-if="!to">Select wallet</template>
              <template v-else>
                <coin-logo class="swap-form__button-icon" :path="to.logo" :name="to.coin" />
                <span class="swap-form__button-currency">{{ to.coin.toUpperCase() }}</span>
                <span class="swap-form__button-name">{{ to.name || minifyAddress(to.address) }}</span>
              </template>
            </swap-button>
          </template>
        </form-text-field>
      </div>

      <div class="swap-form__info">
        <v-divider />

        <span class="swap-form__info-row">
          <span>Rate:</span>
          <span>
            {{ from ? `1 ${from.coin.toUpperCase()}` : '0.00' }} =
            {{ to ? `${conversionRate} ${to.coin.toUpperCase()}` : '0.00' }}
          </span>
        </span>
        <span class="swap-form__info-row">
          <span>Inverse rate:</span>
          <span>
            {{ to ? `1 ${to.coin.toUpperCase()}` : '0.00' }} =
            {{ from && to ? `${inverseConversionRate} ${from.coin.toUpperCase()}` : '0.00' }}
          </span>
        </span>
        <span class="swap-form__info-row">
          <span>USD Price:</span>
          <span>
            {{ from ? `1 ${from.coin.toUpperCase()}` : '0.00' }} =
            {{ from ? `$${usdConversion}` : '0.00' }}
          </span>
        </span>
        <span class="swap-form__info-row">
          <span>Estimated Fee:</span>
          <span>~ ${{ from ? estimatedFee : '0.00' }}</span>
        </span>

        <v-divider />
      </div>

      <swap-button :large="!mediaQueries.phone" type="submit" class="swap-form__button" :disabled="!from || !to"
        >Swap</swap-button
      >
    </form>

    <swap-select-wallet-dialog :value.sync="isSelectWalletDialogVisible" @select="handleSelectedWallet" />
  </div>
</template>

<script>
import FormTextField from '@/components/UI/Forms/TextField.vue'
import SwapSelectWalletDialog from '@/components/Swap/SelectWalletDialog.vue'
import CoinLogo from '@/components/Wallets/CoinLogo.vue'
import { convertAmountToOtherCurrency } from '@/services/converter'
import { minifyAddress } from '@/utils/common'

export default {
  name: 'Swap',
  components: { FormTextField, SwapSelectWalletDialog, CoinLogo },
  inject: ['mediaQueries'],
  data() {
    return {
      to: null,
      from: null,

      isSelectWalletDialogVisible: false,
      selectionType: null
    }
  },

  computed: {
    conversionRate() {
      return '1.231412'
    },
    inverseConversionRate() {
      return '0.812076'
    },
    usdConversion() {
      return convertAmountToOtherCurrency(1, this.from.coin, 'USD')
    },
    estimatedFee() {
      return '213'
    }
  },

  methods: {
    minifyAddress,
    selectWallet(type) {
      this.isSelectWalletDialogVisible = true
      this.selectionType = type
    },
    handleSelectedWallet(wallet) {
      if (this.selectionType === 'from') {
        this.from = wallet
      }
      if (this.selectionType === 'to') {
        this.to = wallet
      }
      this.isSelectWalletDialogVisible = false
    },
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
  left: 0;
  width: 100%;
  max-width: 370px;
  height: 100%;
  max-height: 520px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: $--white;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba($--black, 0.015);
  overflow-x: hidden;
  overflow-y: auto;
  transition: 0.5s;

  @include tablet {
    margin-top: 20px;
  }

  @include phone {
    max-width: none;
    width: auto;
    margin: 12px 12px;
  }

  @include small-phone {
    max-height: 415px;
  }
}

.swap-form {
  z-index: 2;
  background: get-theme-for($background, 'primary');
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  max-width: 370px;
  border-radius: 12px;

  @include tablet {
    max-width: none;
  }

  @include small-phone {
    padding: 16px 12px 14px;
  }

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
    margin-bottom: 16px;
  }

  &__balance {
    color: $--grey-3;
    font-size: $--font-size-base;
  }

  &__row {
    display: flex;
    justify-content: center;
    height: auto;
    margin-bottom: 12px;
    flex-shrink: 0;
  }

  &__input {
    margin-bottom: 0;
    height: 54px;
  }

  &__button-icon {
    margin-right: 4px;
    width: 17px;
    height: 17px;
  }

  &__button-currency {
    color: $--grey-3;
    margin-right: 4px;
  }

  &__loader {
    width: 36px;
    height: 32px;
  }

  &__swap-icon {
    width: 22px;
    height: 22px;
    color: get-theme-for($icon, 'active');
  }

  &__info {
    margin: 18px 0 40px;
    color: $--grey-3;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-base;

    .v-divider {
      border-color: get-theme-for($border-color, 'primary');
    }
  }

  &__info-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    &:first-of-type {
      margin-top: 5px;
    }

    &:last-of-type {
      margin-bottom: 5px;
    }
  }

  &__button {
    margin-top: auto;
    width: 100%;

    @include phone {
      height: 42px;
    }
  }
}
</style>
