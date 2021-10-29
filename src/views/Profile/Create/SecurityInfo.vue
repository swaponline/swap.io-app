<template>
  <match-media v-slot="{ desktop }" wrapper-tag="div">
    <div class="security-info">
      <div class="security-info__wrapper">
        <div v-if="desktop" class="security-info__list">
          <security-info-block
            v-for="securityInfoBlock in $options.securityInfoBlocks"
            :key="securityInfoBlock.id"
            class="security-info__item"
          >
            <template #header>
              <svg-icon :name="securityInfoBlock.iconName" class="security-info__item-icon" />
            </template>
            <div class="security-info__item-text" v-html="securityInfoBlock.text"></div>
          </security-info-block>
        </div>
        <swap-stepper v-else :active-step="activeStep" class="security-info__stepper">
          <template v-for="securityInfoBlock in $options.securityInfoBlocks" v-slot:[securityInfoBlock.id]>
            <security-info-block :key="securityInfoBlock.id" class="security-info__item">
              <template #header>
                <svg-icon :name="securityInfoBlock.iconName" class="security-info__item-icon"></svg-icon>
              </template>
              <div class="security-info__item-text">
                <div class="security-info__item-text-wrapper" v-html="securityInfoBlock.text"></div>
              </div>
              <template #footer>
                <div class="security-info__dots">
                  <span
                    v-for="n in $options.securityInfoBlocks.length"
                    :key="n"
                    :class="{ 'security-info__dot--fill': n === activeStep }"
                    class="security-info__dot"
                  ></span>
                </div>
              </template>
            </security-info-block>
          </template>
        </swap-stepper>
        <div class="security-info__buttons">
          <div class="security-info__buttons-wrapper">
            <swap-button class="security-info__button" @click="back">Back</swap-button>
            <swap-button class="security-info__button" @click="next">Next</swap-button>
          </div>
        </div>
      </div>
    </div>
  </match-media>
</template>

<script>
import { MatchMedia } from 'vue-component-media-queries'
import SecurityInfoBlock from '@/components/Profile/SecurityInfoBlock'

const securityInfoBlocks = [
  {
    id: 1,
    iconName: 'wallet',
    text: 'To get started, <b>create a profiles</b> that can have any number of crypto wallets.'
  },
  {
    id: 2,
    iconName: 'safe',
    text: `The profile is based on a <b>secret mnemonic phrase</b> that is stored in your Web browser. This is all
    you need to know to restore all your crypto wallets.`
  },
  {
    id: 3,
    iconName: 'palette',
    text: 'Each profiles has its own <b>unique color scheme.</b> This will protect you from phishing.'
  }
]

export default {
  securityInfoBlocks,
  name: 'SecurityInfo',
  components: {
    MatchMedia,
    SecurityInfoBlock
  },
  inject: ['mediaQueries'],
  data() {
    return {
      activeStep: 1
    }
  },
  methods: {
    back() {
      if (this.mediaQueries.desktop || this.activeStep === 1) {
        this.$router.push({ name: 'CreateOrRecover' })
      }

      this.activeStep -= 1
    },
    next() {
      if (this.mediaQueries.desktop || this.activeStep === securityInfoBlocks.length) {
        this.$router.push({ name: 'CreateProfile' })
      }

      this.activeStep += 1
    }
  }
}
</script>

<style lang="scss">
.security-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  @include tablet {
    display: unset;
    height: 100%;
  }

  @include phone {
    margin-top: 0;
  }

  &__list {
    display: flex;
    margin-bottom: 20px;
  }

  &__wrapper {
    @include tablet {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }

  &__stepper {
    height: 100%;
    margin: 0 40px 20px;
    flex: 1 1 80%;

    @include phone {
      margin: 20px;
    }
  }

  &__item {
    &:not(:last-child) {
      margin-right: 20px;
    }

    &-icon {
      width: 134px;
      height: 157px;

      @include tablet {
        width: 284px;
        height: 327px;
      }

      @include phone {
        width: 134px;
        height: 157px;
      }
    }

    &-text {
      font-size: $--font-size-extra-small-subtitle;

      @include only-tablet {
        display: flex;
        justify-content: center;
      }

      @include small-phone {
        font-size: 13px;
      }

      &-wrapper {
        @include only-tablet {
          width: 407px;
        }
      }
    }
  }

  &__buttons {
    width: 100%;
    background: get-theme-for($background, 'primary');
    border-radius: 12px;
    padding: 22px;

    &-wrapper {
      display: flex;
      justify-content: center;
    }

    @include tablet {
      width: inherit;
      flex: 0 0 10%;
      margin: 0 40px 40px;
      padding: 26px;
    }

    @include phone {
      margin: 0 20px 20px;
      padding: 24px;
    }
  }

  &__button {
    min-width: 168px !important;

    &:not(:last-child) {
      margin-right: 10px;
    }

    @include phone {
      width: 50%;
      flex-grow: 1;
      min-width: unset !important;
    }
  }

  &__dots {
    margin-top: auto;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  &__dot {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin: 0 5px;
    background-color: get-theme-for($button, 'primary', 'enabled');

    &--fill {
      background: var(--main-color);
    }
  }
}
</style>
