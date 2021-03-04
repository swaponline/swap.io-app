<template>
  <v-select v-bind="$attrs" class="form-selector" v-on="$listeners"></v-select>
</template>

<script>
export default {
  name: 'FormSelector',
  inheritAttrs: false
}
</script>

<style lang="scss">
.form-selector {
  border-radius: 8px;
  border: 1px solid $--black;
  color: $--blue !important;
  margin-bottom: 25px !important;
  flex-basis: 20% !important;
  max-height: 52px;
  width: 100%;
  @include tablet {
    margin-bottom: 15px !important;
  }
  @include phone {
    margin-bottom: 10px !important;
  }
  &:focus-within {
    border-color: $--blue;
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
    @include phone {
      padding: 0 8px !important;
    }
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
