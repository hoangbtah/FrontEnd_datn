<template >
    <div class="page-content">
           <div class="m-page-header">
               <div class="m-page-title">Sản phẩm khuyến mãi</div>
               <div class="m-page-button">
                   <!-- <button id="btn-add" class="m-btn" @click="btnAddClick()">Thêm mới</button> -->
               </div>
           </div>
           <div class="m-page-toolbar">
               <div class="m-toolbar-left">
                   <input id="txtSearch" class="m-input m-btn-icon-right m-icon-search" v-model="searchKey" placeholder="Tìm theo tên" style="width: 200px;"/>
               </div>
               <div class="m-toolbar-right">
                   <button @click="getSearchProduct(searchKey)" class="m-icon-refresh"></button>
               </div>
           </div>
           <div class="m-page-grid">
                   <div class="m-grid">
                       <table id="tblEmployee" class="m-table">
                           <thead>
                            <tr>
                             <th>STT</th>
                               <!-- <th><input type="checkbox" class="m-select-row"></th>
                                -->
                                <!-- <th class="m-employee-code"></th> -->
                                <th class="m-employee-name">TÊN SẢN PHẨM</th>
                                <th class="m-gender">GIÁ BÁN</th>
                                <th>GIẢM GIÁ</th>
                                <th>NGÀY BẮT ĐẦU</th>
                                <th>NGÀY KẾT THÚC</th>
                                <!-- <th class="m-dateOfbrith">MÔ TẢ</th> -->
                                <!-- <th class="m-gender">SỐ LƯỢNG</th> -->
                                <!-- <th class="m-position">LOẠI SẢN PHẨM</th> -->
                                <th class="m-department-name">HÃNG SẢN XUẤT</th>
                                <th class="m-account">HÌNH ẢNH</th>
                                <th class="m-option">CHỨC NĂNG</th>
                            </tr>       
                           </thead>     
                           <tbody>
                               <tr v-for="(productad,index) in productsDiscount" :key="productad.DiscountId">
                                   <td>{{ index+1 }}</td>
                                   <td>{{ productad.ProductName }}</td>
                                   <td>{{ formatCurrency(productad.Price) }} đ</td>
                                   <td>{{ productad.DiscountPercent }}</td>
                                   <td>{{ formatDate(productad.StartDate) }}</td>
                                   <td>{{ formatDate(productad.EndDate) }}</td>
                                   <!-- <td>{{ productad.Quantity }}</td> -->
                                   <!-- <td>{{ productad.CatagoryName }}</td> -->
                                   <td>{{ productad.ManufactorerName }}</td>
                                   <td> <img class="" style="width:80px;height:80px" :src="productad.Image" alt=""></td>
                                   
                                   <!-- <td></td> -->
                                   <td>
                                      <div class="m-option">
                                       <!-- <button class="m-btn-option m-btn-de btn-info"  @click="btnDetailClick(productad.ProductId)">Chi tiết</button> -->
                                       <button class="m-btn-option m-btn-ud btn-warning" @click="btnUpdateClick(productad.ProductId)">Sửa</button>
                                       <button class="m-btn-option m-btn-ud  btn-danger" @click="btnDelete(productad.ProductId)">Xóa</button>
                                      </div>
                                   </td>
                               </tr>
                           </tbody>
                           </table>
                   </div>
                  
                   <div class="m-page-paging">
                       <div class="m-page-left">
                           <label>Tổng số : {{ datatotal }} sản phẩm</label>
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
            <DiscountDetail :forModeDiscount="forDiscount"/>
            <DialogDeleteDiscount/>
           </div>
                   
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
 import DiscountDetail from "./DiscountDetail";
import DialogDeleteDiscount from "../../../../components/DialogDeleteDiscount";
export default {
 name: "ProductDiscount",
 components: { DiscountDetail,DialogDeleteDiscount },

 computed: {
   ...mapGetters([
     "product",
     "comments",
     "products",
     "isShowDiscount",
     "pageproducts",
     "searchProduct",
     "productsDiscount"
   ]),
   // hiển thị trang
   displayedPages() {
     console.log("hiển thị trang 1");
     const start = Math.max(
       1,
       this.pageNumber - Math.floor(this.maxDisplayedPages / 2)
     );
     const end = Math.min(this.totalPages, start + this.maxDisplayedPages - 1);
     return Array.from({ length: end - start + 1 }, (_, i) => start + i);
   }
 },
 watch: {
   product() {
    console.log("sản phẩm thay đổi")
     this.fetchItems( this.searchProduct);
   },
   products() {
     this.fetchItems( this.searchProduct);
   },
   pageproducts() {
     this.fetchItems( this.searchProduct);
   },

 },

 created() {
  
   this.fetchItems();
  
 },

 methods: {
   ...mapActions([
     "getProduct",
     "getProducts",
     "getComments",
     "getProductSearch",
     "getProductsDiscount",
   ]),
   
   ///tìm kiếm sản phẩm
   async getSearchProduct(searchKey) {
     // // Lấy danh sách tìm kiếm từ Local Storage
     // let searchHistory =
     //   JSON.parse(localStorage.getItem("searchHistory")) || [];

     // // Kiểm tra xem chuỗi tìm kiếm đã tồn tại trong danh sách chưa
     // if (!searchHistory.includes(searchKey)) {
     //   // Nếu chưa tồn tại, thêm vào danh sách
     //   searchHistory.push(searchKey);
     //   // Lưu danh sách mới vào Local Storage
     //   localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
     // }

     await this.getProductSearch(searchKey);
     console.log("chuỗi nhập vào", this.searchProduct);

     try {
       // Gọi hàm fetchItems với manufactorerId và searchProduct được truyền vào
       //  await this.fetchItems(this.selectedManufacturerId, this.searchProduct);
       await this.fetchItems(
         // this.selectedManufacturerId,
         this.searchProduct
         // this.selectedCatagoryId,
         // this.moneyFirst,
         // this.moneyLast
       );
     } catch (error) {
       console.error(error);
     }
   },
   //lấy sản phẩm theo phân trang lọc tìm kiếm
   async fetchItems() {
     try {
      
       let url = `https://localhost:7159/api/v1/Product/products/discounted?pagenumber=${
         this.pageNumber
       }&pagesize=${this.pageSize}`;

       // if (manufactorerId) {
       //   url += `&manufactorerId=${manufactorerId}`;
       //   console.log("mã hãng", manufactorerId);
       // }
    //    if (searchProduct) {
    //      url += `&search=${searchProduct}`;
    //      // console.log("chuỗi tìm kiếm", searchProduct);
    //    }
       // if (catagoryId) {
       //   url += `&catagoryId=${catagoryId}`;
       //   console.log("mã hãng", catagoryId);
       // }
       // if (searchProduct) {

       //   url += `&search=${searchProduct}`;
       //   console.log("chuỗi tìm kiếm",searchProduct);
       // }
       // if (firstM && lastM) {
       //   url += `&from=${firstM}&to=${lastM}`;
       //   console.log("khoảng tìm kiếm", firstM, "+", lastM);
       // }
       const response = await axios.get(url);

       await this.$store.commit("SET_PRODUCTSDISCOUNT", response.data.data);

       //this.total();
       this.totalPages = response.data.totalPages;
       this.datatotal = response.data.total;

      // console.log("danh sách sản phẩm phân trang ");
       // console.log(this.items);
       // Lưu danh sách sản phẩm phân trang vào Local Storage
       localStorage.setItem(
         "listPageAdminProduct",
         JSON.stringify(response.data)
       );
     
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

   // sửa giảm giá
   btnUpdateClick(productId) {
    this.$store.commit("TOGGLE_ISSHOWDISCOUNT");

    //  this.forModeDetail = 0;
     console.log(productId);
     console.log("lấy sản phẩm giảm giá")
      this.getProduct(productId);
    //  this.$store.commit("TOGGLE_ISSHOWDISCOUNT");
   },
   //xóa sản phẩm khỏi danh mục giảm giá
   async btnDelete(productId){
    console.log("mã giảm giá",productId);
     //hiển thi dialog
     this.$store.commit("TOGGLE_ISSHOWDIALOGDELETEDISCOUNT");
     await this.getProduct(productId);
     console.log("sản phẩm có mã cần xóa giảm giá",this.product)

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
 },
 data() {
   return {
     //  items: [],
     pageNumber: 1,
     pageSize: 4,
     totalPages: 0,
     maxDisplayedPages: 5,
     forDiscount: 0,
     searchKey: "",
     datatotal: 0 // Biến lưu từ khóa tìm kiếm,
   };
 }
};
</script>
<style>
@import url("../../../../assets_ad/css_ad/layout/content.css");
@import url("../../../../assets_ad/css_ad/page/employ.css");
@import url("../../../../assets_ad/css_ad/component/page.css");
</style>