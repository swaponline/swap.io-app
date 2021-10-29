<template>
  <p class="form-indent">
    <slot name="title">
      <span v-if="title" class="form-indent__title">{{ title }}</span>
    </slot>
    <slot>
      <span v-if="text" class="form-indent__text">{{ text }}</span>
    </slot>
  </p>
</template>

<script>
export default {
  name: 'FormIndent',
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.form-indent {
  font-size: $--font-size-extra-small-subtitle;
  line-height: 25px;
  word-break: break-all;
  border: 2px solid transparent;
  border-radius: $--main-border-radius;
  background: get-theme-for($background, 'secondary');
  padding: 6px 15px;

  @include phone {
    font-size: $--font-size-medium;
    line-height: 19px;
  }

  &__title {
    width: 100%;
    line-height: 22px;
    font-size: $--font-size-small;
    font-weight: $--font-weight-semi-bold;
    display: block;
    color: $--grey-3;

    @include phone {
      line-height: 19px;
    }
  }
}
</style>
