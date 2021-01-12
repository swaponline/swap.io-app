<template>
  <transition-translate>
    <form v-if="visible && !share" class="invoice-form" @submit.prevent="share = true">
      <header class="d-flex mb-2 align-center">
        <v-btn large icon class="mr-3" @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h3>Invoice Form</h3>
      </header>
      <v-text-field :value="address" disabled outlined label="Your wallet"></v-text-field>
      <v-text-field outlined label="Amount">
        <template #append>
          <v-select class="py-0 my-0 mx-0" :items="[1, 2, 3, 4, 5]"></v-select>
        </template>
      </v-text-field>
      <v-text-field outlined label="Your contact (email or @nickname)"></v-text-field>
      <div class="invoice-form__items">
        <h3>Invoice Items</h3>
        <v-row>
          <v-col class="invoice-form__field" cols="8">
            <v-select
              v-model="type"
              return-object
              item-text="label"
              item-value="id"
              outlined
              class="invoice-form__type"
              :items="types"
            ></v-select>
          </v-col>
          <v-col class="invoice-form__field" cols="4">
            <v-select v-model="currency" outlined class="invoice-form__currency" :items="currencies"></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row v-if="type.id !== 1">
        <v-col class="invoice-form__field" cols="8">
          <v-text-field outlined :label="type.label" :placeholder="type.label"></v-text-field>
        </v-col>
        <v-col class="invoice-form__field" cols="4">
          <v-text-field outlined label="Price"></v-text-field>
        </v-col>
      </v-row>
      <v-textarea outlined label="Comment"></v-textarea>
      <div class="d-flex justify-end">
        <v-btn class="mr-2" type="button" @click="back">Cancel</v-btn>
        <v-btn type="submit">Confirm</v-btn>
      </div>
    </form>
    <invoice-share v-else-if="visible && share" @close="back"></invoice-share>
  </transition-translate>
</template>

<script>
import TransitionTranslate from '@/components/Transitions/Translate.vue'
import InvoiceShare from './InvoiceShare.vue'

export default {
  name: 'InvoiceForm',
  components: {
    TransitionTranslate,
    InvoiceShare
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      share: false,
      currency: 'USD',
      type: { id: 1, label: 'Amount only' },
      types: [
        { id: 1, label: 'Amount only' },
        { id: 2, label: 'Hourly' },
        { id: 3, label: 'Quantity' }
      ],
      currencies: ['USD', 'BTC', 'ETH']
    }
  },
  computed: {
    address() {
      return this.$route.query.wallet
    }
  },
  methods: {
    confirm() {
      this.$router.push({ name: 'Invoice', params: { invoiceId: '123asdfdjai' } })
    },
    back() {
      this.share = false
      this.$emit('back')
    }
  }
}
</script>

<style lang="scss">
.invoice-form {
  position: absolute;
  z-index: $--z-index-high;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  max-width: calc(var(--max-content-size) - var(--navigation-drawer-desktop-width));
  overflow-x: hidden;
  overflow-y: auto;
  background: $--white;
  padding: 10px 15px;
  @include tablet {
    padding: 10px 5px;
    width: 100vw;
  }
  &__field {
    @include tablet {
      flex-basis: 100%;
      max-width: 100%;
    }
  }
  .v-text-field__details {
    display: none;
  }
  .v-select__slot {
    min-height: 48px;
  }
  .v-input__append-inner {
    margin-top: 0;
    align-self: center;
  }
}
</style>
