<template>
  <modal-wrapper value persistent class="send-preview" @input="close">
    <div class="send-preview__inner">
      <header class="send-preview__title">
        <v-btn color="black" icon @click="close">
          <v-icon size="30">mdi-chevron-left</v-icon>
        </v-btn>
        <h3>Invoice { number invoice }</h3>
      </header>

      <p v-if="address" class="send-preview__indent">
        <span class="send-preview__indent-title">Wallet ID:</span>
        <span>{{ address }}</span>
      </p>

      <p v-if="address" class="send-preview__indent mb-8">
        <span class="send-preview__indent-title">Wallet balance:</span>
        <span>39 BTC</span>
      </p>

      <span class="send-preview__results mt-6 mb-4">
        <span class="mr-5">Transaction fee: </span>
        <span class="send-preview__fee">
          <span><span class="send-preview__currency-name">USD </span>{{ fee }}</span>
        </span>
      </span>
      <v-row class="mt-auto">
        <v-btn class="send-preview__button" depressed @click="close">Cancel</v-btn>
        <v-btn class="send-preview__button" depressed @click="confirm">Confirm</v-btn>
      </v-row>
    </div>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from '../../ModalWrapper.vue'

export default {
  name: 'SendPreview',
  components: {
    ModalWrapper
  },
  props: {
    address: {
      type: String,
      required: true
    },
    fee: {
      type: Number,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    confirm() {
      this.$emit('close-all')
    }
  }
}
</script>

<style lang="scss">
.send-preview {
  &__inner {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 25px 40px 40px;
    margin: 0 0;
    min-height: calc(var(--vh, 1vh) * 100);

    @include tablet {
      padding: 24px;
    }
    @include phone {
      padding: 12px;
    }
    .row {
      flex-grow: 0;
    }
  }
  &__title {
    display: flex;
    align-items: center;
    margin: 20px -10px 25px;
    width: auto;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-small-subtitle;
  }
  &__indent {
    width: 100%;
    margin: 8px;
    color: $--black;
    font-size: $--font-size-medium;
    span {
      display: block;
    }
  }
  &__indent-title {
    color: $--grey;
  }
  &__results {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    padding: 0 8px;
    flex-grow: 1;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
  }
  &__fee {
    display: flex;
    align-items: center;
    line-height: 21px;
  }
  &__button {
    width: calc(50% - 16px);
    border-radius: 8px;
    margin: auto 8px;
    min-height: 52px;
    text-transform: none;
    font-weight: $--font-weight-bold;
    span {
      font-size: $--font-size-medium;
    }
  }
}
</style>
