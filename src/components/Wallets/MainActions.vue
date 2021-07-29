<template>
  <match-media v-slot="{ desktop }" class="main-actions" tag="div">
    <v-fade-transition>
      <div v-if="isDragging" class="main-actions__background">
        <p class="main-actions__text">You can move the menu button to any of the available locations</p>
      </div>
    </v-fade-transition>

    <div class="main-actions__layout">
      <template v-if="desktop">
        <div
          v-for="(spot, index) in $options.SPOTS"
          :key="index"
          ref="spot"
          class="main-actions__spot"
          :class="{ 'main-actions__spot--hidden': !isDragging }"
          :style="spot"
        >
          <swap-icon-menu-spot class="main-actions__spot-icon" />
        </div>
      </template>

      <main-actions-button
        ref="menuButton"
        class="main-actions__button"
        :class="{ 'main-actions__button--dragging': isDragging }"
        :direction="desktop ? openDirection : 'top'"
        :draggable="desktop"
        @dragstart="dragStart"
        @mousedown="start"
        @mouseup="end"
        @click="click"
      />
    </div>
  </match-media>
</template>

<script>
import SwapIconMenuSpot from '@/components/UI/Icons/MenuSpot.vue'
import MainActionsButton from '@/components/Wallets/MainActionsButton.vue'
import { MatchMedia } from 'vue-component-media-queries'
import { getCoords, getCenter, getDistance } from '@/utils/common'
import { getStorage, setStorage } from '@/utils/storage'

const CURRENT_SPOT_KEY = 'buttonSpot'
const SPOT_ACTIVATION_DISTANCE = 300
const DRAGSTART_TIMEOUT_MS = 200

const spots = [
  { left: '8px', bottom: '52%' },
  { left: '8px', bottom: '10px' },
  { left: '22%', bottom: '10px' },
  { left: '78%', bottom: '10px' },
  { left: 'calc(100% - 86px)', bottom: '10px' },
  { left: 'calc(100% - 86px)', bottom: '52%' }
]

export default {
  name: 'MainActions',
  components: { SwapIconMenuSpot, MainActionsButton, MatchMedia },
  SPOTS: spots,
  inject: ['mediaQueries'],
  data() {
    return {
      isDragging: false,
      isMoved: false,
      currentSpot: null,
      offset: {},
      activeSpot: null,
      clickDebounce: null,
      isMenuOpen: false,
      openDirection: 'top'
    }
  },
  watch: {
    'mediaQueries.desktop': {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            this.setButtonPosition(this.currentSpot)
          })
        } else {
          // reset button position
          const button = this.$refs.menuButton.$el
          button.style = ``
        }
      }
    }
  },
  mounted() {
    this.currentSpot = getStorage(CURRENT_SPOT_KEY)
    if (this.currentSpot === null) this.currentSpot = 1
    window.addEventListener('resize', this.handleResize)
    this.setButtonPosition(this.currentSpot)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    dragStart(e) {
      if (this.mediaQueries.desktop) {
        this.isMoved = true
        e.preventDefault()
      }
      return false
    },
    handleResize() {
      this.setButtonPosition(this.currentSpot)
    },
    start(e) {
      if (this.mediaQueries.desktop) {
        this.clickDebounce = setTimeout(() => {
          const button = this.$refs.menuButton.$el

          const coords = getCoords(button)
          this.offset = { x: e.pageX - coords.left, y: e.pageY - coords.top }
          this.move(e)

          this.isDragging = true
          document.onmousemove = this.move
        }, DRAGSTART_TIMEOUT_MS)
      }
    },
    move(e) {
      const button = this.$refs.menuButton.$el
      button.style = `left: ${e.pageX - this.offset.x}px; top: ${e.pageY - this.offset.y}px;`

      const mousePosition = { x: e.pageX, y: e.pageY }
      if (this.$refs.spot) {
        const spotDistances = this.$refs.spot.map((el, index) => {
          const coords = getCenter(el)
          return { el, index, distance: getDistance(mousePosition, { x: coords.left, y: coords.top }) }
        })

        spotDistances.sort((a, b) => a.distance - b.distance)

        const [nearestSpot] = spotDistances

        if (nearestSpot && nearestSpot.distance < SPOT_ACTIVATION_DISTANCE) {
          if (nearestSpot.el !== this.activeSpot?.el) {
            if (this.activeSpot) {
              this.activeSpot.el.classList.remove('active')
            }
            this.activeSpot = nearestSpot
            this.activeSpot.el.classList.add('active')
          }
        } else if (this.activeSpot) {
          this.activeSpot.el.classList.remove('active')
          this.activeSpot = null
        }
      }
    },
    click(e) {
      if (this.isMoved) {
        e.stopPropagation()
        this.isMoved = false
      }
    },
    end() {
      clearTimeout(this.clickDebounce)
      this.clickDebounce = null

      if (this.isDragging) {
        if (this.activeSpot) {
          this.currentSpot = this.activeSpot.index
        }
        this.setButtonPosition(this.currentSpot)

        this.isDragging = false
        this.activeSpot = null
        document.onmousemove = null
      }
    },
    setButtonPosition(spotIndex) {
      const button = this.$refs.menuButton.$el

      if (this.mediaQueries.desktop) {
        const coords = getCoords(this.$refs.spot[spotIndex])
        button.style = `left: ${coords.left}px; top: ${coords.top}px;`

        this.openDirection = 'top'
        if (this.currentSpot === 0) this.openDirection = 'right'
        if (this.currentSpot === 5) this.openDirection = 'left'

        setStorage(CURRENT_SPOT_KEY, spotIndex)
      } else {
        button.style = ``
      }
    }
  }
}
</script>

<style lang="scss">
.main-actions {
  $this: &;

  &__background {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 170;
    background-color: rgba($--black, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  &__text {
    max-width: 620px;
    font-size: $--font-size-extra-title;
    line-height: 49px;
    font-weight: $--font-weight-bold;
    color: $--white;
  }

  &__layout {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 171;
    pointer-events: none;

    &--active {
      pointer-events: all;
    }
  }

  &__spot {
    position: absolute;
    width: 78px;
    height: 78px;
    transition: all 0.3s;
    border-radius: 50%;

    &--hidden {
      opacity: 0;
    }

    &.active {
      #{$this}__spot-icon {
        animation: active-rotation 2s linear infinite;
        background-color: rgba($--white, 0.4);
        box-shadow: 0 0 20px rgba($--white, 0.6);
      }
    }
  }
  &__spot-icon {
    border-radius: 50%;
    animation: default-rotation 2.5s ease-in-out infinite alternate;
    transition: all 0.3s;
    transform-origin: center;
  }

  &__button {
    pointer-events: all;
    transition: all 0.3s;
    position: fixed;

    &--dragging {
      transition: none;
    }
  }

  @keyframes default-rotation {
    0% {
      transform: rotate(-45deg);
    }
    100% {
      transform: rotate(45deg);
    }
  }
  @keyframes active-rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
