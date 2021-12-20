<template>
  <swap-chart
    v-bind="{ datasets }"
    :chart-options="localChartOptions"
    :area-style-options="localAreaStyleOptions"
  ></swap-chart>
</template>

<script>
import { themeService } from '@/services/theme'

const LAYOUT_BACKGROUND = {
  darkTheme: '#0f1422',
  lightTheme: '#fff'
}

const TEXT_COLOR = {
  darkTheme: '#D0D0D0',
  lightTheme: '#0F1422'
}

const GRID_COLOR = {
  darkTheme: 'rgba(208, 208, 208, 0.2)',
  lightTheme: '#f6f6f6'
}

const COLOR_GRADIENT = {
  top: {
    darkTheme: 'rgba(97, 68, 229, 1)',
    lightTheme: 'rgba(97, 68, 229, 0)'
  },
  bottom: {
    darkTheme: 'rgba(5, 8, 15, 0.79)',
    lightTheme: 'rgba(255, 255, 255, 0.92)'
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

  computed: {
    isDarkTheme() {
      return themeService.getIsDark()
    },
    localChartOptions() {
      const defaultChartOptions = {
        height: 171,
        layout: {
          backgroundColor: this.isDarkTheme ? LAYOUT_BACKGROUND.darkTheme : LAYOUT_BACKGROUND.lightTheme,
          fontFamily: FONT_FAMILY,
          textColor: this.isDarkTheme ? TEXT_COLOR.darkTheme : TEXT_COLOR.lightTheme
        },
        localization: {
          priceFormatter(price) {
            return `$${price.toFixed(2)}`
          }
        },
        grid: {
          vertLines: {
            color: this.isDarkTheme ? GRID_COLOR.darkTheme : GRID_COLOR.lightTheme
          },
          horzLines: {
            color: this.isDarkTheme ? GRID_COLOR.darkTheme : GRID_COLOR.lightTheme
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

      return { ...defaultChartOptions, ...this.chartOptions }
    },
    localAreaStyleOptions() {
      const defaultArealStyleOptions = {
        topColor: this.isDarkTheme ? COLOR_GRADIENT.top.darkTheme : COLOR_GRADIENT.top.lightTheme,
        bottomColor: this.isDarkTheme ? COLOR_GRADIENT.bottom.darkTheme : COLOR_GRADIENT.bottom.lightTheme,
        lineColor: LINE_COLOR,
        lineWidth: 2
      }
      return { ...defaultArealStyleOptions, ...this.areaStyleOptions }
    }
  }
}
</script>
