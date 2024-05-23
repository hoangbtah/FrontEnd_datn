<template >
    <div>
    <!-- Cart Start -->
    <div class="container-fluid pt-5">
        <!-- <div class="row px-xl-5"> -->
            <!-- <div class="col-lg-8 table-responsive mb-5"> -->
                <table class="table table-bordered text-center mb-0">
                    <thead class="bg-secondary text-dark">
                        <tr>
                               <th>STT</th>
                                <!-- <th class="m-position">NGƯỜI ĐẶT HÀNG</th> -->
                                <th class="m-position">NGƯỜI NHẬN</th>
                                <th class="m-gender">NGÀY ĐẶT</th>
                                <th class="m-department-name">ĐỊA CHỈ</th>
                                <th class="m-account">SỐ ĐT</th>
                                <th class="m-position">TRẠNG THÁI TT</th>
                                <!-- <th class="m-position">HÌNH THỨC TT</th> -->
                                <!-- <th class="m-position">TÌNH TRẠNG</th> -->
                                <th class="m-position">TOTAL</th>
                                <th class="m-option">CHỨC NĂNG</th> 
                            </tr>       
                           </thead>     
                           <tbody>
                               <tr v-for="(order,index) in orderUser" :key="order.OrderProductId">
                                   <td>{{ index+1 }}</td>
                                   <!-- <td>{{ order.Name }}</td> -->
                                   <td>{{ order.Receiver }}</td>
                                   <td>{{ formatDate(order.OrderDate) }}</td>
                                   <td>{{ order.OrderAddress }}</td>
                                   <td>{{ order.Phone }}</td>
                                   <td v-if="order.StatusPayment===0">Chưa thanh toán</td>
                                   <td v-if="order.StatusPayment===1">Đã thanh toán</td>
                                   <!-- <td v-if="order.Payment===0">Offline</td>
                                   <td v-if="order.Payment===1">Online</td> -->
                                   <!-- <td v-if="order.Status===0">Chưa xử lý</td>
                                   <td v-if="order.Status===1">Đã xử lý</td> -->
                                   <td>{{ formatCurrency(order.OrderTotal) }}</td>
                                   <td>
                                      <div class="m-option">
                                       <!-- <button class="m-btn-option m-btn-de btn-info"  @click="btnOrderDetailClick(order.OrderProductId)">Chi tiết</button> -->
                                       <button v-if="order.StatusPayment===0" class="m-btn-option m-btn-pay btn-info" @click="btnPay(order)">Thanh toán</button>
                                      </div>
                                   </td>
                               </tr>
                           </tbody>
                </table>
            <!-- </div> -->
        
        <!-- </div> -->
    </div>
    <!-- Cart End -->
    </div>
</template>
<script>

import { mapActions, mapGetters } from "vuex";
// import axios from "axios";
// Import Vue và VueToasted
import Vue from 'vue';
import Toasted from 'vue-toasted';

// Sử dụng VueToasted với Vue
Vue.use(Toasted);
export default {
  name: "OrderUser",
  created() {
     this.getOrderByUserId(this.auth.user.userId);
  },
  computed: {
    ...mapGetters(["auth", "carts","voucherOfUser","underCount",'orderUser']),
    
  },
  methods: {
    ...mapActions(["getOrderByUserId",'getOrder']),
       // định dạng ngày date
       formatDate(dob)
    {
        if(dob)
        {
            dob= new Date(dob);
            let date= dob.getDate();
            date =date<10 ?  `0${date}`:date;
            // lấy ngày 
            let month= dob.getMonth()+1;
            // lấy tháng
            month= month <10 ? `0${month}`:month;
            let year = dob.getFullYear();
            //lấy giá trị là ngày tháng năm
            dob= `${date}-${month}-${year}`;
        }
        else{
            dob = "";
        }
        return dob;
    },
      // format tiền
      formatCurrency(number) {
      // Chuyển số sang chuỗi và đảm bảo là kiểu number

      number = Number(number);
      // Kiểm tra nếu không phải là số hợp lệ
      if (isNaN(number)) {
        return "0";
      }
      // Làm tròn số tiền theo quy tắc gần nhất
      if (number < 1000) {
        number = Math.round(number / 100) * 100; // Làm tròn đến hàng trăm gần nhất
      } else {
        number = Math.round(number / 1000) * 1000; // Làm tròn đến hàng nghìn gần nhất
      }
      // Sử dụng hàm toLocaleString() để định dạng tiền tệ theo định dạng của Việt Nam
      // Ví dụ: 100000 sẽ thành "100.000"
      return number.toLocaleString("vi-VN");
    },
    async btnPay(order){
        console.log(order.OrderProductId)
       await this.getOrder(order.OrderProductId);
       await this.$router.push('/payment');      
    }
   
  },
 
  data() {
    return {
    };
  }
};
</script>
<style>
.m-btn-pay{
    width:120px;
}
</style>