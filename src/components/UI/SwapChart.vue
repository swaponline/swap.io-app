<template>
  <div class="swap-chart">
    <div ref="swapChart" class="swap-chart__container"></div>
  </div>
</template>

<script>
import { createChart } from 'lightweight-charts'

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
      areaSeries: null
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
  },
  methods: {
    updateChartOptions(newOptions) {
      this.chart.applyOptions(newOptions)
    },
    updateAreaStyleOptions(newStyleOptions) {
      this.areaSeries.applyOptions(newStyleOptions)
    },
    updateDataSets(newDataSets) {
      this.areaSeries.update(newDataSets)
    }
  }
}
</script>
