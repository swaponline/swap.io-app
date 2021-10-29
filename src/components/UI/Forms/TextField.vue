<template>
  <div class="form-text-field" :class="{ 'form-text-field--with-label': label }">
    <v-text-field v-bind="$attrs" :label="label" color="grey" v-on="$listeners">
      <template #append>
        <slot name="append"></slot>
      </template>
    </v-text-field>
    <div v-if="$slots['form-field-append']" class="form-text-field__append">
      <slot name="form-field-append" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormTextField',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.form-text-field {
  border: 2px solid get-theme-for($text-field, 'border-color', 'enabled');
  border-radius: $--main-border-radius;
  display: flex;
  align-items: center;
  min-height: 52px;
  padding: 0 15px;
  transition: 0.3s;
  width: 100%;
  margin-bottom: 25px;
  flex-grow: 0;

  --mt-value: 0;

  &--with-label {
    --mt-value: 15px;
  }

  @include tablet {
    margin-bottom: 15px;
  }

  @include phone {
    margin-bottom: 10px;
    padding: 0 8px;
  }

  &:hover {
    border-color: get-theme-for($text-field, 'border-color', 'hover');
  }

  &:focus-within {
    border-color: get-theme-for($text-field, 'border-color', 'pressed');
  }
  // переопределим стили vuetify
  .v-input {
    padding: 0 0;
    transition: 0.2s;

    &:focus-within {
      margin-top: var(--mt-value) !important;
    }

    &--is-label-active {
      margin-top: var(--mt-value) !important;
    }

    &__slot {
      margin-bottom: 0 !important;

      &::before {
        display: none;
      }
      &::after {
        display: none;
      }
      input {
        outline: none !important;

        @include phone {
          font-size: $--font-size-medium;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
      }
      label {
        color: $--grey;
      }
    }
    &__append-inner {
      margin-top: -3px;
    }
  }
  .v-label {
    font-weight: 600;
    font-size: 18px;
  }

  .v-text-field {
    margin-top: 0;
    &__details {
      display: none;
    }
  }
}
</style>
