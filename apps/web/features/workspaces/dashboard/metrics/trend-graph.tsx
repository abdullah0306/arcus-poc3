'use client'

import { Box } from '@chakra-ui/react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
)

interface TrendGraphProps {
  data: number[]
  color: string
  height?: number
}

export const TrendGraph = ({ data, color, height = 80 }: TrendGraphProps) => {
  const labels = Array.from({ length: data.length }, () => ``)

  const chartData = {
    labels,
    datasets: [
      {
        data,
        borderColor: color,
        borderWidth: 2,
        tension: 0.4,
        fill: 'start',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, height)
          gradient.addColorStop(0, `${color}20`)
          gradient.addColorStop(1, `${color}05`)
          return gradient
        },
        pointRadius: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  }

  return (
    <Box height={`${height}px`} width="100%">
      <Line data={chartData} options={options} />
    </Box>
  )
}
