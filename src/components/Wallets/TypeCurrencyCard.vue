<template>
  <button
    class="type-currency-card"
    :class="{ 'type-currency-card--select': select }"
    type="button"
    @click="$emit('click')"
  >
    <component
      :is="iconName ? 'SvgIcon' : 'div'"
      class="type-currency-card__icon"
      :name="`cards/card-${iconName}`"
    ></component>
    <span class="type-currency-card__name">{{ name }}</span>
  </button>
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
    select: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.type-currency-card {
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
  &--select {
    padding: 9px 9px;
    border: 2px solid $--purple;
  }
  &__icon {
    height: 40px;
    width: 40px;
  }
  &__name {
    font-size: $--font-size-medium;
    line-height: 22px;
    margin-top: 11px;
  }
}
</style>
