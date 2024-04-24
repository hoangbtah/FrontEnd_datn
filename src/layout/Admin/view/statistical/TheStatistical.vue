<template>
  <div>
  <p>Biểu đồ thống kê số lượng sản phẩm bán được trong 12 tháng</p>
  <Bar
    refs="chart"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
  <router-link to="/statisticaldetail">
    View Detail
  </router-link>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs/legacy";
import axios from "axios";
//import StatisticalDetail from './StatisticalDetail.vue'
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
            label: "Data One",
            backgroundColor: "#f87979",
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
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

        // Cập nhật dữ liệu biểu đồ
        this.chartData.datasets[0].data = monthlySalesData.map(
          item => item.Quantity
          // console.log()
        );
       // console.log("log data");
       // console.log(this.$refs.chart);
        // console.log("kiểm tra")
        // console.log(this.$refs.chart instanceof Bar);
        // console.log("tên")
        // console.log(this.$refs.chart.$el.tagName);

        // Gọi $nextTick để đợi Vue cập nhật
        this.$nextTick(() => {
          // Gọi update() trên biểu đồ để áp dụng các thay đổi
          if (this.$refs.chart && this.$refs.chart.update) {
            this.$refs.chart.update();
        //     console.log("log data");
        // console.log(this.$refs.chart);
        // console.log("kiểm tra")
        // console.log(this.$refs.chart instanceof Bar);
        // console.log("tên")
        // console.log(this.$refs.chart.$el.tagName);
          }
        });
    
      } catch (error) {
        console.error("Error fetching monthly sales data:", error);
      }
    }
  },
  mounted () {
    // console.log("data cũ")
    // console.log( this.chartData.datasets);

    const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
    this.fetchMonthlySalesData(currentYear);
    console.log("data hiện tại");
    console.log(this.chartData.datasets);
    //       this.$refs.chart.update();
  }
};
</script>
