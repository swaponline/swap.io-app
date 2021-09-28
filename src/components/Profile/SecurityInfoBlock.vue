<template>
  <match-media v-slot="{ desktop }" wrapper-tag="div">
    <substrate :hide-close-button="desktop" class="security-info-block">
      <div class="security-info-block__wrapper">
        <header class="security-info-block__header">
          <slot name="header"></slot>
        </header>
        <div class="security-info-block__content">
          <slot></slot>
        </div>
      </div>
      <footer class="security-info-block__footer">
        <slot name="footer"></slot>
      </footer>
    </substrate>
  </match-media>
</template>

<script>
import { MatchMedia } from 'vue-component-media-queries'
import Substrate from './Substrate.vue'

export default {
  name: 'SecurityInfoBlock',
  components: {
    MatchMedia,
    Substrate
  }
}
</script>

<style lang="scss">
.security-info-block {
  overflow: hidden;
  padding: 28px 24px 30px 24px;
  border-radius: 12px;
  max-width: 341px;
  z-index: 99;
  display: block;
  height: auto;
  margin: 0;

  &::after {
    content: '';
    width: 100%;
    height: 238px;
    position: absolute;
    background-position: bottom;
    background-size: cover;
    top: 0;
    left: 0;
    z-index: -1;

    .theme--light & {
      background-image: url(/securityInfoImages/bg_securityInfo.svg);
    }

    .theme--dark & {
      background-image: url(/securityInfoImages/bg_securityInfoDark.svg);
    }

    @include tablet {
      height: 462px;
    }

    @include phone {
      height: 236px;
    }
  }

  .substrate__button-cancel {
    display: block;
  }

  @include tablet {
    display: flex;
    max-width: 100%;
    width: 100%;
    height: 100%;
    flex-direction: column;
  }

  &__header {
    margin-bottom: 108px;
    text-align: center;

    @include tablet {
      margin-bottom: 0;
    }
  }

  &__wrapper {
    @include tablet {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
    }
  }

  &__content {
    @include tablet {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
}
</style>
