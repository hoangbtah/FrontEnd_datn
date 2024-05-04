<template >
  <div class="page-content">
            <div class="m-page-header">
                <div class="m-page-title">Chi tiết đơn hàng</div>
                <div class="m-page-button">
                    <!-- <button id="btn-add" class="m-btn" @click="btnAddClick()">Thêm mới</button> -->
                </div>
            </div>
            <div class="m-page-toolbar">
                <!-- <div class="m-toolbar-left">
                    <input id="txtSearch" class="m-input m-btn-icon-right m-icon-search" placeholder="Tìm theo tên" style="width: 200px;"/>
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
                              <th>STT</th>
                                <!-- <th><input type="checkbox" class="m-select-row"></th> -->
                                 <!-- <th class="m-employee-code"></th> -->
                                 <th class="m-employee-name">TÊN SẢN PHẨM</th>
                                 <th class="m-gender">GIÁ BÁN</th>
                                 <!-- <th class="m-dateOfbrith">MÔ TẢ</th> -->
                                 <th class="m-identityCode">SỐ LƯỢNG</th>
                                 <!-- <th class="m-position">LOẠI SẢN PHẨM</th> -->
                                 <th class="m-department-name">HÃNG SẢN XUẤT</th>
                                 <th class="m-account">HÌNH ẢNH</th>
                                 <!-- <th class="m-option">CHỨC NĂNG</th> -->
                             </tr>       
                            </thead>     
                            <tbody>
                                <tr v-for="(orderDetail,index) in orderDetails" :key="orderDetail.ProductId">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ orderDetail.ProductName }}</td>
                                    <td>{{ formatCurrency(orderDetail.Price) }} đ</td>
                                    <td>{{ orderDetail.Quantity }}</td>
                                    <!-- <td>{{ orderDetail.CatagoryName }}</td> -->
                                    <td>{{ orderDetail.ManufactorerName }}</td>
                                    <td> <img class="" style="width:80px;height:80px" :src="orderDetail.Image" alt=""></td>
                                    
                                    <!-- <td></td> -->
                                    <!-- <td>
                                       <div class="m-option">
                                        <button class="m-btn-option m-btn-de btn-info"  @click="btnDetailClick()">Chi tiết</button>
                                        <button class="m-btn-option m-btn-ud btn-warning" @click="btnUpdateClick()">Sửa</button>
                                        <button class="m-btn-option m-btn-ud  btn-danger" @click="btnDelete()">Xóa</button>
                                       </div>
                                    </td> -->
                                </tr>
                            </tbody>
                            </table>
                    </div>
                   
                    <div class="m-page-paging">
                        <div class="m-page-left">
                            <label>Tổng số : {{ orderDetails.length }} sản phẩm</label>
                        </div>
                        <div class="m-page-right">
                            <div class="m-number-page">
                               
                            </div>
                            <!-- <div class="m-number">
                                <button @click="prevPage" :disabled="pageNumber === 1">Trước</button>
                                <button v-for="page in displayedPages" :key="page" @click="gotoPage(page)" :class="{ 'm-page-selected': page === pageNumber }">{{ page }}</button>
                                <button @click="nextPage" :disabled="pageNumber === totalPages">Sau</button>
                             
                            </div> -->
                           
                        </div>
                    </div>   
            </div>
            </div>       
</template>
<script>
import { mapActions, mapGetters } from "vuex";
//import OrderDetail from './OrderDetail';
// import axios from "axios";
export default {
name: "OrderList",
components:{},
computed: {
 ...mapGetters(["orders",'isShowOD','orderDetails']),
 // hiển thị trang
 displayedPages() {
   const start = Math.max(1,this.pageNumber - Math.floor(this.maxDisplayedPages / 2)
   );
   const end = Math.min(this.totalPages, start + this.maxDisplayedPages - 1);
   return Array.from({ length: end - start + 1 }, (_, i) => start + i);
 }
},
created() {
// this.getProducts();
this.getOrderDetail();
//  this.fetchItems(this.pageNumber,this.pageSize);
 this.total();
},
methods: {
 ...mapActions(["getOrders","getOrderDetail"]),
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
 
 
//  nextPage() {
//    if (this.pageNumber < this.totalPages) {
//      this.pageNumber++;
//      this.fetchItems();
//    }
//  },
//  prevPage() {
//    if (this.pageNumber > 1) {
//      this.pageNumber--;
//      this.fetchItems();
//    }
//  },
//  gotoPage(page) {
//    if (page !== this.pageNumber) {
//      this.pageNumber = page;
//      this.fetchItems();
//    }
//  },
//  total() {
//    (this.totalPages = Math.ceil(this.products.length / this.pageSize))
//  },

},
data() {
 return {
   items: [],
   pageNumber: 1,
   pageSize: 9,
   totalPages: 0,
   maxDisplayedPages: 3,
   forModeDetail:0,
 };
}
};
</script>
<style>
@import url("../../../../assets_ad/css_ad/layout/content.css");
@import url("../../../../assets_ad/css_ad/page/employ.css");
@import url("../../../../assets_ad/css_ad/component/page.css");
</style>