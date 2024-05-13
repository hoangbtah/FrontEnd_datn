<template>
<div class="statistical-manu">
  <p>Biểu đồ thống kê doanh thu theo hãng</p>
  <div >
    <Pie class="bieudotron"
    refs="chart"
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"   
    />
    </div>
    <!-- <div v-if="responeData.length===0">
    <p>Không có dữ liệu !</p>
  </div> -->
   
</div>
</template>
  
  <script>
import { Pie } from "vue-chartjs/legacy";
import axios from "axios";
import {mapGetters} from "vuex";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "PieChart",
  components: {
    Pie
  },
  props: {
    chartId: {
      type: String,
      default: "pie-chart"
    },
    datasetIdKey: {
      type: String,
      default: "label"
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    cssClasses: {
      default: "",
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      // type: Array,
      // default: () => []
      type: Object, // Thay đổi từ Array thành Object
      default: () => ({}) // Giá trị mặc định là một đối tượng trống
    }
  },
  computed: {
    ...mapGetters([
      "yearSelected",
      "monthSelected","startDateSatis","endDateSatis"
    ])},
  data() {
    return {
      chartData: {
        labels: ["hoang", "viet"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#c6d917", "#DD1B16","#539bcf","#f59732","#3bd673","#552ecb"],
            data: [50, 50]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      responeData: []
    };
  },
  watch:{
    monthSelected(){
      console.log("lấy dữ liệu khi truyền vào tháng mới");
      console.log("tháng được chọn",this.monthSelected);
    this.fetchMonthlySalesData(this.monthSelected,this.yearSelected);
    },
    yearSelected(){
      console.log("lấy dữ liệu khi truyền vào tháng mới");
      console.log("tháng được chọn",this.monthSelected);
    this.fetchMonthlySalesData(this.monthSelected,this.yearSelected);
    },
    startDateSatis() {
      this.fetchDataByStartAndEndPie(this.startDateSatis, this.endDateSatis);
    },
    endDateSatis() {
      this.fetchDataByStartAndEndPie(this.startDateSatis, this.endDateSatis);
    }
  },
  methods: {
    // lấy thống kê theo tháng và năm , mặc đinh ban đầu là tháng và năm hiện tại
    async fetchMonthlySalesData(month, year) {
      try {
        const response = await axios.get(
          `https://localhost:7159/api/v1/Product/getProductSaleByMonthAndYear/${month}/${year}`
        );
        const monthlySalesData = response.data;
        this.responeData = response.data;

        console.log("data detail");
        console.log(monthlySalesData);

        // Tạo mảng tên hãng và mảng số lượng bán được
        const labels = monthlySalesData.map(item => item.Hang);
        const quantities = monthlySalesData.map(item => item.SalesAmount);

        // Cập nhật labels và data trong chartData
        this.chartData.labels = labels;
        this.chartData.datasets[0].data = quantities;

        // Sau khi cập nhật dữ liệu, gọi update để vẽ lại biểu đồ
        if (this.$refs.chart && this.$refs.chart.update) {
          this.$refs.chart.update();
        }
      } catch (error) {
        console.error("Error fetching monthly sales data:", error);
      }
    },
    // lấy thống kê theo một khoảng thời gian nhập vào
    async fetchDataByStartAndEndPie(start, end) {
      console.log("chuỗi ngày tháng",start,end);
      try {
        const response = await axios.get(
          `https://localhost:7159/api/v1/Product/getProductSaleByStartAndEndPie/${start}/${end}`
        );
        this.responeData = response.data;
        this.updateChart();
        // this.forMode = "daily"; // Chuyển chế độ sang thống kê theo tháng
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    updateChart() {
      this.chartData.labels = this.responeData.map(item => item.Hang);
      this.chartData.datasets[0].data = this.responeData.map(
        item => item.SalesAmount
      );
      this.$refs.chart.update(); // Update the chart
    },
  },
  created() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Lấy tháng hiện tại (1-12)

    this.fetchMonthlySalesData(currentMonth, currentYear);
  }
};
</script>
<style scoped>
.p {
  background: #539bcf;
}
.bieudotron{
  width:300px;
  height:300px;
}
.statistical-manu{
  width:450px;
  height:450px;
}
</style>

  