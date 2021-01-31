<template>
  <div class="form-text-field">
    <v-text-field :value="value" v-bind="$attrs" v-on="allListeners">
      <template #append>
        <slot name="append"></slot>
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: 'FormTextField',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, null],
      default: null
    }
  },
  computed: {
    allListeners() {
      return {
        ...this.$listeners,
        input: this.input
      }
    }
  },
  methods: {
    input(value) {
      this.$emit('input', value)
    }
  }
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
  margin: 0 8px 25px;
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
