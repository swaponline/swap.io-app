<template>
  <div class="send-form">
    <div class="send-form__inner">
      <header class="send-form__header">
        <v-btn large icon class="mr-3" @click="close">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h3>Send form</h3>
      </header>
      <form class="send-form__form" @submit.prevent="submit">
        <v-row>
          <v-col cols="12">
            <div class="send-form__hint mb-6">У вас в кошельке: {{ currentWallet.value }}</div>
          </v-col>
          <v-col cols="12">
            <v-text-field v-if="address" :value="address" disabled outlined label="Your wallet">
              <template #append>
                <v-icon>mdi-bitcoin</v-icon>
              </template>
            </v-text-field>
            <v-select
              v-else
              v-model="selectAddress"
              :items="wallets"
              item-text="address"
              item-value="address"
              label="Your wallet"
              outlined
            >
            </v-select>
          </v-col>
          <v-col v-if="feeVisible" cols="12">
            <v-text-field
              v-model="commission"
              :hint="'Рекомендуемая комиссия: ' + recommendedCommission"
              outlined
              label="Transition fee"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="textareaVisible">
          <v-col cols="12">
            <v-textarea
              v-model="listRecipient"
              outlined
              :hint="'Остаток: ' + (maxAmount - regexpSumm)"
              label="Send to"
              placeholder="Enter a list of outputs in the 'Pay to' field.
One output per line.
Format: address, amount"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row v-else class="send-form__recipient">
          <v-col lg="8" cols="12">
            <v-text-field v-model="recipient.wallet" required outlined label="Send to"></v-text-field>
          </v-col>
          <v-col lg="4" cols="12">
            <v-text-field
              v-model="recipient.amount"
              :max="maxAmount"
              type="number"
              step="any"
              min="0"
              :hint="'max: ' + maxAmount"
              required
              outlined
              label="Amount"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn color="blue" block text @click="textareaVisible = !textareaVisible">
              <span class="text-left flex-grow-1">{{
                textareaVisible ? 'Single recipient' : 'Multple recipients'
              }}</span>
            </v-btn>
          </v-col>
          <v-col cols="12" class="d-flex align-center justify-end">
            <a class="d-flex align-center justify-end" @click="feeVisible = true">
              Transaction fee: {{ commission }} BTC ($2.32) Edit <v-icon class="ml-1 mb-1" size="15">mdi-pencil</v-icon>
            </a>
          </v-col>
          <v-col v-if="recipient.amount" cols="12" class="d-flex align-center justify-end">
            Total balance change: {{ recipient.amount }} BTC ($38,002.32)
          </v-col>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn @click="close">Cancel</v-btn>

            <v-btn class="ml-4" type="submit">Send</v-btn>
          </v-col>
        </v-row>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SendForm',
  data() {
    return {
      commission: 0.545,
      recommendedCommission: 0.545,
      recipient: [{ wallet: null, amount: null }],
      textareaVisible: false,
      feeVisible: false,
      listRecipient: '',
      selectAddress: null
    }
  },
  beforeRouteLeave(to, from, next) {
    Object.assign(to.meta, { back: true })
    next()
  },
  computed: {
    wallets() {
      return this.$store.getters.siblingList
    },
    address() {
      return this.$route.query.wallet
    },
    siblingList() {
      return this.$store.getters.siblingList
    },
    currentWallet() {
      if (this.address && this.siblingList) {
        return this.siblingList.find(el => el.address === this.address)
      }
      return {}
    },
    maxAmount() {
      return (this.currentWallet.value * 10 ** 18 - this.commission * 10 ** 18) / 10 ** 18
    },
    regexpSumm() {
      const field = `${this.listRecipient} `
      const arr = [...field.matchAll(/,\s*\d+\.?\d*\s/g)]
      return arr.reduce((acc, el) => {
        const amount = el[0].slice(1).trim()
        return acc + +amount
      }, 0)
    }
  },
  created() {
    this.selectAddress = this.address
  },
  methods: {
    submit() {
      this.close()
    },
    close() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.send-form {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  background: $--white;
  &__inner {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: $--white;
    max-height: calc(100% - 110px);
    @include small-height {
      max-height: none;
    }
    @include tablet {
      width: 100%;
      max-width: 100vw;
    }
  }
  &__header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background: $--white;
    @include tablet {
      padding: 10px 5px;
    }
  }
  &__form {
    padding: 0 15px 10px;
    @include tablet {
      padding: 0 5px 10px;
    }
  }
  &__hint {
    background: rgba($--black, 0.08);
    border: 1px solid rgba($--black, 0.8);
    border-radius: 16px;
    width: 100%;
    margin-bottom: 16px;
    padding: 20px;
    div {
      margin-top: 10px;
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
  &__recipient {
    position: relative;
    justify-content: center;
    @include tablet {
      &:before {
        content: '';
        width: 25%;
        position: absolute;
        top: 0;
        height: 1px;
        background: rgba($color: $--black, $alpha: 0.2);
      }
    }
  }
}
</style>
