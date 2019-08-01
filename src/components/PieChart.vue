<script>
import { Pie, mixins } from 'vue-chartjs'

export default {
  extends: Pie,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: Object
  },
  data () {
    return {
      options: {
        legend: {
          display: false
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
