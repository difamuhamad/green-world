<template>
  <div class="w-full h-full">
    <div v-if="title" class="mb-4">
      <h3 class="text-lg font-medium">{{ title }}</h3>
    </div>
    <div ref="chartContainer" class="w-full h-full min-h-[300px]">
      <div v-if="isLoading" class="flex items-center justify-center h-full">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
        ></div>
      </div>
      <div
        v-else-if="error"
        class="flex items-center justify-center h-full text-destructive"
      >
        Error loading chart data
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';

interface ChartDataItem {
  [key: string]: string | number;
}

const props = defineProps({
  data: {
    type: Array as () => ChartDataItem[],
    required: true,
  },
  series: {
    type: Array as () => Array<{
      key: string;
      label: string;
      color: string;
    }>,
    required: true,
  },
  formatter: {
    type: Function as (value: number) => string,
    default: (value: number) => value.toString(),
  },
  title: {
    type: String,
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Error,
    default: null,
  },
});

const chartContainer = ref<HTMLElement | null>(null);
let chartInstance: ECharts | null = null;

const chartOptions = computed<EChartsOption>(() => {
  const categories = props.data.map((item) => item.month);

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: (params: any) => {
        let result = `<div class="p-2 bg-background border rounded-md shadow-sm">`;
        result += `<div class="font-medium mb-1">${params[0].axisValue}</div>`;
        params.forEach((param: any) => {
          result += `<div class="flex items-center justify-between gap-4">
            <div class="flex items-center">
              <span class="inline-block w-3 h-3 rounded-full mr-2" style="background-color: ${
                param.color
              }"></span>
              <span>${param.seriesName}</span>
            </div>
            <span class="font-medium">${props.formatter(param.value)}</span>
          </div>`;
        });
        result += `</div>`;
        return result;
      },
    },
    legend: {
      data: props.series.map((serie) => serie.label),
      bottom: 0,
      textStyle: {
        color: 'hsl(var(--foreground))',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: {
        lineStyle: {
          color: 'hsl(var(--border))',
        },
      },
      axisLabel: {
        color: 'hsl(var(--muted-foreground))',
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: 'hsl(var(--muted-foreground))',
        formatter: (value: number) => props.formatter(value),
      },
      splitLine: {
        lineStyle: {
          color: 'hsl(var(--border))',
          type: 'dashed',
        },
      },
    },
    series: props.series.map((serie) => ({
      name: serie.label,
      type: 'bar',
      barGap: 0,
      barCategoryGap: '20%',
      data: props.data.map((item) => item[serie.key]),
      itemStyle: {
        color: serie.color,
        borderRadius: [4, 4, 0, 0],
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
        },
      },
    })),
    backgroundColor: 'hsl(var(--background))',
  };
});

const initChart = () => {
  if (!chartContainer.value) return;

  // Dispose previous instance if exists
  if (chartInstance) {
    chartInstance.dispose();
  }

  chartInstance = echarts.init(chartContainer.value);
  chartInstance.setOption(chartOptions.value);

  const handleResize = () => {
    chartInstance?.resize();
  };

  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    chartInstance?.dispose();
  });
};

watch(
  chartOptions,
  () => {
    if (chartInstance) {
      chartInstance.setOption(chartOptions.value);
    }
  },
  { deep: true }
);

onMounted(() => {
  initChart();
});
</script>

<style scoped>
/* You might need to add some styles here if needed */
</style>
