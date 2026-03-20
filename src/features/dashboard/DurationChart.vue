<script setup>
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

// import { useDarkMode } from '../../context/useDarkMode'
import AppHeading from '@/components/AppHeading.vue'
import { prepareData, startDataDark, startDataLight } from '@/utils/chartUtils'
import { useDarkMode } from '@/composable/useDarkMode'

// Register ECharts modules
use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

const props = defineProps({
  confirmedStays: { type: Array, required: true },
})

const { isDarkMode } = useDarkMode()

// Define the chart options reactively
const option = computed(() => {
  const startData = isDarkMode.value ? startDataDark : startDataLight
  const data = prepareData(startData, props.confirmedStays)

  return {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      right: '10%',
      top: 'center',
      itemWidth: 15,
      itemGap: 10,
      textStyle: {
        color: isDarkMode.value ? '#e5e7eb' : '#374151', // var(--color-grey-600)
      },
    },
    series: [
      {
        name: 'Stay Duration',
        type: 'pie',
        radius: ['55%', '75%'], // Inner and Outer radius
        center: ['35%', '50%'], // Position of the chart
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 3,
          borderColor: isDarkMode.value ? '#18212f' : '#fff',
          borderWidth: 2,
        },
        label: { show: false },
        // Use the colors and values from your utility function
        data: data.map((entry) => ({
          value: entry.value,
          name: entry.duration,
          itemStyle: { color: entry.color },
        })),
      },
    ],
  }
})
</script>

<template>
  <div class="chart-box">
    <AppHeading as="h2">Stay duration summary</AppHeading>
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<style scoped>
.chart-box {
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;
  height: 300px; /* Ensure container has height */
  display: flex;
  flex-direction: column;
}

.chart {
  flex: 1;
  width: 100%;
  min-height: 240px;
}
</style>
