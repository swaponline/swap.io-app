<template>
  <div class="show-secret-phrase">
    <header class="show-secret-phrase__title">Your secret phrase</header>
    <div class="show-secret-phrase__words">
      <span v-for="(word, i) in words" :key="word + i" class="show-secret-phrase__word"> {{ i + 1 }}. {{ word }} </span>
    </div>
    <div class="show-secret-phrase__buttons">
      <v-btn class="show-secret-phrase__button" depressed>Back</v-btn>
      <v-btn class="show-secret-phrase__button" depressed @click="$emit('next')">Next</v-btn>
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
  &__title {
    width: 100%;
    text-align: center;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-title;
    @include tablet {
      width: 100%;
      text-align: left;
      font-size: $--font-size-subtitle;
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
    @include tablet {
      margin-top: 20px;
      width: calc(100% / 3);
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
    min-height: 48px;
    width: 174px;
    text-transform: none;
    border-radius: 8px;
    display: flex;
    > span {
      font-weight: $--font-weight-semi-bold;
      font-size: $--font-size-extra-small-subtitle;
    }
    @include tablet {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}
</style>
