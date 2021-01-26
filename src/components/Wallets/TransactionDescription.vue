<template>
  <form class="transaction-description">
    <input
      v-show="inputShow"
      ref="input"
      :value="value"
      type="text"
      class="transaction-description__input"
      @keyup.space.prevent
      @click.stop
      @blur="inputShow = false"
      @input="$emit('input', $event.target.value)"
    />
    <button v-show="!inputShow" type="button" class="transaction-description__butoon-show" @click.stop="showInput">
      <span>{{ value }}<svg-icon class="transaction-description__edit-icon" name="edit"></svg-icon></span>
    </button>
  </form>
</template>

<script>
export default {
  name: 'TransactionDescription',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputShow: false
    }
  },
  methods: {
    async showInput() {
      this.inputShow = true
      await this.$nextTick()
      this.$refs.input.focus()
    },
    addComment() {
      this.inputShow = false
    }
  }
}
</script>

<style lang="scss">
.transaction-description {
  margin-bottom: 5px;
  width: 100%;
  font-size: $--font-size-medium;
  color: $--black;
  &__input {
    width: 100%;
    &:focus {
      outline: 1px solid rgba($color: $--black, $alpha: 0.12);
    }
  }
  &__button-show {
    width: fit-content;
  }
  &__edit-icon {
    margin-left: 8px;
    width: 11px;
    height: 11px;
  }
}
</style>
