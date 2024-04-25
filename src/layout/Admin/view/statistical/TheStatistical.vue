<template>
  <div class="statistical">
  <p>Biểu đồ thống kê doanh thu trong 12 tháng</p>
  <div v-if="responeData.length!==0">
    <Bar class="bieudo"
    refs="chart"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    @click="handleBarClick()"
  />
  </div>
  <div v-if="responeData.length===0">
    <p>Không có dữ liệu !</p>
  </div>
 
  <!-- <router-link to="/statisticaldetail">
    View Detail
  </router-link> -->
  </div>
</template>

<script>
import { Bar } from "vue-chartjs/legacy";
//import { Bar } from "vue-chartjs";
//import 'chartjs-plugin-datalabels';

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
  data() {
    return {
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Doanh số",
            backgroundColor: "#f87979",
            //data: [0,0,0,0,0,0,0,0,0,0,0,0]
            data: Array(12).fill(0) // Khởi tạo mảng 12 phần tử ban đầu là 0
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

        // // Cập nhật dữ liệu biểu đồ
        // this.chartData.datasets[0].data = monthlySalesData.map(
        //   item => item.Quantity
        //   // console.log()
        // );

        // Ánh xạ dữ liệu vào mảng tháng
        const newData = Array(12).fill(0); // Khởi tạo mảng mới

        monthlySalesData.forEach(item => {
          if (item.Month >= 1 && item.Month <= 12) {
            newData[item.Month - 1] = item.SalesAmount;
          }
        });

        // Cập nhật dữ liệu biểu đồ
        this.chartData.datasets[0].data = newData;

        //  // Ánh xạ dữ liệu vào mảng tháng
        //  monthlySalesData.forEach(item => {
        //   if (item.Month >= 1 && item.Month <= 12) {
        //     this.chartData.datasets[0].data[item.Month - 1] = item.Quantity;
        //   }
        // });
        // Cập nhật biểu đồ
        //  this.$refs.chart.update();  
        // Gọi $nextTick để đợi Vue cập nhật
        this.$nextTick(() => {
          // Gọi update() trên biểu đồ để áp dụng các thay đổi
          if (this.$refs.chart && this.$refs.chart.update) {
            this.$refs.chart.update();

          }
        });
      } catch (error) {
        console.error("Error fetching monthly sales data:", error);
      }
    },

    handleBarClick(event, chartElements) {
      console.log("điều hương");
      console.log(chartElements);
      console.log("handleBarClick is triggered");
      console.log("event:", event);
      console.log("chartElements:", chartElements);
      if (chartElements && chartElements.length > 0) {
        const monthIndex = chartElements[0].index;
        const monthName = this.chartData.labels[monthIndex];
        const path = `/statisticaldetail/${monthName.toLowerCase()}`;
        this.$router.push(path);
      }
    }
  },
  created() {
    // console.log("data cũ")
    // console.log( this.chartData.datasets);

    const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
    //const currentYear=2025;
    this.fetchMonthlySalesData(currentYear);
    console.log("data hiện tại");
    console.log(this.chartData.datasets);
  }
};
</script>

<style scoped>
.statistical {
  width: 800px;
  height: 800px;
}
.bieudo {
  height: 400px;
  width: 800px;
}
</style>

