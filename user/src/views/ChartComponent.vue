<template>
  <Line :chart-data="chartData"/>
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js'
import {socket} from "@/socket";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
)

export default {
  name: 'LineChart',
  components: { Line },
  props: {
    stock: String
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: this.stock,
            data: [],
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)'
          },
        ]
      }
    }
  },
  created() {
    socket.on('tradeStarted', message => {
      for (const pair of message) {
        if (pair.stock === this.stock){
          const cost = parseFloat(pair.cost.split('$')[1]);
          this.chartData.labels.push(pair.date);
          this.chartData.datasets[0].data.push(cost);
        }
      }
    });
  },
}
</script>
