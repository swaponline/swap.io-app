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
    <form-text-field
      :value="value"
      hide-details
      single-line
      :max="max"
      :min="min"
      :step="step"
      type="number"
      class="slider-fee__field"
      @input="$emit('input', $event)"
    ></form-text-field>
  </div>
</template>

<script>
import FormTextField from '../UI/Forms/TextField.vue'

export default {
  name: 'SliderFee',
  components: {
    FormTextField
  },
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    recommendedFee: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 0.001
    }
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
  display: flex;
  flex-grow: 1;
  align-items: center;
  &__slider {
    margin: 0 20px;
    position: relative;
    align-items: center;
    .v-slider {
      margin: 0 0;
    }
    .v-slider__track-container {
      background: $--grey;
      div {
        display: none;
      }
    }
    .v-slider__thumb {
      width: 14px;
      height: 14px;
      background: $--black !important;
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
    background: $--purple;
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
}
</style>
