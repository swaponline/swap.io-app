<template>
  <div class="slider-fee">
    <v-slider
      ref="slider"
      :value="value"
      class="slider-fee__slider"
      :max="max"
      :min="min"
      :step="step"
      hide-details
      track-color="grey"
      @input="$emit('input', $event)"
    >
      <template v-slot:prepend>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <span
              v-show="value !== recommendedFee"
              ref="recommendedFee"
              class="slider-fee__recommended-fee"
              v-on="on"
              @click="$emit('input', recommendedFee)"
            ></span>
          </template>
          <span>Recommended fee</span>
        </v-tooltip>
      </template>
    </v-slider>

    <div class="slider-fee__labels">
      <span>Min</span>
      <span>Recomended fee</span>
      <span>Max</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SliderFee',
  props: {
    value: { type: [Number, String], default: 0 },
    recommendedFee: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    min: { type: Number, default: 0 },
    step: { type: Number, default: 0.001 }
  },
  async mounted() {
    // нормализуем работу слайдера на oversize экранах
    const wrapParseMouseMove = this.$refs.slider.parseMouseMove
    this.$refs.slider.parseMouseMove = e => {
      let { clientX } = e
      if (clientX === undefined) {
        return wrapParseMouseMove(e)
      }
      if (window.innerWidth > 1920) {
        clientX = e.clientX / ((window.innerWidth * 0.01) / 18)
      }
      return wrapParseMouseMove({ ...e, clientX })
    }
    // Поставим точку с рекомендуемой комиссией на плашку
    const model = this.value
    this.$emit('input', this.recommendedFee)
    await this.$nextTick()
    if (this.$refs.slider && this.$refs.recommendedFee) {
      const sliderPoint = this.$refs.slider.$el.getElementsByClassName('v-slider__thumb-container')[0]
      this.$refs.recommendedFee.style.left = sliderPoint.style.left
    }
    this.$emit('input', model)
  }
}
</script>

<style lang="scss">
.slider-fee {
  &__slider {
    position: relative;
    align-items: center;
    .v-slider {
      margin: 0 0;
    }
    .v-slider__track-container {
      .v-slider__track-fill {
        background: var(--main-color) !important;
        height: 4px;
      }
    }
    .v-slider__track-background {
      background-color: $--light-grey-4 !important;
      height: 4px;
    }
    .v-slider__thumb {
      width: 16px;
      height: 16px;
      background: $--white !important;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.18), 0px 0px 13px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transform-origin: center;

      &:hover {
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25), 0px 0px 13px rgba(0, 0, 0, 0.2);
      }
      &::before {
        display: none;
      }
    }
    .v-input__prepend-outer {
      position: absolute;
      width: 100%;
      left: -4px;
      top: 7px;
    }
  }
  &__recommended-fee {
    position: absolute;
    z-index: 99;
    left: 0;
    top: 0;
    height: 10px;
    width: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid var(--main-color);
    background: $--white;
  }
  &__field {
    margin: 0 0;
    min-height: 40px;
    width: 100px;
    max-width: 100px;
    .v-input {
      margin-top: 0;
      &:focus-within {
        margin-top: 0;
      }
    }
  }
  &__labels {
    margin-top: -6px;
    margin-bottom: 6px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: $--font-size-small;

    @include phone {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
}
</style>
