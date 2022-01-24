<template>
  <div class="swap-chart">
    <div ref="swapChart" class="swap-chart__container"></div>
    <h3 v-if="!datasets.length" class="swap-chart__no-data">insufficient data</h3>
  </div>
</template>

<script>
import { isBusinessDay, createChart } from 'lightweight-charts'
import { format } from 'date-fns'

const WIDTH_PRICE_BAR = 54
const tooltipsConfiguration = [
  {
    name: 'time',
    positionName: 'left',
    tooltipWidth: 93,
    //  TODO: Подключить сторонее апи с курсом криптовалют и добавить обработку времени
    formatDate({ day, month, year }) {
      return format(new Date(year, month, day), 'dd MMM. yy')
    },
    getData(param, { widthChartContainer }) {
      const dateStr = isBusinessDay(param.time)
        ? this.formatDate(param.time)
        : new Date(param.time * 1000).toLocaleDateString()

      let left = param.point.x - this.tooltipWidth / 2
      left = Math.max(0, Math.min(widthChartContainer - this.tooltipWidth, left))

      return {
        text: `${dateStr}`,
        position: `${left + WIDTH_PRICE_BAR}px`
      }
    }
  },
  {
    name: 'price',
    positionName: 'top',
    tooltipHeight: 16,
    getData(param, { areaSeries }) {
      const price = param.seriesPrices.get(areaSeries)
      const coordinate = Math.round(areaSeries.priceToCoordinate(price))

      return {
        text: `$${price}`,
        position: `${coordinate - this.tooltipHeight / 2}px`
      }
    }
  }
]
export default {
  name: 'SwapChart',
  props: {
    chartOptions: {
      type: Object,
      default: () => ({})
    },
    datasets: {
      type: Array,
      default: () => []
    },
    areaStyleOptions: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      chart: null,
      areaSeries: null,
      bindedMoveTooltip: null
    }
  },
  watch: {
    datasets(newDataSets) {
      this.updateDataSets(newDataSets)
    },
    chartOptions(newOptions) {
      this.updateChartOptions(newOptions)
    },
    areaStyleOptions(newStyleOptions) {
      this.updateAreaStyleOptions(newStyleOptions)
    }
  },
  mounted() {
    this.chart = createChart(this.$refs.swapChart, this.chartOptions)
    this.areaSeries = this.chart.addAreaSeries(this.areaStyleOptions)
    this.areaSeries.setData(this.datasets)

    this.createTooltips()
  },
  destroyed() {
    this.chart.unsubscribeCrosshairMove(this.bindedMoveTooltip)
  },
  methods: {
    createTooltips() {
      tooltipsConfiguration.forEach(tooltipConf => {
        const tooltipNode = document.createElement('div')
        tooltipNode.className = `swap-chart__tooltip swap-chart__tooltip--${tooltipConf.name}`
        this.$refs.swapChart.appendChild(tooltipNode)
        this.bindedMoveTooltip = this.movementOfTooltip.bind(this, { tooltipNode, tooltipConf })
        this.chart.subscribeCrosshairMove(this.bindedMoveTooltip)
      })
    },
    movementOfTooltip(options, param) {
      const { tooltipNode, tooltipConf } = options
      const widthChartContainer = this.$refs.swapChart.clientWidth
      const heightChartContainer = this.$refs.swapChart.clientHeight
      // We check to what limits it is necessary to draw the tooltip
      if (
        !param.time ||
        param.point.x < 0 ||
        param.point.y > widthChartContainer ||
        param.point.y < 0 ||
        param.point.y > heightChartContainer
      ) {
        tooltipNode.style.display = 'none'
        return
      }

      const tooltipData = tooltipConf.getData(param, {
        widthChartContainer,
        areaSeries: this.areaSeries
      })

      tooltipNode.style.display = 'block'
      tooltipNode.innerHTML = tooltipData.text
      tooltipNode.style[tooltipConf.positionName] = tooltipData.position
    },
    updateChartOptions(newOptions) {
      this.chart.applyOptions(newOptions)
    },
    updateAreaStyleOptions(newStyleOptions) {
      this.areaSeries.applyOptions(newStyleOptions)
    },
    updateDataSets(newDataSets) {
      this.updateChartOptions(this.chartOptions)
      this.updateAreaStyleOptions(this.areaStyleOptions)
      this.areaSeries.setData(newDataSets)
    }
  }
}
</script>

<style lang="scss">
.swap-chart {
  position: relative;
  &__no-data {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5em;
    color: get-theme-for($text, 'primary');
    font-weight: $--font-weight-medium;
    text-align: center;
    z-index: 1;
  }

  &__tooltip {
    position: absolute;
    display: none;
    font-family: $--font-base;
    font-weight: $--font-weight-semi-bold;
    padding: 2px 4px;
    font-size: 9px;
    line-height: 12px;
    border-radius: 22px;
    text-align: center;
    z-index: 1000;
    bottom: 10px;
    pointer-events: none;

    .theme--light & {
      background-color: $--black;
      color: $--white;
    }

    .theme--dark & {
      background-color: $--white;
      color: $--black;
    }

    &--time {
      width: 93px;
    }

    &--price {
      width: 48px;
      height: 16px;
    }
  }
}
</style>
