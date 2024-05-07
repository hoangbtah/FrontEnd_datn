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
                   Quản lý hãng sản xuất
               </div>
           </div>
           <router-link to="/order" class="menu-item">
               <div class="menu-icon m-icon-purchase">
                   
               </div>
               <div class="menu-text">
                   Quản lý đơn hàng
               </div>
           </router-link>
           <router-link to="/orderdetail" class="menu-item">
               <div class="menu-icon m-icon-purchase">
                   
               </div>
               <div class="menu-text">
                   Chi tiết đơn hàng
               </div>
           </router-link>
           <router-link to="/employee" class="menu-item">
               <div class="menu-icon m-icon-sell">
                   
               </div>
               <div class="menu-text">
                   Quản lý tài khoản
               </div>
           </router-link>
           <!-- <div class="menu-item">
               <div class="menu-icon m-icon-invoice-management">
                   
               </div>
               <div class="menu-text">
                   Quản lý giảm giá 
               </div>
           </div> -->
           <router-link to="/productdiscount" class="menu-item">
               <div class="menu-icon m-icon-sell">
                   
               </div>
               <div class="menu-text">
                   Quản lý khuyến mãi
               </div>
           </router-link>
           <!-- <router-link to="/statisticaldetail" class="menu-item">
               <div class="menu-icon m-icon-sell">
                   
               </div>
               <div class="menu-text">
                   Thống kê chi tiết
               </div>
           </router-link> -->
           <router-link to="/statisticalall" class="menu-item">
               <div class="menu-icon m-icon-sell">
                   
               </div>
               <div class="menu-text">
                   Thống kê 
               </div>
           </router-link>
          

       </div>
</template>
<script>
export default {
   
}
</script>
<style>
@import url("../../../assets_ad/css_ad/layout/navbar.css");
.navbaradmin a{
   text-decoration: none;
   color: unset;
}
.navbaradmin a:hover{
    text-decoration: none;
}
</style>