<template >
    <div class="page-content">
           <div class="m-page-header">
               <div class="m-page-title">Đơn hàng</div>
               <!-- <div class="m-page-button">
                   <button id="btn-add" class="m-btn" @click="btnAddClick()">Thêm mới</button>
               </div> -->
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
                                <!-- <th class="m-position">NGƯỜI ĐẶT HÀNG</th> -->
                                <th class="m-position">NGƯỜI NHẬN</th>
                                <th class="m-gender">NGÀY ĐẶT</th>
                                <th class="m-department-name">ĐỊA CHỈ</th>
                                <th class="m-account">SỐ ĐT</th>
                                <th class="m-position">TRẠNG THÁI TT</th>
                                <th class="m-position">HÌNH THỨC TT</th>
                                <th class="m-position">TÌNH TRẠNG</th>
                                <th class="m-position">TOTAL</th>
                                <th class="m-option">CHỨC NĂNG</th> 
                            </tr>       
                           </thead>     
                           <tbody>
                               <tr v-for="(order,index) in orders" :key="order.OrderProductId">
                                   <td>{{ index+1 }}</td>
                                   <!-- <td>{{ order.Name }}</td> -->
                                   <td>{{ order.Receiver }}</td>
                                   <td>{{ formatDate(order.OrderDate) }}</td>
                                   <td>{{ order.OrderAddress }}</td>
                                   <td>{{ order.Phone }}</td>
                                   <td v-if="order.StatusPayment===0">Chưa thanh toán</td>
                                   <td v-if="order.StatusPayment===1">Đã thanh toán</td>
                                   <td v-if="order.Payment===0">Offline</td>
                                   <td v-if="order.Payment===1">Online</td>
                                   <td v-if="order.Status===0">Chưa xử lý</td>
                                   <td v-if="order.Status===1">Đã xử lý</td>
                                   <td>{{ formatCurrency(order.OrderTotal) }}</td>
                                   <td>
                                      <div class="m-option">
                                       <button class="m-btn-option m-btn-de btn-info"  @click="btnOrderDetailClick(order.OrderProductId)">Chi tiết</button>
                                       <button v-if="order.Status===0" class="m-btn-option m-btn-ud btn-warning" @click="btnHandled(order)">Xử lý</button>
                                       <!-- <button class="m-btn-option m-btn-ud  btn-danger" @click="btnHandled(order)">Xóa</button> -->
                                      </div>
                                   </td>
                               </tr>
                           </tbody>
                           </table>
                   </div>
                  
                   <div class="m-page-paging">
                       <div class="m-page-left">
                           <label>Tổng số : {{ orders.length }} đơn hàng</label>
                       </div>
                       <div class="m-page-right">
                           <div class="m-number-page">
                              
                           </div>
                           <div class="m-number">
                               <button @click="prevPage" :disabled="pageNumber === 1">Trước</button>
                               <button v-for="page in displayedPages" :key="page" @click="gotoPage(page)" :class="{ 'm-page-selected': page === pageNumber }">{{ page }}</button>
                               <button @click="nextPage" :disabled="pageNumber === totalPages">Sau</button>
                              
                           </div>
                          
                       </div>
                   </div>   
           </div>
           <!-- <OrderDetail/> -->
           </div>        
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// Import Vue và VueToasted
import Vue from 'vue';
import Toasted from 'vue-toasted';

// Sử dụng VueToasted với Vue
Vue.use(Toasted);
// import OrderDetail from './OrderDetail';
import axios from "axios";
export default {
 name: "OrderList",
 components:{},
 computed: {
   ...mapGetters(["orders",'isShowOD',"orderDetails"]),
   // hiển thị trang
   displayedPages() {
     const start = Math.max(1,this.pageNumber - Math.floor(this.maxDisplayedPages / 2)
     );
     const end = Math.min(this.totalPages, start + this.maxDisplayedPages - 1);
     return Array.from({ length: end - start + 1 }, (_, i) => start + i);
   }
 },
//  watch:{
//   orders(){
//   this.getOrders();
//   }
//  },
 created() {
  // this.getProducts();
  this.getOrders();
 //  this.fetchItems(this.pageNumber,this.pageSize);
  // this.total();
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
   //lấy sản phẩm theo phân trang lọc tìm kiếm
   async fetchItems() {
     try {
       const response = await axios.get(
         `https://localhost:7159/api/v1/Product/products/search?pagenumber=${
           this.pageNumber
         }&pagesize=${this.pageSize}`
       );
       this.items = response.data;
       console.log(this.totalPages);
     } catch (error) {
       console.error(error);
     }
   },
   nextPage() {
     if (this.pageNumber < this.totalPages) {
       this.pageNumber++;
       this.fetchItems();
     }
   },
   prevPage() {
     if (this.pageNumber > 1) {
       this.pageNumber--;
       this.fetchItems();
     }
   },
   gotoPage(page) {
     if (page !== this.pageNumber) {
       this.pageNumber = page;
       this.fetchItems();
     }
   },
   total() {
     (this.totalPages = Math.ceil(this.products.length / this.pageSize))
   }, 
   btnOrderDetailClick(orderId){
    console.log("lấy chi tiết đơn hàng");
    console.log(orderId);
    this.getOrderDetail(orderId);
    this.$router.push('/orderdetail');      
   },
   async btnHandled(order){
    const formData={
      orderProductId:order.OrderProductId,
      userId:order.UserId,
      orderDate:order.OrderDate,
      deliveryDate:order.OrderDate,
      status:1,
      receiver:order.Receiver,
      phone:order.Phone,
      orderAddress:order.OrderAddress
    }
    try{
    await axios.put(`https://localhost:7159/api/Order/${order.OrderProductId}`,formData);
      console.log("đon hàng sửa",formData);
      this.$toasted.show('Cập nhật  thành công !', {
        duration: 2000, // Thời gian hiển thị thông báo (ms)
        position: 'top-center', // Vị trí hiển thị
        type: 'success' // Kiểu thông báo (success, info, error)

        });
        // gọi lại dữ liệu 
        this.getOrders();
    }
    catch(error){
          // Hiển thị thông báo thành công
          this.$toasted.show('Cập nhật thất bại !', {
        duration: 2000, // Thời gian hiển thị thông báo (ms)
        position: 'top-center', // Vị trí hiển thị
        type: 'error' // Kiểu thông báo (success, info, error)

        });
    }

   }
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