<template >
    <div>
    <!-- Cart Start -->
    <div class="container-fluid pt-5">
        <div class="row px-xl-5">
            <div class="col-lg-8 table-responsive mb-5">
                <table class="table table-bordered text-center mb-0">
                    <thead class="bg-secondary text-dark">
                        <tr>
                            <th>Mã giảm giá</th>
                            <th>Thông tin</th>
                            <!-- <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th> -->
                        </tr>
                    </thead>
                    <tbody class="align-middle">
                        <tr v-for="voucher in voucherOfUser" :key="voucher.UserVoucherId">
                            <td>{{ voucher.VoucherCode }}</td>
                            <td class="align-middle" v-if="voucher.PercentVoucher>0">Bạn nhận được Voucher giảm giá {{ voucher.PercentVoucher*100 }} % .{{ voucher.DecriptionUse }} kể từ ngày {{ formatDate(voucher.StartDateVouCher) }} đến ngày {{ formatDate(voucher.EndDateVoucher) }} </td>
                            <td class="align-middle" v-if="voucher.DiscountMoney>0">Bạn nhận được Voucher giảm giá {{ formatCurrency(voucher.DiscountMoney) }} đ .{{ voucher.DecriptionUse }} kể từ ngày {{ formatDate(voucher.StartDateVouCher) }} đến ngày {{ formatDate(voucher.EndDateVoucher) }} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        
        </div>
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
  name: "TheNotification",
  created() {
    this.getVoucherOfUser(this.auth.user.userId);
  },
  computed: {
    ...mapGetters(["auth", "carts","voucherOfUser","underCount"]),
    
  },
  methods: {
    ...mapActions(["getVoucherOfUser"]),
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
   
  },
 
  data() {
    return {
    };
  }
};
</script>
<style lang="">
</style>