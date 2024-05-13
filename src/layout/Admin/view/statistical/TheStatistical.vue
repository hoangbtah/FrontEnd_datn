<template>
  <div class="statistical">
  <p>Biểu đồ thống kê doanh thu </p>
  <div >
    <Bar class="bieudo"
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
import { Bar } from "vue-chartjs/legacy";
import { mapGetters } from "vuex";
import axios from "axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart"
    },
    datasetIdKey: {
      type: String,
      default: "label"
    },
    width: {
      type: Number,
      default: 800
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
      "monthSelected",
      "startDateSatis",
      "endDateSatis"
    ])
  },
  data() {
    return {
      chartData: {
        labels: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12"
        ],
        datasets: [
          {
            label: "Doanh số",
            // backgroundColor: "#f87979",
            backgroundColor: "#609ee0",
            //data: [0,0,0,0,0,0,0,0,0,0,0,0]
            data: Array(12).fill(0) // Khởi tạo mảng 12 phần tử ban đầu là 0
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      responeData: [],
    };
  },
  methods: {
    async fetchMonthlySalesData(year) {
      try {
        const response = await axios.get(
          `https://localhost:7159/api/v1/Product/getProductSaleByYear/${year}`
        );
        const monthlySalesData = response.data;
        console.log(monthlySalesData);
        this.responeData = response.data;
        console.log("dữ liệu trả về ");
        console.log(response.data);
        console.log("dữ liệu gán");
        console.log(this.responeData);
       

          // Ánh xạ dữ liệu vào mảng tháng
          const newData = Array(12).fill(0); // Khởi tạo mảng mới

          monthlySalesData.forEach(item => {
            if (item.Month >= 1 && item.Month <= 12) {
              newData[item.Month - 1] = item.SalesAmount;
            }
          });

          // Cập nhật dữ liệu biểu đồ
          this.chartData.datasets[0].data = newData;
          this.chartData.labels = [ "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12"]
          this.$refs.chart.update(); // Update the chart
      } catch (error) {
        console.error("Error fetching monthly sales data:", error);
      }
    },
    async fetchDataByStartAndEnd(start, end) {
      try {
        const response = await axios.get(
          `https://localhost:7159/api/v1/Product/getProductSaleByStartAndEnd/${start}/${end}`
        );
        this.responseData = response.data;
        this.updateChart();
        // this.forMode = "daily"; // Chuyển chế độ sang thống kê theo tháng
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    updateChart() {
      this.chartData.labels = this.responseData.map(item => this.formatDate(item.date));
      this.chartData.datasets[0].data = this.responseData.map(
        item => item.salesAmount
      );
      this.$refs.chart.update(); // Update the chart
    },
    formatDate(datetimeString) {
      // Kiểm tra xem chuỗi đầu vào có hợp lệ không
      if (!datetimeString) return ""; // hoặc bạn có thể trả về một giá trị mặc định

      // Cắt chuỗi từ datetime thành date (lấy 10 ký tự đầu tiên)
      return datetimeString.slice(0, 10);
    }
  },
  created() {
    const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
    //const currentYear=2025;
    this.fetchMonthlySalesData(currentYear);
    console.log("data hiện tại");
    console.log(this.chartData.datasets);
  },
//   mounted() {
//   this.chartRendered = true; // Đánh dấu rằng biểu đồ đã được render xong
// },
  watch: {
    yearSelected() {
      console.log("lấy dữ liệu khi truyền vào năm mới");
      console.log("năm được chọn", this.yearSelected);
      this.fetchMonthlySalesData(this.yearSelected);
    },
    startDateSatis() {
      this.fetchDataByStartAndEnd(this.startDateSatis, this.endDateSatis);
    },
    endDateSatis() {
      this.fetchDataByStartAndEnd(this.startDateSatis, this.endDateSatis);
    }
  }
};
</script>

<style scoped>
.statistical {
  width: 650px;
  height: 450px;
}
.bieudo {
  height: 400px;
  width: 550px;
}
</style>

