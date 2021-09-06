<template>
  <form-indent class="transaction-entry" :class="{ 'transaction-entry--editable': editable }">
    <div class="transaction-entry__column">
      <span class="transaction-entry__title">{{ title || (!isExpense > 0 ? 'To:' : 'From:') }}</span>
      <swap-copy-wrapper v-if="canCopy">
        <template #default="{ copy, tooltipOn }">
          <button class="transaction-entry__copy-button" type="button" v-on="tooltipOn" @click="copy(wallet)">
            <span class="transaction-entry__wallet">{{ wallet }}</span>
            <svg-icon class="transaction-entry__copy-icon" name="copy" />
          </button>
        </template>
      </swap-copy-wrapper>
      <span v-else class="transaction-entry__wallet">{{ wallet }}</span>
    </div>
    <div class="transaction-entry__column transaction-entry__column--right">
      <span class="transaction-entry__value" :class="{ 'transaction-entry__value--expense': isExpense }"
        >{{ value }} BTC</span
      >
      <span class="transaction-entry__sum">~USD 323.00</span>
    </div>
    <button class="transaction-entry__column transaction-entry__column--right">
      Edit
    </button>
  </form-indent>
</template>

<script>
import SwapCopyWrapper from '@/components/UI/SwapCopyWrapper.vue'
import FormIndent from '@/components/UI/Forms/Indent.vue'

export default {
  name: 'TrnasactionEntry',
  components: { FormIndent, SwapCopyWrapper },
  props: {
    wallet: { type: String, default: '' },
    value: { type: [Number, String], default: 0 },
    canCopy: { type: Boolean, default: false },
    title: { type: String, default: '' },
    editable: { type: Boolean, default: false }
  },
  computed: {
    isExpense() {
      return this.value < 0
    }
  }
}
</script>

<style lang="scss">
.transaction-entry {
  display: flex;
  justify-content: space-between;
  font-weight: $--font-weight-semi-bold;
  font-size: $--font-size-base;

  &__column {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__column--right {
    text-align: right;
    margin-left: 16px;
  }

  &__title {
    color: $--grey-3;
  }

  &__copy-button {
    text-align: left;
  }

  &__copy-icon {
    width: 14px;
    height: 14px;
    margin-left: 8px;
  }

  &__sum {
    color: $--grey-3;
    white-space: nowrap;
  }

  &__value {
    color: $--green;
    white-space: nowrap;
  }

  &__value--expense {
    color: $--text-color-error;
  }
}
</style>
