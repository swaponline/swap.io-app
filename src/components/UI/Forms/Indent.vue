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

  @include phone {
    font-size: $--font-size-medium;
    line-height: 19px;
  }

  &__title {
    margin-bottom: 4px;
    width: 100%;
    line-height: 22px;
    font-size: $--font-size-medium;
    font-weight: $--font-weight-semi-bold;
    display: block;
    color: $--grey;

    @include phone {
      line-height: 19px;
    }
  }
}
</style>
