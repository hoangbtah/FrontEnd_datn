<template>
    <div>
      <!-- Your existing template code -->
  
      <div class="container-fluid pt-5" v-if="carts.length !== 0">
        <div class="row px-xl-5">
          <div class="col-lg-8 table-responsive mb-5">
            <table class="table table-bordered text-center mb-0">
              <thead class="bg-secondary text-dark">
                <!-- Table header -->
              </thead>
              <tbody class="align-middle">
                <tr v-for="cart in carts" :key="cart.CartId">
                  <!-- Table row for each cart item -->
                  <td class="align-middle">{{ cart.ProductName }}</td>
                  <td class="align-middle">{{ formatCurrency(cart.Price) }} đ</td>
                  <td class="align-middle">
                    <div class="input-group quantity mx-auto" style="width: 100px;">
                      <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-minus" @click="decreaseQuantity(cart)">
                          <i class="fa fa-minus"></i>
                        </button>
                      </div>
                      <input
                        type="number"
                        class="form-control form-control-sm bg-secondary text-center"
                        v-model="tempQuantities[cart.CartId]"
                        @change="updateQuantityOnServer(cart)"
                      />
                      <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-plus" @click="increaseQuantity(cart)">
                          <i class="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <!-- Display total amount -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <!-- Your remaining template code -->
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  
  export default {
    name: "ShoppingCart",
    created() {
      this.getCarts(this.auth.user.userId);
    },
    computed: {
      ...mapGetters(["auth", "carts"]),
      // Other computed properties
    },
    data() {
      return {
        tempQuantities: {}, // Biến tạm để lưu trữ số lượng mới của từng sản phẩm trong giỏ hàng
      };
    },
    methods: {
      ...mapActions(["getCarts", "updateCart"]),
      formatCurrency(number) {
        // Chuyển số sang chuỗi và đảm bảo là kiểu number
        number = Number(number);
  
        // Kiểm tra nếu không phải là số hợp lệ
        if (isNaN(number)) {
          return "0";
        }
  
        // Sử dụng hàm toLocaleString() để định dạng tiền tệ theo định dạng của Việt Nam
        return number.toLocaleString("vi-VN");
      },
      // Giảm số lượng sản phẩm
      decreaseQuantity(cart) {
        const currentQuantity = this.tempQuantities[cart.CartId] || cart.Quantity;
        this.tempQuantities[cart.CartId] = Math.max(0, currentQuantity - 1);
      },
      // Tăng số lượng sản phẩm
      increaseQuantity(cart) {
        const currentQuantity = this.tempQuantities[cart.CartId] || cart.Quantity;
        this.tempQuantities[cart.CartId] = currentQuantity + 1;
      },
      // Cập nhật số lượng sản phẩm trên máy chủ
      async updateQuantityOnServer(cart) {
        const newQuantity = this.tempQuantities[cart.CartId];
        if (newQuantity !== undefined && newQuantity !== cart.Quantity) {
          // Kiểm tra số lượng mới có hợp lệ không
          if (newQuantity > 0 && newQuantity <= cart.StockQuantity) {
            // Gửi yêu cầu cập nhật số lượng lên server
            const updatedCart = { ...cart, Quantity: newQuantity };
            await this.updateCart(updatedCart);
          } else {
            // Hiển thị thông báo lỗi và khôi phục lại số lượng cũ trên giao diện
            alert("Số lượng không hợp lệ!");
            this.tempQuantities[cart.CartId] = cart.Quantity;
          }
        }
      },
      // Other methods
    },
  };
  </script>
  
  <style lang="">
  /* Your custom styles */
  </style>
  
  <template>
  <div>
    <!-- Your existing template code -->

    <div class="container-fluid pt-5" v-if="carts.length !== 0">
      <div class="row px-xl-5">
        <div class="col-lg-8 table-responsive mb-5">
          <table class="table table-bordered text-center mb-0">
            <thead class="bg-secondary text-dark">
              <!-- Table header -->
            </thead>
            <tbody class="align-middle">
              <tr v-for="cart in carts" :key="cart.CartId">
                <!-- Table row for each cart item -->
                <td class="align-middle">{{ cart.ProductName }}</td>
                <td class="align-middle">{{ formatCurrency(cart.Price) }} đ</td>
                <td class="align-middle">
                  <div class="input-group quantity mx-auto" style="width: 100px;">
                    <div class="input-group-btn">
                      <button class="btn btn-sm btn-primary btn-minus" @click="decreaseQuantity(cart)">
                        <i class="fa fa-minus"></i>
                      </button>
                    </div>
                    <input
                      type="number"
                      class="form-control form-control-sm bg-secondary text-center"
                      v-model="cart.Quantity"
                      @change="updateQuantityOnServer(cart)"
                    />
                    <div class="input-group-btn">
                      <button class="btn btn-sm btn-primary btn-plus" @click="increaseQuantity(cart)">
                        <i class="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </td>
                <!-- Display total amount -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Your remaining template code -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ShoppingCart",
  created() {
    this.getCarts(this.auth.user.userId);
  },
  computed: {
    ...mapGetters(["auth", "carts"]),
    // Other computed properties
  },
  methods: {
    ...mapActions(["getCarts", "updateCart"]),
    formatCurrency(number) {
      // Chuyển số sang chuỗi và đảm bảo là kiểu number
      number = Number(number);

      // Kiểm tra nếu không phải là số hợp lệ
      if (isNaN(number)) {
        return "0";
      }

      // Sử dụng hàm toLocaleString() để định dạng tiền tệ theo định dạng của Việt Nam
      return number.toLocaleString("vi-VN");
    },
    // Giảm số lượng sản phẩm
    decreaseQuantity(cart) {
      if (cart.Quantity > 1) {
        cart.Quantity--;
        this.updateQuantityOnServer(cart);
      }
    },
    // Tăng số lượng sản phẩm
    increaseQuantity(cart) {
      if (cart.Quantity < cart.StockQuantity) {
        cart.Quantity++;
        this.updateQuantityOnServer(cart);
      }
    },
    // Cập nhật số lượng sản phẩm trên máy chủ
    async updateQuantityOnServer(cart) {
      try {
        const updatedCart = { ...cart };
        await this.updateCart(updatedCart);
        console.log("Đã cập nhật số lượng trên máy chủ!");
      } catch (error) {
        // Xử lý lỗi khi cập nhật không thành công
        console.error("Lỗi khi cập nhật số lượng trên máy chủ:", error);
        // Khôi phục lại số lượng ban đầu nếu cập nhật thất bại
        this.getCarts(this.auth.user.userId); // Lấy lại danh sách giỏ hàng từ máy chủ
      }
    },
    // Other methods
  },
};
</script>

<style lang="">
/* Your custom styles */
</style>

<template>
  <div class="statistical">
  <p>Biểu đồ thống kê số lượng sản phẩm bán được trong 12 tháng</p>
  <Bar class="bieudo"
    refs="chart"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    @click="handleBarClick"
  />
 
  <router-link to="/statisticaldetail">
    View Detail
  </router-link>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs/legacy";
//import { Bar } from "vue-chartjs";
import 'chartjs-plugin-datalabels';

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
            label: "Số lượng",
            backgroundColor: "#f87979",
            //data: [0,0,0,0,0,0,0,0,0,0,0,0]
            data: Array(12).fill(0) // Khởi tạo mảng 12 phần tử ban đầu là 0
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

        // // Cập nhật dữ liệu biểu đồ
        // this.chartData.datasets[0].data = monthlySalesData.map(
        //   item => item.Quantity
        //   // console.log()
        // );

        // Ánh xạ dữ liệu vào mảng tháng
        const newData = Array(12).fill(0); // Khởi tạo mảng mới

        monthlySalesData.forEach(item => {
          if (item.Month >= 1 && item.Month <= 12) {
            newData[item.Month - 1] = item.Quantity;
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

        // console.log("log data");
        // console.log(this.$refs.chart);
        // console.log("kiểm tra")
        // console.log(this.$refs.chart instanceof Bar);
        // console.log("tên")
        // console.log(this.$refs.chart.$el.tagName);

        // Gọi $nextTick để đợi Vue cập nhật
        // this.$nextTick(() => {
        //   // Gọi update() trên biểu đồ để áp dụng các thay đổi
        //   if (this.$refs.chart && this.$refs.chart.update) {
        //     this.$refs.chart.update();

        //   }
        // });
      } catch (error) {
        console.error("Error fetching monthly sales data:", error);
      }
    },
    handleBarClick(event, chartElements) {
      if (chartElements.length > 0) {
        const monthIndex = chartElements[0].index;
        this.selectedMonth = monthIndex;
      }
    }
  },
  mounted() {
    // console.log("data cũ")
    // console.log( this.chartData.datasets);

    const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
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

