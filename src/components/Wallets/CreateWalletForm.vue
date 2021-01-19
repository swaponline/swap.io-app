<template>
  <transition-translate>
    <transition-inner v-if="visible" class="create-wallet-form">
      <form @submit.prevent="submit">
        <header class="create-wallet-form__header">
          <h3>Create wallet</h3>
          <v-btn icon @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </header>
        <v-text-field v-model="walletName" outlined label="Name wallet"></v-text-field>
        <div class="create-wallet-form__list-currency">
          <v-card
            v-for="c in currencies"
            :key="c.id"
            class="create-wallet-form__card-currency"
            :class="{
              'create-wallet-form__card-currency--select': selectCurrency === c.id
            }"
            @click="selectCurrency = c.id"
          >
            {{ c.name }}
          </v-card>
        </div>
        <v-row>
          <v-col class="d-flex justify-end" cols="12">
            <v-btn class="mr-4" @click="$emit('close')">Cancel</v-btn>
            <v-btn type="submit">Create</v-btn>
          </v-col>
        </v-row>
      </form>
    </transition-inner>
  </transition-translate>
</template>

<script>
import { mapActions } from 'vuex'
import { CREATE_NEW_WALLET } from '@/store/modules/Wallets'

import TransitionTranslate from '../Transitions/Translate.vue'

export default {
  name: 'CreateWalletForm',
  components: {
    TransitionTranslate
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currencies: [
        { id: 1, name: 'BTC' },
        { id: 2, name: 'ETH' },
        { id: 3, name: 'USDT' }
      ],
      selectCurrency: null,
      walletName: ''
    }
  },
  methods: {
    ...mapActions({
      actionCreateNewWallet: CREATE_NEW_WALLET
    }),
    submit() {
      if (this.walletName.trim() && this.selectCurrency) {
        const currency = this.currencies.find(el => el.id === this.selectCurrency).name
        this.actionCreateNewWallet({
          currency,
          name: this.walletName.trim()
        })
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss">
.create-wallet-form {
  padding: 10px 15px;
  @include tablet {
    padding: 10px 10px;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  &__list-currency {
    display: flex;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    margin-bottom: 24px;
  }
  &__card-currency {
    margin-right: 10px;
    min-width: 100px;
    min-height: 100px;
    margin: 10px 10px 10px 1px;
    border: 1px solid rgba($--black, 0.3);
    &--select {
      border: 1px solid rgba($--black, 0.8) !important;
    }
  }
}
</style>
