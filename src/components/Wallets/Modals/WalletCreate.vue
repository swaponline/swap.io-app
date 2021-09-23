<template>
  <component
    :is="wrapperComponent"
    class="wallet-create-modal"
    :class="{ 'wallet-create-modal--block': asBlock }"
    value
    :title="modalTitle"
    :disable-confirm-button="!selectedCurrency || !selectedNetwork"
    :confirm-button-label="confirmButtonLabel"
    modificator="full-height"
    @input="close"
    @submit="create"
    @cancel="close"
  >
    <div v-if="asBlock" class="wallet-create-modal__header">
      <div class="wallet-create-modal__title">{{ modalTitle }}</div>
      <swap-button icon @click="close">
        <v-icon size="32">mdi-close</v-icon>
      </swap-button>
    </div>
    <template v-if="!selectedCurrency">
      <form-text-field
        v-model="currencySearchString"
        placeholder="Enter name of currency"
        class="wallet-create-modal__search"
      />

      <div class="wallet-create-modal__chips">
        <div class="wallet-create-modal__subtitle">Most popular</div>
        <v-chip-group v-model="selectedCurrency" column>
          <v-chip v-for="(item, index) in mostPopular" :key="index" class="wallet-create-modal__chip" :value="item">
            <cryptoicon :symbol="item.code.toLowerCase()" size="20" class="wallet-create-modal__chip-icon" />
            {{ item.name }}
          </v-chip>
        </v-chip-group>
      </div>

      <v-divider class="wallet-create-modal__divider" />

      <div class="wallet-create-modal__list">
        <div
          v-for="(item, index) in filteredCurrencies"
          :key="index"
          class="wallet-create-modal__currency"
          @click="selectedCurrency = item"
        >
          <cryptoicon :symbol="item.code.toLowerCase()" size="40" class="wallet-create-modal__currency-icon" />
          <span class="wallet-create-modal__currency-name">{{ item.name }}</span>
        </div>
      </div>

      <div v-if="asBlock" class="wallet-create-modal__tip">Select currency</div>
    </template>

    <template v-else>
      <div class="wallet-create-modal__selected-currency">
        <cryptoicon
          :symbol="selectedCurrency.code.toLowerCase()"
          size="46"
          class="wallet-create-modal__selected-currency-icon"
        />
        {{ selectedCurrency.name }}
        <button class="wallet-create-modal__reset-currency" @click="reset">Change</button>
      </div>

      <div class="wallet-create-modal__chips">
        <div class="wallet-create-modal__subtitle">Networks</div>
        <v-chip-group v-model="selectedNetwork" column>
          <v-chip v-for="item in networks" :key="item" class="wallet-create-modal__chip" :value="item">
            {{ item }}
          </v-chip>
        </v-chip-group>
      </div>

      <swap-button v-if="asBlock" large :disabled="!selectedNetwork" class="wallet-create-modal__submit" @click="create"
        >Create</swap-button
      >
    </template>
  </component>
</template>

<script>
import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import TypeCurrencyCard from '@/components/Wallets/TypeCurrencyCard.vue'
import FormTextField from '@/components/UI/Forms/TextField.vue'

const currencies = [
  { name: 'Bitcoin', code: 'btc' },
  { name: 'BTCP', code: 'btcp' },
  { name: 'CC', code: 'cc' },
  { name: 'Ethereum', code: 'eth' },
  { name: 'Dash', code: 'dash' },
  { name: 'DVC', code: 'dbc' },
  { name: 'ENTRP', code: 'entrp' },
  { name: 'EOS', code: 'eos' },
  { name: 'CND', code: 'cnd' },
  { name: 'CVC', code: 'cvc' },
  { name: 'ICX', code: 'icx' },
  { name: 'INK', code: 'ink' },
  { name: 'Ignis', code: 'ignis' },
  { name: 'EQUA', code: 'equa' }
]
export default {
  currencies,
  name: 'WalletCreate',
  components: { ModalWrapper, TypeCurrencyCard, FormTextField },
  props: {
    asBlock: { type: Boolean, default: false }
  },
  data() {
    return {
      currencySearchString: '',
      selectedCurrency: '',
      selectedNetwork: ''
    }
  },
  computed: {
    wrapperComponent() {
      return this.asBlock ? 'div' : ModalWrapper
    },
    mostPopular() {
      return [
        { name: 'Bitcoin', code: 'btc' },
        { name: 'BTCP', code: 'btcp' },
        { name: 'Dash', code: 'dash' },
        { name: 'Bitcoin', code: 'btc' },
        { name: 'CC', code: 'cc' },
        { name: 'Dash', code: 'dash' },
        { name: 'Ethereum', code: 'eth' }
      ]
    },
    networks() {
      return ['Ethereum', 'Bitcoin', 'Binance Smart Chain', 'Kusama']
    },
    filteredCurrencies() {
      const search = this.currencySearchString.toLowerCase()
      return currencies.filter(({ code, name }) => code.includes(search) || name.toLowerCase().includes(search))
    },
    modalTitle() {
      if (this.selectedCurrency) return 'Choose network'
      return 'New wallet'
    },
    confirmButtonLabel() {
      return this.selectedCurrency === 'custom' ? 'Next' : 'Confirm'
    }
  },
  methods: {
    reset() {
      this.selectedCurrency = null
      this.selectedNetwork = null
    },
    create() {
      this.close()
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.wallet-create-modal {
  &--block {
    max-width: 412px;
    height: 608px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  &__title {
    font-size: $--font-size-extra-small-subtitle;
    font-weight: $--font-weight-semi-bold;
  }
  &__search {
    margin-bottom: 14px;
  }
  &__chips {
    margin-bottom: 16px;
  }
  &__subtitle {
    color: $--grey-3;
    font-weight: $--font-weight-semi-bold;
    margin-bottom: 10px;
  }
  &__chip {
    padding: 0 8px !important;
    border-radius: 4px !important;
    background-color: var(--main-button-background) !important;
  }
  &__chip-icon {
    margin-right: 6px;
  }
  &__divider {
    border-color: var(--main-border-color) !important;
    margin-bottom: 16px;
  }
  &__list {
    overflow: auto;
    margin-bottom: 16px;
  }
  &__currency {
    display: flex;
    align-items: center;
    padding: 8px 4px;
    border-radius: $--main-border-radius;
    &:hover {
      background-color: var(--main-button-background-hover);
      cursor: pointer;
    }
  }
  &__currency-icon {
    margin-right: 10px;
  }
  &__currency-name {
    font-size: $--font-size-medium;
  }

  &__selected-currency {
    background-color: var(--main-input-background);
    border-radius: $--main-border-radius;
    padding: 14px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: $--font-size-extra-small-subtitle;
    font-weight: $--font-weight-semi-bold;
  }
  &__selected-currency-icon {
    margin-right: 14px;
  }
  &__reset-currency {
    margin-left: auto;
    color: $--grey-3;

    &:hover {
      text-decoration: underline;
    }
  }
  &__tip {
    color: $--grey-3;
    text-align: center;
  }
  &__submit {
    margin-top: auto;
  }
}
</style>
