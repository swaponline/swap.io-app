<template>
  <match-media v-slot="{ desktop }" wrapper-tab="div" class="security-info-block">
    <div class="security-info-block__wrapper">
      <swap-button-go-back v-if="!desktop" class="security-info-block__button-i-back" @click="back" />

      <div class="security-info-block__icon-wrapper">
        <svg-icon
          v-if="nameIcon"
          :name="nameIcon"
          class="security-info-block__icon"
          :class="`security-info-block__icon--${nameIcon}`"
        ></svg-icon>
      </div>
      <div class="security-info-block__content">
        <h2 class="security-info-block__title">{{ title }}</h2>

        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="security-info-block__text" v-html="text"></p>
      </div>
    </div>
    <span class="security-info-block__pagination">{{ id }}/3</span>

    <span v-if="!desktop" class="security-info-block__dots">
      <span
        v-for="n in 3"
        :key="n"
        class="security-info-block__dot"
        :class="{ 'security-info-block__dot--fill': n <= id }"
      ></span>
    </span>
    <div class="security-info-block__buttons">
      <div class="security-info-block__buttons-group">
        <v-btn v-if="desktop" depressed class="security-info-block__button" @click="back">Back</v-btn>
        <v-btn depressed class="security-info-block__button" @click="$emit('next')">{{ nameButton }}</v-btn>
      </div>

      <v-btn text class="security-info-block__button security-info-block__button--skip" @click="$emit('skip')"
        >Skip introduction</v-btn
      >
    </div>
  </match-media>
</template>

<script>
import { MatchMedia } from 'vue-component-media-queries'

const FIRST_BLOCK = 1

const DEFAULT_ICON_SIZE = { w: 300, h: 300 }

export default {
  name: 'SecurityInfoBlock',
  components: {
    MatchMedia
  },
  props: {
    text: { type: String, default: '' },
    title: { type: String, default: '' },
    nameButton: { type: String, default: 'Next' },
    nameIcon: { type: String, default: '' },
    iconSize: { type: Object, default: () => DEFAULT_ICON_SIZE },
    id: { type: Number, required: true }
  },
  computed: {
    isFirstBlock() {
      return this.id === FIRST_BLOCK
    }
  },
  methods: {
    back() {
      if (this.isFirstBlock) {
        return this.$router.push({ name: 'CreateOrRecover' })
      }
      return this.$emit('back')
    },
    cancel() {
      return this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss">
.security-info-block {
  padding: 40px 50px;
  height: 100%;
  display: flex;
  align-items: self-end;
  flex-direction: column;

  @include tablet {
    align-items: center;
    padding: 40px 50px;
  }

  &__button-i-back {
    position: absolute;
    left: 40px;
    top: 25px;

    @include phone {
      left: 25px;
    }
  }

  &__wrapper {
    display: flex;
    flex-grow: 1;
    flex-direction: row-reverse;
    justify-content: space-between;

    @include tablet {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    @include phone {
      justify-content: inherit;
    }
  }

  &__content {
    @include only-tablet {
      max-width: 632px;
    }
  }

  &__icon-wrapper {
    margin-right: 50px;

    @include tablet {
      margin-right: 0;
    }
  }

  &__icon {
    height: 232px;
    width: 232px;

    @include tablet {
      position: static;
    }

    @include phone {
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
    font-size: $--font-size-extra-small-subtitle;
    line-height: 21px;
    width: 87%;
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
    margin-top: auto;
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 23px;
  }

  &__dot {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin: 0 5px;
    border: 1px solid var(--main-color);

    &--fill {
      background: var(--main-color);
    }
  }

  &__buttons {
    width: 100%;
    text-align: center;

    &-group {
      margin-bottom: 26px;

      @include tablet {
        margin-bottom: 0;
      }
    }
  }

  &__button {
    width: 100%;
    max-width: 174px;
    min-height: 48px;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-button;
    border-radius: $--main-border-radius;
    text-transform: none;

    .v-btn__content {
      color: $--black;
    }

    &--skip {
      padding: 5px 10px;
      font-size: $--font-size-medium;

      .v-btn__content {
        color: $--dark-grey;
      }

      @include tablet {
        padding: 15px 20px;
        width: 100%;
      }
    }

    &:not(:last-child) {
      margin-right: 10px;
    }

    span {
      font-size: $--font-size-extra-small-subtitle;
    }

    @include tablet {
      max-width: none;
    }
  }

  &__pagination {
    color: $--dark-grey;
    position: absolute;
    bottom: 23%;

    @include tablet {
      display: none;
    }
  }
}
</style>
