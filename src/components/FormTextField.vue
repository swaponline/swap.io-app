<template>
  <div class="form-text-field">
    <v-text-field v-bind="$attrs" v-on="$listeners">
      <template #append>
        <slot name="append"></slot>
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: 'FormTextField',
  inheritAttrs: false
}
</script>

<style lang="scss">
.form-text-field {
  border: 1px solid $--black;
  border-radius: 8px;
  display: flex;
  align-items: center;
  min-height: 52px;
  padding: 0 15px;
  transition: 0.3s;
  width: 100%;
  flex-grow: 1;
  margin-bottom: 25px;
  flex-grow: 0;
  @include phone {
    padding: 0 8px;
  }
  &:focus-within {
    border-color: $--blue;
  }
  // переопределим стили vuetify
  .v-input {
    padding: 0 0;
    transition: 0.2s;
    &:focus-within {
      margin-top: 15px;
    }
    &--is-label-active {
      margin-top: 15px;
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

  .v-text-field__details {
    display: none;
  }
}
</style>
