<template>
  <div class="swap-switcher">
    <label class="swap-switcher__wrapper">
      <span if="label" class="swap-switcher__label">{{ label }}</span>
      <input v-model="model" type="checkbox" class="swap-switcher__input" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'SwapSwitch',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    model: {
      get() {
        return this.checked
      },
      set(value) {
        this.$emit('change', value)
      }
    }
  }
}
</script>

<style lang="scss">
.swap-switcher {
  width: fit-content;

  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__label {
    cursor: pointer;
    font-size: 12px;
    margin-right: 4px;
    color: var(--primary-text);
  }

  &__input {
    position: relative;
    width: 14px;
    height: 8px;
    margin: 0;

    vertical-align: top;

    .theme--light & {
      background: $--border-grey;
    }

    .theme--dark & {
      background-color: $--black;
    }
    border-radius: 16px;
    outline: none;
    cursor: pointer;
    appearance: none;
    transition: all 0.3s cubic-bezier(0.2, 0.85, 0.32, 1.2);

    &::after {
      content: '';

      position: absolute;
      left: 1px;
      top: 1px;

      width: 6px;
      height: 6px;
      background-color: $--white;
      border-radius: 50%;

      box-shadow: 0px 0px 15px rgba(17, 17, 17, 0.02);
      transform: translateX(0);
      transition: all 0.3s cubic-bezier(0.2, 0.85, 0.32, 1.2);
    }

    &:checked {
      .theme--light & {
        background-color: $--black;
      }

      .theme--dark & {
        background: $--border-grey;
      }
    }

    &:checked::after {
      transform: translateX(100%);
      background-color: $--white;
      transition: all 3s;
    }
  }
}
</style>
