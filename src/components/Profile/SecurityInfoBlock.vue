<template>
  <div class="security-info-block">
    <svg-icon
      v-if="nameIcon"
      :name="nameIcon"
      class="security-info-block__icon"
      :class="`security-info-block__icon--${nameIcon}`"
    ></svg-icon>
    <h2 class="security-info-block__title">{{ title }}</h2>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <p class="security-info-block__text" v-html="text"></p>

    <span class="security-info-block__dots">
      <span
        v-for="n in 3"
        :key="n"
        class="security-info-block__dot"
        :class="{ 'security-info-block__dot--fill': n <= id }"
      ></span>
    </span>
    <div class="security-info-block__buttons">
      <v-btn depressed class="security-info-block__button" @click="$emit('back')">Back</v-btn>
      <v-btn depressed class="security-info-block__button" @click="$emit('next')">{{ nameButton }}</v-btn>
    </div>
    <span class="security-info-block__pagination">{{ id }}/3</span>
    <button class="security-info-block__skip" @click="$emit('skip')">Skip introduction</button>
  </div>
</template>

<script>
export default {
  name: 'SecurityInfoBlock',
  props: {
    text: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    nameButton: {
      type: String,
      default: 'Next'
    },
    nameIcon: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Object,
      default: () => ({ w: 300, h: 300 })
    },
    id: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss">
.security-info-block {
  position: relative;
  height: 100%;
  min-height: 555px;
  width: 100%;
  padding: 40px 50px;
  display: flex;
  flex-direction: column;
  @include tablet {
    padding: 5px 20px;
    align-items: center;
  }
  &__icon {
    position: absolute;
    right: 50px;
    top: 40px;
    height: 232px;
    width: 232px;
    @include tablet {
      position: static;
      height: 72px;
      width: 72px;
    }
  }
  &__title {
    font-size: $--font-size-extra-title;
    font-weight: $--font-weight-semi-bold;
    @include tablet {
      margin-top: 20px;
      font-size: $--font-size-subtitle;
      width: 100%;
    }
  }
  &__text {
    margin-top: 40px;
    width: 50%;
    font-size: $--font-size-extra-small-subtitle;
    line-height: 21px;
    font-family: inherit;

    > ul {
      list-style-type: '— ';
      > li {
        margin-bottom: 8px;
      }
    }

    @include tablet {
      width: 100%;
    }
  }
  &__dots {
    display: none;
    @include tablet {
      margin-top: auto;
      display: flex;
    }
  }
  &__dot {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin: 0 5px;
    border: 1px solid $--purple;
    &--fill {
      background: $--purple;
    }
  }
  &__buttons {
    display: flex;
    width: 100%;
    margin: 40px -5px 0;
    @include tablet {
      margin-top: 35px;
    }
  }
  &__button {
    width: 100%;
    margin: 0 5px;
    width: calc(50% - 10px);
    max-width: 174px;
    min-height: 48px;
    font-weight: $--font-weight-semi-bold;
    border-radius: 8px;
    span {
      font-size: $--font-size-extra-small-subtitle;
    }
    @include tablet {
      max-width: none;
    }
  }
  &__pagination {
    margin-top: auto;
    color: $--dark-grey;
    @include tablet {
      display: none;
    }
  }
  &__skip {
    position: absolute;
    right: 50px;
    bottom: 50px;
    padding: 5px 10px;
    outline: none;
    color: $--dark-grey;
    @include tablet {
      position: static;
      margin: 10px 0;
      padding: 15px 20px;
      width: 100%;
    }
  }
}
</style>
