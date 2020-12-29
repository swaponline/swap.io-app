<template>
  <transition name="invoice-form">
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
      <v-textarea outlined label="Comment"></v-textarea>
      <div class="d-flex justify-end">
        <v-btn class="mr-2" type="button" @click="back">Cancel</v-btn>
        <v-btn type="submit">Confirm</v-btn>
      </div>
    </form>
  </transition>
</template>

<script>
export default {
  name: 'InvoiceForm',
  props: {
    visible: {
      type: Boolean,
      default: false
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
  position: fixed;
  z-index: 2000;
  width: calc(100vw - 70px);
  height: calc(100vh - 40px);
  overflow-x: hidden;
  overflow-y: auto;
  background: $--white;
  transform: translateX(0);
  padding: 10px 15px;
  @include tablet {
    padding: 10px 5px;
    width: 100vw;
    height: calc(100vh - 97px);
  }
  &--visible {
    transform: translateX(0);
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
.invoice-form-enter-active,
.invoice-form-leave-active {
  transition: 0.5s;
}
.invoice-form-enter,
.invoice-form-leave-to {
  transform: translateX(100vw);
}
</style>
