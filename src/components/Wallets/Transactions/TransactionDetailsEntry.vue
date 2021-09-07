<template>
  <form-indent class="transaction-entry" :class="{ 'transaction-entry--editable': editable }">
    <div class="transaction-entry__column">
      <span class="transaction-entry__title">{{ title }}</span>
      <swap-copy-wrapper v-if="canCopy">
        <template #default="{ copy, tooltipOn }">
          <button class="transaction-entry__copy-button" type="button" v-on="tooltipOn" @click="copy(wallet)">
            <div class="transaction-entry__wallet">
              <cryptoicon
                v-if="currency"
                class="transaction-entry__currency-icon"
                :symbol="currency.toLowerCase()"
                size="14"
              />
              <span>{{ wallet }}</span>
              <svg-icon class="transaction-entry__copy-icon" name="copy" />
            </div>
          </button>
        </template>
      </swap-copy-wrapper>
      <div v-else class="transaction-entry__wallet">
        <cryptoicon
          v-if="currency"
          class="transaction-entry__currency-icon"
          :symbol="currency.toLowerCase()"
          size="14"
        />
        <span>{{ wallet }}</span>
      </div>
    </div>
    <div class="transaction-entry__column transaction-entry__column--right">
      <span class="transaction-entry__value" :class="{ 'transaction-entry__value--expense': isExpense }"
        >{{ getValue(value) }} {{ currency }}</span
      >
      <span class="transaction-entry__sum">~USD 323.00</span>
    </div>
    <button v-if="editable" class="transaction-entry__edit" @click="editEntry">
      Edit
    </button>
  </form-indent>
</template>

<script>
import SwapCopyWrapper from '@/components/UI/SwapCopyWrapper.vue'
import FormIndent from '@/components/UI/Forms/Indent.vue'

import { convertToDecimalNotation } from '@/utils/common'

export default {
  name: 'TrnasactionEntry',
  components: { FormIndent, SwapCopyWrapper },
  props: {
    wallet: { type: String, default: '' },
    value: { type: [Number, String], default: 0 },
    currency: { type: String, default: '' },
    decimals: { type: Number, default: 0 },
    rate: { type: Object, default: () => {} },

    label: { type: String, default: '' },
    canCopy: { type: Boolean, default: false },
    editable: { type: Boolean, default: false }
  },
  computed: {
    isExpense() {
      return this.value < 0
    },
    rateValue() {
      return this.rate?.value || 500
    },
    currentDecimal() {
      return Math.ceil(this.rateValue).toString().length + 1
    },
    title() {
      if (this.label) {
        return `${this.label}:`
      }
      return !this.isExpense ? 'To:' : 'From:'
    }
  },
  methods: {
    getValue(value) {
      return convertToDecimalNotation(value, this.decimals).toFixed(this.currentDecimal)
    },
    editEntry() {
      this.$emit('edit-entry')
    }
  }
}
</script>

<style lang="scss">
.transaction-entry {
  $this: &;
  display: flex;
  justify-content: space-between;
  font-weight: $--font-weight-semi-bold;
  font-size: $--font-size-base;
  line-height: 19px;

  &--editable {
    &:hover {
      #{$this}__edit {
        display: block;
      }
      #{$this}__column--right {
        display: none;
      }
    }
  }

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

  &__wallet {
    display: flex;
    align-items: center;
  }

  &__currency-icon {
    margin-right: 5px;
    flex-shrink: 0;
  }

  &__copy-button {
    text-align: left;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__copy-icon {
    width: 14px;
    height: 14px;
    margin-left: 8px;
    flex-shrink: 0;
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

  &__edit {
    display: none;
    color: $--grey-3;
  }
}
</style>
