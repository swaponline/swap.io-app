<template>
  <div class="choose-style">
    <div class="choose-style__inner">
      <header class="choose-style__header">
        <h1 class="choose-style__title">Choose title</h1>
        <span class="choose-style__subtitle">it cannot be changed later</span>
      </header>
      <div class="choose-style__cards">
        <div v-for="cardColor in cardColors" :key="cardColor.background" class="choose-style__card">
          <div
            class="choose-style__card-inner"
            :class="{ 'choose-style__card-inner--select': selectGradient === cardColor }"
            @click="select(cardColor)"
          >
            <div
              class="choose-style__card-background"
              :style="`background: linear-gradient(${cardColor.background});`"
            ></div>
          </div>
          <span v-if="selectGradient === cardColor" class="choose-style__card-text" :style="`color: ${cardColor.color}`"
            >Complementary text
          </span>
        </div>
      </div>
      <span v-if="selectGradient.color" class="choose-style__text" :style="`color: ${selectGradient.color}`"
        >Complementary text
      </span>
      <div class="choose-style__buttons">
        <swap-button class="choose-style__button" @click="goToSecretPhrase">Create</swap-button>
        <swap-button
          class="choose-style__button choose-style__button--text"
          :depressed="false"
          text
          @click="actionFillCards"
        >
          Refresh colors
        </swap-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { MODULE_NAME as PROFILE_MODULE, SET_USERS_COLORS, FILL_CARDS } from '@/store/modules/Profile'

export default {
  name: 'ChooseStyle',
  data() {
    return {
      selectGradient: {
        background: '',
        color: '',
        wordList: []
      }
    }
  },
  computed: {
    cardColors() {
      return this.$store.state[PROFILE_MODULE].list
    }
  },
  mounted() {
    this.actionFillCards()
  },
  methods: {
    ...mapActions({
      actionSetUsersColors: SET_USERS_COLORS,
      actionFillCards: FILL_CARDS
    }),
    select(color) {
      this.selectGradient = color
      this.setBackground()
    },
    goToSecretPhrase() {
      if (this.selectGradient.wordList.length > 0) {
        this.$router.push({ name: 'SecretPhrase' })
      }
    },
    setBackground() {
      this.actionSetUsersColors(this.selectGradient)
    }
  }
}
</script>

<style lang="scss">
.choose-style {
  width: 100%;
  max-width: 1064px;
  height: 100%;
  max-height: 555px;
  margin: 20px auto;
  background: $--white;
  flex-grow: 1;
  border-radius: 12px;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  @include tablet {
    width: auto;
    margin: 20px 20px 25px;
    max-height: none;
    max-width: none;
  }
  &__inner {
    position: relative;
    height: 100%;
    min-height: 555px;
    width: 100%;
    padding: 40px 67px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include tablet {
      padding: 24px 20px;
      align-items: center;
    }
  }
  &__header {
    width: 100%;
    text-align: center;
  }
  &__title {
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-title;
    @include tablet {
      width: 100%;
      font-size: $--font-size-subtitle;
    }
  }
  &__subtitle {
    margin-top: 10px;
    color: $--grey-3;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-medium;
    @include tablet {
      width: 100%;
      text-align: left;
      font-size: $--font-size-medium;
    }
  }
  &__cards {
    margin: 75px -7px 20px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    @include tablet {
      margin: 30px -7px 60px;
    }
    @include phone {
      margin: 30px -2px 10px;
    }
  }
  &__card {
    width: calc(25% - 14px);
    margin: 0 7px;
    @include tablet {
      width: calc(50% - 14px);
      margin: 9px 7px;
    }
    @include phone {
      width: calc(50% - 4px);
      margin: 2px;
    }
  }
  &__card-inner {
    padding: 5px 5px;
    border-radius: 20px;
    border: 5px solid transparent;
    &--select {
      border-color: $--grey;
    }
  }
  &__card-background {
    border-radius: 12px;
    width: 100%;
    height: 120px;
    @include tablet {
      height: 145px;
    }
    @include phone {
      height: 100px;
    }
  }
  &__card-text {
    display: block;
    margin-top: 22px;
    width: 100%;
    text-align: center;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
    @include tablet {
      display: none;
    }
  }
  &__text {
    display: none;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
    @include tablet {
      display: block;
    }
    @include phone {
      margin-top: auto;
    }
  }
  &__buttons {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    @include tablet {
      margin: auto auto 0;
      max-width: 400px;
    }
    @include phone {
      margin-top: 30px;
    }
  }
  &__button {
    margin: 0 5px;
    min-width: 174px !important;
    &--text {
      margin-top: 10px;
      color: $--dark-grey !important;
    }
    @include tablet {
      margin-bottom: 10px;
    }
  }
}
</style>
