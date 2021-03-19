<template>
  <div class="show-secret-phrase">
    <header class="show-secret-phrase__header">
      Your secret phrase
      <v-btn class="show-secret-phrase__back-button" large icon @click="back">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </header>
    <div class="show-secret-phrase__words">
      <span v-for="(word, i) in words" :key="word + i" class="show-secret-phrase__word"> {{ i + 1 }}. {{ word }} </span>
    </div>
    <div class="show-secret-phrase__buttons">
      <swap-button class="show-secret-phrase__button show-secret-phrase__button--hide-tablet" @click="back">
        Back
      </swap-button>
      <swap-button class="show-secret-phrase__button" @click="$emit('next')">Next</swap-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowSecretPhrase',
  props: {
    words: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    back() {
      this.$router.push({ name: 'ChooseStyle' })
    }
  }
}
</script>

<style lang="scss">
.show-secret-phrase {
  position: relative;
  height: 100%;
  min-height: 555px;
  width: 100%;
  padding: 40px 50px 60px;
  display: flex;
  flex-direction: column;
  @include tablet {
    padding: 20px 20px;
  }
  &__header {
    position: relative;
    width: 100%;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-title;
    display: flex;
    align-items: center;
    justify-content: center;
    @include tablet {
      width: 100%;
      font-size: $--font-size-subtitle;
    }
  }
  &__back-button {
    position: absolute;
    display: none;
    left: -12px;
    @include tablet {
      display: inline-block;
    }
  }
  &__words {
    margin: 30px 0 20px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    @include tablet {
      margin-top: 0;
    }
  }
  &__word {
    width: calc(100% / 6);
    font-size: $--font-size-extra-small-subtitle;
    margin-top: 30px;
    border-bottom: 1px solid transparent;
    @include tablet {
      margin-top: 20px;
      width: calc(100% / 3);
    }
    @include phone {
      font-size: $--font-size-medium;
    }
    @include small {
      font-size: $--font-size-base;
    }
  }
  &__buttons {
    margin-top: auto;
    display: flex;
    justify-content: center;
    @include tablet {
      flex-wrap: wrap-reverse;
    }
  }
  &__button {
    margin: 0 5px;
    min-width: 174px !important;
    @include tablet {
      width: 100%;
      margin-bottom: 10px;
      &--hide-tablet {
        display: none;
      }
    }
  }
}
</style>
