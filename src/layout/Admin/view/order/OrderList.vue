<template >
    <div class="page-content">
           <div class="m-page-header">
               <div class="m-page-title">Đơn hàng</div>
               <!-- <div class="m-page-button">
                   <button id="btn-add" class="m-btn" @click="btnAddClick()">Thêm mới</button>
               </div> -->
           </div>
           <div class="m-page-toolbar">
               <div class="m-toolbar-left">
                   <input id="txtSearch" class="m-input m-btn-icon-right m-icon-search" placeholder="Tìm theo tên" style="width: 200px;"/>
               </div>
               <div class="m-toolbar-right">
                   <button id="reload" class="m-icon-refresh"></button>
               </div>
           </div>
           <div class="m-page-grid">
                   <div class="m-grid">
                       <table id="tblEmployee" class="m-table">
                           <thead>
                            <tr>
                               <th><input type="checkbox" class="m-select-row"></th>
                                <!-- <th class="m-employee-code"></th> -->
                                <th class="m-employee-name">NGƯỜI MUA HÀNG</th>
                                <th class="m-gender">NGÀY ĐẶT</th>

                                <!-- <th class="m-dateOfbrith">ĐỊA CHỈ ĐƠN HÀNG</th> -->
                                <!-- <th class="m-identityCode">NGÀY GIAO</th> -->
                                <th class="m-position">TÌNH TRANG</th>
                                <th class="m-department-name">ĐỊA CHỈ</th>
                                <th class="m-account">SỐ ĐT</th>
                                <th class="m-option">CHỨC NĂNG</th> 
                            </tr>       
                           </thead>     
                           <tbody>
                               <tr v-for="order in orders" :key="order.OrderProductId">
                                   <td><input type="checkbox" class="m-select-row"></td>
                                   <td>{{ order.Name }}</td>
                                   <td>{{ formatDate(order.OrderDate) }}</td>
                                   <!-- <td>{{ formatDate(order.deliveryDate) }}</td> -->
                                   <td>{{ order.Status }}</td>
                                   <td>{{ order.Phone }}</td>
                                   <!-- <td> <img class="" style="width:80px;height:80px" :src="productad.Image" alt=""></td> -->
                                   
                                   <td>{{ order.OrderAddress }}</td>
                                   <td>
                                      <div class="m-option">
                                       <button class="m-btn-option m-btn-de btn-info"  @click="btnOrderDetailClick(order.OrderProductId)">Chi tiết</button>
                                       <button class="m-btn-option m-btn-ud btn-warning" @click="btnUpdateClick()">Sửa</button>
                                       <button class="m-btn-option m-btn-ud  btn-danger" @click="btnDelete()">Xóa</button>
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
                               <!-- <select name="" id="">
                                   <option>10 bản ghi trên 1 trang</option>
                                   <option>20 bản ghi trên 1 trang</option>
                                   <option>30 bản ghi trên 1 trang</option>
                                   <option>50 bản ghi trên 1 trang</option>
                                   <option>100 bản ghi trên 1 trang</option>
                               </select> -->
                           </div>
                           <div class="m-number">
                               <button @click="prevPage" :disabled="pageNumber === 1">Trước</button>
                               <button v-for="page in displayedPages" :key="page" @click="gotoPage(page)" :class="{ 'm-page-selected': page === pageNumber }">{{ page }}</button>
                               <button @click="nextPage" :disabled="pageNumber === totalPages">Sau</button>
                               <!-- <button >Trước</button>
                               <button class="m-page-selected">1</button>
                           <button >2</button>
                           <button >3</button>
                           <button >4</button>
                           <button >Sau</button> -->
                           </div>
                          
                       </div>
                   </div>   
           </div>
           <OrderDetail/>
           </div>        
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import OrderDetail from './OrderDetail';
import axios from "axios";
export default {
 name: "OrderList",
 components:{OrderDetail},
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
 created() {
  // this.getProducts();
  this.getOrders();
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