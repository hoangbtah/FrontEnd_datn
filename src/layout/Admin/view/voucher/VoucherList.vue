<template>
    <div class="page-content">
           <div class="m-page-header">
               <div class="m-page-title">Thông tin Voucher</div>
               <div class="m-page-button">
                   <button id="btn-add" class="m-btn" @click="btnAddVoucher()">Thêm mới Voucher</button>
               </div>
           </div>
           <div class="m-page-toolbar">
               <!-- <div class="m-toolbar-left">
                   <input id="txtSearch" class="m-input m-btn-icon-right m-icon-search" placeholder="Tìm theo tên " style="width: 200px;"/>
               </div>
               <div class="m-toolbar-right">
                   <button id="reload" class="m-icon-refresh"></button>
               </div> -->
           </div>
           <div class="m-page-grid">
                   <div class="m-grid">
                       <table id="tblEmployee" class="m-table">
                           <thead>
                            <tr>
                               <th>Stt</th>
                                <th class="m-employee-name">Mã Voucher</th>
                                <th class="m-gender">Ngày bắt đầu</th>
                                <th class="m-dateOfbrith">Ngày kết thúc</th>
                                <th class="m-account">Phần trăm giảm giá</th>
                                <th class="m-option">Giá đầu</th>
                                <th class="m-bank-name">Giá cuối</th>
                                <th class="m-bank-name">Số tiền giảm</th>
                               <th>Chức năng</th>
                            </tr>       
                           </thead>     
                           <tbody v-for="(voucher,index) in vouchers" :key="voucher.voucherId">
                              <tr>
                               <td>{{ index+1 }}</td>
                               <td>{{ voucher.voucherCode }}</td>
                               <td>{{ formatDate(voucher.startDateVoucher) }}</td>
                               <td>{{ formatDate(voucher.endDateVoucher) }}</td>
                               <td>{{ voucher.percentVoucher }}</td>
                               <td>{{ formatCurrency(voucher.startPrice) }}</td>
                               <td>{{ formatCurrency(voucher.endPrice) }}</td>
                               <td>{{ formatCurrency(voucher.discountMoney) }}</td>
                               <td>
                                    <button class="m-btn-option btn-warning"  @click="btnUpdateVoucher(voucher.voucherId)">Sửa</button>
                                   <!-- <button class="m-btn-option btn-info"  @click="btnDelete(voucher.voucherId)">Khóa</button> -->
                                   <!-- <button class="m-btn-option btn-warning" v-if="user.active===0" @click="btnUpdateUser(user)">Mở khóa</button>  -->
                               </td>
                              </tr>
                           </tbody>
                           </table>
                   </div>
                  
                   <div class="m-page-paging">
                       <div class="m-page-left">
                           <label>Tổng số {{ vouchers.length }} voucher</label>
                       </div>
                       <div class="m-page-right">
                           
                          
                       </div>
                   </div>   
           </div>
         <VoucherDetail :forMode="forModeVoucher"/>
       </div>
</template>
<script>
// import axios from "axios";
import VoucherDetail from "./VoucherDetail";
import { mapActions, mapGetters } from "vuex";
// Import Vue và VueToasted
import Vue from "vue";
import Toasted from "vue-toasted";

// Sử dụng VueToasted với Vue
Vue.use(Toasted);
export default {
 name: "VoucherList",
 components:{VoucherDetail},
 computed: { ...mapGetters(["vouchers","voucher"]) },
 created() {
    this.getVouchers();
 },
 methods: {
   ...mapActions(["getVouchers","getVoucher"]),
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
     // định dạng ngày
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
            dob= `${date}/${month}/${year}`;
        }
        else{
            dob = "";
        }
        return dob;
    },
    // thêm mới voucher
    btnAddVoucher(){
        // hiển thị form thêm mới voucher
      this.$store.commit("TOGGLE_ISSHOWVOUCHER");
      // làm rỗng form thêm mới 
      this.$store.commit("SET_VOUCHER",[]);
      // gán trang thái thêm mới 
      this.forModeVoucher=1;
    },
    // sửa voucher
   async btnUpdateVoucher(voucherId){
        // hiển thị form thêm mới voucher
      this.$store.commit("TOGGLE_ISSHOWVOUCHER");
      // gán trang thái cập nhật
      this.forModeVoucher=0;
      // lấy voucher
      await this.getVoucher(voucherId);
    },
   
 },
 watch:{
  voucher(){
    this.getVouchers();
  }
 },
 data() {
   return {
     forModeVoucher: 0,
     
   };
 }
};
</script>
<style>
@import url("../../../..//assets_ad/css_ad/layout/content.css");
@import url("../../../../assets_ad/css_ad/page/employ.css");
@import url("../../../../assets_ad/css_ad/component/page.css");
.m-btn-option {
 width: 70px;
}
</style>