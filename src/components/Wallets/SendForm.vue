<template>
  <form class="send-form" @submit.prevent="submit">
    <header class="d-flex mb-2 align-center">
      <v-btn large icon class="mr-3" @click="close">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h3>Send form</h3>
    </header>
    <div class="send-form__hint">
      <div>У вас в кошельке: {{ currentWallet.value }}</div>
      <div>Комиссия: {{ commission }}</div>
      <div>Максимальнрая сумма отправки: {{ maxAmount }}</div>
    </div>
    <v-row>
      <v-col cols="12">
        <v-text-field :value="address" disabled outlined label="Your wallet">
          <template #append>
            <v-icon>mdi-bitcoin</v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row v-for="recepient in recipients" :key="recepient.id" class="send-form__recepient">
      <v-col lg="8" cols="12">
        <v-text-field v-model="recepient.wallet" required outlined label="Send to"></v-text-field>
      </v-col>
      <v-col lg="4" cols="12">
        <v-text-field
          v-model="recepient.amount"
          :max="recepient.maxAmount"
          type="number"
          step="any"
          min="0"
          required
          outlined
          label="Amount"
          @focus="updateMaxAmount(recepient.id)"
        >
          <template #append-outer>
            <v-icon @click="removeRecepient(recepient)">mdi-close</v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn color="blue" block text @click="addRecepient">
          <span class="text-left flex-grow-1">+ Add recipient</span>
        </v-btn>
      </v-col>
      <v-col cols="12" class="text-right">
        <span>Сумма: {{ totalAmount }}</span>
      </v-col>
      <v-col cols="12" class="text-right">
        <span>Остаток: {{ maxAmount - totalAmount }}</span>
      </v-col>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn @click="close">Cancel</v-btn>
        <v-btn class="ml-4" type="submit">Send</v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script>
export default {
  name: 'SendForm',
  data() {
    return {
      commission: 0.545,
      recipients: [{ id: 1, wallet: null, amount: null }]
    }
  },
  computed: {
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
    totalAmount() {
      return this.recipients.reduce((acc, el) => {
        return acc + +el.amount
      }, 0)
    },
    maxAmount() {
      return (this.currentWallet.value * 10 ** 18 - this.commission * 10 ** 18) / 10 ** 18
    }
  },
  methods: {
    submit() {
      this.close()
    },
    close() {
      this.$emit('close')
    },
    addRecepient() {
      const lastRecipient = this.recipients[this.recipients.length - 1]
      const id = lastRecipient ? lastRecipient.id + 1 : 1
      this.recipients.push({ id, wallet: null, amount: null, maxAmount: null })
    },
    removeRecepient(recipient) {
      if (recipient) {
        this.recipients.splice(this.recipients.indexOf(recipient), 1)
      }
    },
    updateMaxAmount(id) {
      const rec = this.recipients.find(el => el.id === id)
      rec.maxAmount = this.maxAmount - this.totalAmount + +rec.amount
    }
  }
}
</script>

<style lang="scss">
.send-form {
  position: absolute;
  z-index: $--z-index-high;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  max-width: calc(var(--max-content-size) - var(--navigation-drawer-desktop-width));
  overflow-x: hidden;
  overflow-y: auto;
  background: $--white;
  padding: 10px 15px;
  @include tablet {
    padding: 10px 5px;
    width: 100vw;
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
  &__recepient {
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
