<template>
  <v-select :value="value" v-bind="$attrs" class="form-selector" v-on="allListeners"></v-select>
</template>

<script>
export default {
  name: 'FormSelector',
  inheritAttrs: false,
  props: {
    value: {
      type: [Object, Number, String, null],
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
.form-selector {
  border-radius: 8px;
  border: 1px solid $--black;
  color: $--blue !important;
  margin: 0 8px 25px !important;
  flex-basis: 20% !important;
  max-height: 52px;
  &:focus-within {
    border-color: $--blue;
  }

  @include phone {
    width: 100%;
    flex-basis: 100% !important;
  }
  // переопределим стили vuetify
  .v-select__selections {
    padding: 0 0 !important;
    input {
      padding: 0 0 !important;
    }
  }
  fieldset {
    display: none;
  }
  .v-text-field__details {
    display: none;
  }
  .v-input__slot {
    min-height: 52px !important;
    margin: 0 0;
  }
  .v-input__append-inner {
    margin-top: 15px !important;
  }
  .v-label {
    margin-top: -2px;
  }
  .v-label--active {
    display: none;
  }
}
</style>
