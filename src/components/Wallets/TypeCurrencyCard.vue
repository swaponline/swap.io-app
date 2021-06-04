<template>
  <label class="type-currency-card" :class="{ 'type-currency-card--selected': selected }">
    <cryptoicon :symbol="iconName.toLowerCase()" size="40" />
    <span class="type-currency-card__name">{{ name }}</span>
    <input class="type-currency-card__input" tabindex="0" type="radio" name="currency" @input="$emit('select')" />
  </label>
</template>

<script>
export default {
  name: 'TypeCurrencyCard',
  props: {
    iconName: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.type-currency-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid $--black;
  border-radius: 12px;
  min-height: 107px;
  padding: 10px 10px;
  outline: none;

  @include tablet {
    min-height: 112px;
  }
  @include phone {
    min-height: 100px;
  }
  &--selected {
    padding: 9px 9px;
    border: 2px solid var(--main-color);
  }
  &:focus-within {
    padding: 9px 9px;
    border: 2px solid var(--main-color);
  }
  &__name {
    font-size: $--font-size-medium;
    line-height: 22px;
    margin-top: 11px;
  }
  &__input {
    position: absolute;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
  }
}
</style>
