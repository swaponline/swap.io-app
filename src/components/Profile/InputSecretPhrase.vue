<template>
  <div class="input-secret-phrase">
    <header class="input-secret-phrase__title">Fill in the missing words</header>
    <div class="input-secret-phrase__words">
      <div v-for="(word, i) in wordsWrapper" :key="word + i" class="show-secret-phrase__word">
        <label v-if="inputIndexes.includes(i)" class="input-secret-phrase__label">
          <span> {{ i + 1 }}. </span>
          <input
            :value="word"
            type="text"
            class="input-secret-phrase__field"
            @input="setValue(i, $event.target.value)"
          />
        </label>
        <span v-else> {{ i + 1 }}. {{ word }} </span>
      </div>
    </div>
    <div class="input-secret-phrase__buttons">
      <v-btn class="input-secret-phrase__button" depressed @click="$emit('back')">Back</v-btn>
      <v-btn class="input-secret-phrase__button" :disabled="!isDisabledCreate" depressed @click="$emit('create')"
        >Create</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputSecretPhrase',
  props: {
    words: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      wordsWrapper: [],
      inputIndexes: []
    }
  },
  computed: {
    isDisabledCreate() {
      const a = this.words.toString()
      const b = this.wordsWrapper.toString()
      return a === b
    }
  },
  created() {
    const array = [...this.words]
    let i = 0
    while (i < 6) {
      const index = this.randomInteger(0, array.length - 1)
      if (array[index]) {
        array[index] = ''
        this.inputIndexes.push(index)
        i += 1
      }
    }
    this.wordsWrapper = array
  },
  methods: {
    randomInteger(min, max) {
      const rand = min + Math.random() * (max + 1 - min)
      return Math.floor(rand)
    },
    setValue(index, value) {
      this.wordsWrapper.splice(index, 1, value)
    }
  }
}
</script>

<style lang="scss">
.input-secret-phrase {
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
    margin: 30px -5px 20px;
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
  &__label {
    display: flex;
    border-bottom: 1px solid $--black;
    margin-right: 20px;
  }
  &__field {
    min-width: 100px;
    margin-left: 5px;
    outline: none;
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
