<template>
  <modal-wrapper
    value
    title="Creating a wallet"
    :disable-confirm-button="select === ''"
    :confirm-button-label="confirmButtonLabel"
    @input="close"
    @submit="create"
    @cancel="close"
  >
    <div class="wallet-create-modal">
      <div class="wallet-create-modal__cards">
        <type-currency-card
          class="wallet-create-modal__card"
          name="Custom"
          icon-name="custom"
          :select="select === 'custom'"
          @click="select = 'custom'"
        ></type-currency-card>
        <type-currency-card
          v-for="i in $options.cur"
          :key="i"
          class="wallet-create-modal__card"
          :name="i.toUpperCase()"
          :icon-name="i"
          :select="select === i"
          @click="select = i"
        ></type-currency-card>
      </div>
    </div>
    <div class="wallet-create-modal__links">
      <a class="wallet-create-modal__link">Resore from 24-word seed</a>
      <a class="wallet-create-modal__link">Connect wallet</a>
    </div>
  </modal-wrapper>
</template>

<script>
import { mapMutations } from 'vuex'
import { ADD_MODAL } from '@/store/modules/Modals'
import { ADD_NEW_CURRENCY } from '@/store/modules/Modals/names'
import ModalWrapper from '../../ModalWrapper.vue'
import TypeCurrencyCard from '../TypeCurrencyCard.vue'

const cur = ['btc', 'btcp', 'cc', 'etn', 'dash', 'dbc', 'entrp', 'eos', 'cnd', 'cvc', 'icx', 'ink', 'ignis', 'equa']
export default {
  cur,
  name: 'WalletCreate',
  components: {
    ModalWrapper,
    TypeCurrencyCard
  },
  data() {
    return {
      select: ''
    }
  },
  computed: {
    confirmButtonLabel() {
      return this.select === 'custom' ? 'Next' : 'Confirm'
    }
  },
  methods: {
    ...mapMutations({
      mutationAddModal: ADD_MODAL
    }),
    create() {
      this.close()
      if (this.select === 'custom') {
        this.mutationAddModal({
          name: ADD_NEW_CURRENCY
        })
      }
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.wallet-create-modal {
  &__cards {
    width: auto;
    margin: 25px -8px 0;
    display: flex;
    flex-wrap: wrap;
    @include tablet {
      margin: 25px -11.5px 0;
    }
    @include phone {
      margin: 25px -7.5px 0;
    }
  }
  &__card {
    width: calc(20% - 16px);
    margin: 0 8px 16px;
    @include tablet {
      width: calc(16.66% - 23px);
      margin: 0 11.5px 23px;
    }
    @include phone {
      width: calc(25% - 15px);
      margin: 0 7.5px 16px;
    }
  }
  &__links {
    margin-top: 14px;
    display: flex;
    flex-direction: column;
  }
  &__link {
    width: 100%;
    text-decoration: none;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
    line-height: 25px;
    color: var(--main-color) !important;
    &:not(:first-child) {
      margin-top: 12px;
    }
  }
}
</style>
