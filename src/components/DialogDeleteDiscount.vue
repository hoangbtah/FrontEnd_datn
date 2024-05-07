<template >
    
    <!-- form xác nhận xóa -->
<div class="m-dialog" v-if="isShowDialogDeleteDiscount">
   <div class="m-dialog-confirm-del-content">
       <div class="m-dialog-confirm-del-header">
           <!-- <div class="m-icon-confirm-delete"></div> -->
           <div class="infor-warning"><label>Bạn có chắc muốn xóa giảm giá cho sản phẩm này không ?</label></div>
       </div>
       <div class="m-dialog-confirm-del-btn">
           <div class="m-dialog-confirm-del-no">
               <button id="m-dialog-confirm-del-no" class="m-btn m-btn-nocolor" @click="hideIsShowDialog()">Không</button>
           </div>
           <div class="m-dialog-confirm-del-yes">
               <button id="m-dialog-confirm-del-yes" class="m-btn" @click="btnDelProductDiscount(product)">Có</button>
           </div>
       </div>
   </div>
</div>

</template>
<script>
import { mapGetters ,mapActions} from "vuex";
import axios from "axios";
// Import Vue và VueToasted
import Vue from "vue";
import Toasted from "vue-toasted";
Vue.use(Toasted);
export default {
name:"TheDialog",
created(){
//    this.getProduct();
},
computed: {
...mapGetters([
 "product",
 "isShowDialog",    
 "isShowDialogDeleteDiscount"
])
},
methods: {
...mapActions(["getProduct"]),
// ẩn dialog xác nhận xóa 
hideIsShowDialog() {
 this.$store.commit("TOGGLE_ISSHOWDIALOGDELETEDISCOUNT");
},
async btnDelProductDiscount(product){
   console.log("sản phẩm cần xóa ",product);
   try{
       await axios.delete(`https://localhost:7159/api/Discount/${product.DiscountId}`)
        // Hiển thị thông báo thành công
   this.$toasted.show("Xóa thành công!", {
     duration: 3000, // Thời gian hiển thị thông báo (ms)
     position: "top-center", // Vị trí hiển thị
     type: "success" // Kiểu thông báo (success, info, error)
   });
   // ấn dialog đi 
   this.$store.commit("TOGGLE_ISSHOWDIALOGDELETEDISCOUNT");

   this.$store.commit("DELETE_PRODUCT",product.ProductId);
   }
   catch(error){
       console.log("xóa thất bại");
         // Hiển thị thông báo thành công
   this.$toasted.show("Cảnh báo! Không lên xóa giảm giá của sản phẩm này vì nó sẽ ảnh hưởng đến thống kê doanh thu,nhưng nếu bạn vẫn muốn xóa hãy xóa các đơn hàng có sản phẩm này trước rồi quay lại xóa sản phẩm này", {
     duration: 5000, // Thời gian hiển thị thông báo (ms)
     position: "top-center", // Vị trí hiển thị
     type: "error" // Kiểu thông báo (success, info, error)
   });
   }
},
}
}
</script>
<style>
@import url("../assets_ad/css_ad/component/dialog.css");
@import url("../assets_ad/css_ad/main.css");   
</style>