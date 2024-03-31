<template>
    <div class="navbaradmin">
           <router-link to="/admin"  class="menu-item" >
               <div class="menu-icon m-icon-overview">   
               </div>
               <div class="menu-text">
                  Quản lý sản phẩm
               </div>
          </router-link>
           <router-link class="menu-item" to="/catagory">
               <div class="menu-icon m-icon-cash">
                   
               </div>
               <div class="menu-text">
                   Quản lý danh mục
               </div>
           </router-link>
           <div class="menu-item">
               <div class="menu-icon m-icon-deposits">
                   
               </div>
               <div class="menu-text">
                   Tiền gửi
               </div>
           </div>
           <div class="menu-item">
               <div class="menu-icon m-icon-purchase">
                   
               </div>
               <div class="menu-text">
                   Mua hàng
               </div>
           </div>
           <div class="menu-item">
               <div class="menu-icon m-icon-sell">
                   
               </div>
               <div class="menu-text">
                   Bán hàng
               </div>
           </div>
           <div class="menu-item">
               <div class="menu-icon m-icon-invoice-management">
                   
               </div>
               <div class="menu-text">
                   Quản lý hóa đơn 
               </div>
           </div>
         
          

       </div>
</template>
<script>
export default {
   
}
</script>
<style scoped>
@import url("../../../assets/css/admincss/style/layout/navbar.css");
.navbar a{
   text-decoration: none;
   color: unset;
}
</style>