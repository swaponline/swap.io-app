<template>
  <swap-chart
    v-bind="{ datasets }"
    :chart-options="localChartOptions"
    :area-style-options="localAreaStyleOptions"
  ></swap-chart>
</template>

<script>
import { themeService, events as themeServiceEvents } from '@/services/theme'
import { DARK_THEME_KEY, LIGHT_THEME_KEY } from '@/constants/theme'
import { deepMerge } from '@/utils/common'

const LAYOUT_BACKGROUND = {
  [DARK_THEME_KEY]: '#0f1422',
  [LIGHT_THEME_KEY]: '#fff'
}

const TEXT_COLOR = {
  [DARK_THEME_KEY]: '#D0D0D0',
  [LIGHT_THEME_KEY]: '#0F1422'
}

const GRID_COLOR = {
  [DARK_THEME_KEY]: 'rgba(208, 208, 208, 0.2)',
  [LIGHT_THEME_KEY]: '#f6f6f6'
}

const COLOR_GRADIENT = {
  top: {
    [DARK_THEME_KEY]: 'rgba(97, 68, 229, 1)',
    [LIGHT_THEME_KEY]: 'rgba(97, 68, 229, 0)'
  },
  bottom: {
    [DARK_THEME_KEY]: 'rgba(5, 8, 15, 0.79)',
    [LIGHT_THEME_KEY]: 'rgba(255, 255, 255, 0.92)'
  }
}

const LINE_COLOR = '#6144E5'

const FONT_FAMILY = 'Nunito'

export default {
  name: 'WalletChart',
  props: {
    chartOptions: {
      type: Object,
      default: () => ({})
    },
    areaStyleOptions: {
      type: Object,
      default: () => ({})
    },
    datasets: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentTheme: themeService.getCurrentTheme(),
      subscriptions: []
    }
  },
  computed: {
    localChartOptions() {
      const { currentTheme } = this
      const defaultChartOptions = {
        height: 171,
        layout: {
          backgroundColor: LAYOUT_BACKGROUND[currentTheme],
          fontFamily: FONT_FAMILY,
          textColor: TEXT_COLOR[currentTheme]
        },
        localization: {
          priceFormatter(price) {
            return `$${price.toFixed(2)}`
          }
        },
        grid: {
          vertLines: {
            color: GRID_COLOR[currentTheme]
          },
          horzLines: {
            color: GRID_COLOR[currentTheme]
          }
        },
        rightPriceScale: {
          visible: false
        },
        leftPriceScale: {
          visible: true,
          borderVisible: false
        },
        timeScale: {
          timeVisible: true,
          borderVisible: false
        }
      }

      return { ...deepMerge(defaultChartOptions, this.chartOptions) }
    },
    localAreaStyleOptions() {
      const { currentTheme } = this

      const defaultArealStyleOptions = {
        topColor: COLOR_GRADIENT.top[currentTheme],
        bottomColor: COLOR_GRADIENT.bottom[currentTheme],
        lineColor: LINE_COLOR,
        lineWidth: 2
      }
      return { ...deepMerge(defaultArealStyleOptions, this.areaStyleOptions) }
    }
  },
  created() {
    this.subscribeToUpdates()
  },
  beforeDestroy() {
    this.subscriptions.forEach(callback => callback.unsubscribe())
  },
  methods: {
    subscribeToUpdates() {
      this.subscriptions.push(
        themeService.subscribe(themeServiceEvents.UPDATE_CURRENT_THEME, theme => {
          this.currentTheme = theme
        })
      )
    }
  }
}
</script>
