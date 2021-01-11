<template>
  <transition-translate>
    <form v-if="visible" class="invoice-form">
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
          <v-col cols="8">
            <v-select
              v-model="type"
              return-object
              item-text="type"
              item-value="id"
              outlined
              class="invoice-form__type"
              :items="types"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select v-model="currency" outlined class="invoice-form__currency" :items="currencies"></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row v-if="type.id !== 1">
        <v-col cols="8">
          <v-text-field outlined :label="type.type" :placeholder="type.type"></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field outlined label="Price"></v-text-field>
        </v-col>
      </v-row>
      <v-textarea outlined label="Comment"></v-textarea>
      <div class="d-flex justify-end">
        <v-btn class="mr-2" type="button" @click="back">Cancel</v-btn>
        <v-btn type="submit">Confirm</v-btn>
      </div>
    </form>
  </transition-translate>
</template>

<script>
import TransitionTranslate from '@/components/Transitions/Translate.vue'

export default {
  name: 'InvoiceForm',
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
      currency: 'USD',
      type: { id: 1, type: 'Amount only' },
      types: [
        { id: 1, type: 'Amount only' },
        { id: 2, type: 'Hourly' },
        { id: 3, type: 'Quantity' }
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
    back() {
      this.$emit('back')
    }
  }
}
</script>

<style lang="scss">
.invoice-form {
  position: absolute;
  z-index: 2000;
  width: calc(100vw - var(--navigation-drawer-desktop-width));
  height: calc(100vh - 40px);
  max-width: calc($--max-content-size - var(--navigation-drawer-desktop-width));
  overflow-x: hidden;
  overflow-y: auto;
  background: $--white;
  padding: 10px 15px;
  @include tablet {
    padding: 10px 5px;
    width: 100vw;
    height: calc(100vh - 97px);
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
