<template >
    <div class="m-statis">    
        <div class="form-container">
            <label for="year">Năm</label>
            <select id="year" v-model="selectedYear">
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
            </select>
            <label for="month">Tháng</label>
            <select id="month" v-model="selectedMonth">
                <!-- <option value="all">Tất cả</option> -->
                <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
            </select>
            <button @click="selectMonthAndYear">Xem</button>
            <label>Ngày bắt đầu</label><input type="date" v-model="startDate"> <!-- Ngày bắt đầu -->
            <label>Ngày kết thúc</label><input type="date" v-model="endDate"> <!-- Ngày kết thúc -->
            <button @click="fetchDailySalesData">Tìm kiếm</button>
        </div>
       <div class="chart-all">
        <div>
                <BarChart />
        </div>
        <div>
                <PieChart/>
        </div>
       </div>
       <div>
        <p>Thống kê kết quả theo sản phẩm</p>
        <table id="tblEmployee" class="m-table">
                            <thead>
                             <tr>
                                <th>STT</th>
                                 <th class="m-employee-name">TÊN SẢN PHẨM</th>
                                 <th class="m-gender">GIÁ BÁN</th>
                                 <!-- <th class="m-dateOfbrith">MÔ TẢ</th> -->
                                 <th class="m-gender">Tổng SỐ LƯỢNG</th>
                                 <!-- <th class="m-position">LOẠI SẢN PHẨM</th> -->
                                 <th class="m-department-name">HÃNG SẢN XUẤT</th>
                                 <th class="m-account">HÌNH ẢNH</th>
                             </tr>       
                            </thead>     
                            <tbody>
                                <tr v-for="(productad,index) in items" :key="productad.ProductId">
                                    <td>{{index+1}}</td>
                                    <td>{{ productad.ProductName }}</td>
                                    <td>{{productad.Price }} đ</td>
                                    <td>{{ productad.TotalQuantity }}</td>
                                    <td>{{productad.ManufactorerName}}</td>
                                    <!-- <td></td> -->
                                    <td> <img class="" style="width:50px;height:50px" :src="productad.Image" alt=""></td>
                                    <td></td>
                                </tr>
                            </tbody>
                            </table>
       </div>
    </div>
</template>
<script>
import axios from "axios";
import PieChart from "./StatisticalDetail.vue";
import BarChart from "./TheStatistical.vue";
import { mapGetters } from "vuex";
export default {
  name: "StatisticalAll",
  components: {
    PieChart,
    BarChart
  },
  created() {
    this.getProductSale(this.selectedMonth, this.selectedYear);
  },
  computed: {
    ...mapGetters(["yearSelected", "monthSelected","startDateSatis","endDateSatis"])
  },
  watch: {
    yearSelected() {
      this.getProductSale(this.monthSelected, this.yearSelected);
    },
    monthSelected() {
      // this.getgetProductSale(this.);
      this.getProductSale(this.monthSelected, this.yearSelected);
    },
    startDateSatis(){
      this.getProductSaleByStartAndEnd(this.startDateSatis, this.endDateSatis);
    },
    endDateSatis(){
      this.getProductSaleByStartAndEnd(this.startDateSatis, this.endDateSatis);
    }

  },
  methods: {
    async selectMonthAndYear() {
      await this.$store.commit("SET_YEARSELECTED", this.selectedYear);
      await this.$store.commit("SET_MONTHSELECTED", this.selectedMonth);
    },
    // lấy danh sách sản phẩm bán được theo tháng và năm
    async getProductSale(month, year) {
      try {
        const respone = await axios.get(
          `https://localhost:7159/api/v1/Product/getProductSale/${month}/${year}`
        );
        this.items = respone.data;
        console.log("lấy sản phẩm bán thành công");
      } catch (error) {
        console.log("lấy sản phẩm bán lỗi");
        console.log(error);
      }
    },
    // lấy danh sách sản phẩm bán được theo khoảng thời gian
    async getProductSaleByStartAndEnd(start, end) {
      try {
        const respone = await axios.get(
          `https://localhost:7159/api/v1/Product/getProductSaleStatis/${start}/${end}`
        );
        this.items = respone.data;
        console.log("lấy sản phẩm bán thành công");
      } catch (error) {
        console.log("lấy sản phẩm bán lỗi");
        console.log(error);
      }
    },
    async fetchDailySalesData() {
      await this.$store.commit("SET_STARTDATE", this.startDate);
      await this.$store.commit("SET_ENDATE", this.endDate);      
    }
  },
  data() {
    return {
      selectedYear: new Date().getFullYear(), // Chọn năm hiện tại làm mặc định
      selectedMonth: (new Date().getMonth() + 1).toString(), // Lấy tháng hiện tại làm mặc định
      years: [2022, 2023, 2024], // Danh sách các năm
      months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], // Danh sách các tháng
      items: [],
      startDate:'',
      endDate:''
    };
  }
};
</script>
<style>
.chart-all {
  display: flex;
}
.form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
  position: sticky;
  background-color: #e5e5e5;
  top: 0;
  z-index: 10;
}

.form-container label {
  font-weight: bold;
  margin-bottom: 0px;
  /* padding-bottom: 0px; */
}

.form-container select {
  padding: 8px;
  border-radius: 2px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  /* height: 35px; */
}

.form-container button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background-color: #609ee0;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-container button:hover {
  background-color: #41d379;
}
.m-statis {
  overflow-y: auto;
}
</style>