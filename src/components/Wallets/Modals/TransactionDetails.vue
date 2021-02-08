<template>
  <modal-wrapper value class="transaction-details">
    <div class="transaction-details__inner">
      <h3 class="transaction-details__title">
        <span>Transaction details</span>
        <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
      </h3>
    </div>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from '@/components/ModalWrapper.vue'

export default {
  name: 'TransactionDetails',
  components: {
    ModalWrapper
  },
  methods: {
    clsoe() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.transaction-details {
  &__inner {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 25px 40px 40px;
    margin: 0 0;
    min-height: calc(var(--vh, 1vh) * 100);
    @include phone {
      padding: 20px;
    }
  }
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 8px 25px;
    width: 100%;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-small-subtitle;
  }
}
</style>
