<script setup>
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns'

import AppHeading from '@/components/AppHeading.vue'
import { useDarkMode } from '@/composable/useDarkMode'

// Register necessary ECharts components
use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, TitleComponent])

const props = defineProps({
  bookings: { type: Array, required: true },
  numDays: { type: Number, required: true },
})

const { isDarkMode } = useDarkMode()

// 1. Calculate the interval dates
const allDates = computed(() =>
  eachDayOfInterval({
    start: subDays(new Date(), props.numDays - 1),
    end: new Date(),
  }),
)

const startDateLabel = computed(() => format(allDates.value[0], 'MMM dd yyyy'))
const endDateLabel = computed(() => format(allDates.value.at(-1), 'MMM dd yyyy'))

// 2. Prepare the chart data
const chartData = computed(() => {
  return allDates.value.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: props.bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: props.bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    }
  })
})

// 3. Define the ECharts option
const option = computed(() => {
  const colors = isDarkMode.value
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        grid: '#374151',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        grid: '#e5e7eb',
      }

  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDarkMode.value ? '#18212f' : '#fff',
      textStyle: { color: colors.text },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: chartData.value.map((d) => d.label),
      axisLabel: { color: colors.text },
      axisLine: { lineStyle: { color: colors.grid } },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: colors.text,
        formatter: '${value}',
      },
      splitLine: { lineStyle: { color: colors.grid } },
    },
    series: [
      {
        name: 'Total sales',
        type: 'line',
        smooth: true, // Equivalent to "monotone" in Recharts
        data: chartData.value.map((d) => d.totalSales),
        lineStyle: { width: 2, color: colors.totalSales.stroke },
        itemStyle: { color: colors.totalSales.stroke },
        areaStyle: {
          color: colors.totalSales.fill,
          opacity: isDarkMode.value ? 0.3 : 0.6,
        },
      },
      {
        name: 'Extras sales',
        type: 'line',
        smooth: true,
        data: chartData.value.map((d) => d.extrasSales),
        lineStyle: { width: 2, color: colors.extrasSales.stroke },
        itemStyle: { color: colors.extrasSales.stroke },
        areaStyle: {
          color: colors.extrasSales.fill,
          opacity: isDarkMode.value ? 0.3 : 0.6,
        },
      },
    ],
  }
})
</script>

<template>
  <div class="sales-chart">
    <AppHeading as="h2"> Sales from {{ startDateLabel }} &mdash; {{ endDateLabel }} </AppHeading>

    <div class="chart-container">
      <v-chart class="chart" :option="option" autoresize />
    </div>
  </div>
</template>

<style scoped>
.sales-chart {
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / -1;
}

.chart-container {
  width: 100%;
  height: 300px;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
