<template >
    <div class="header">
    <div class="header-left">
        <div class="sibar">

        </div>
        <div class="logo">
           E SHOPPER
        </div>
    </div>
    <div class="header-right">
        <div class="header-right-left">
           <div class="m-logo-menu-company">

           </div>
           <div class="header-right-left-title">
                <!-- CÔNG TY TINH SẢN XUẤT-THƯƠNG MẠI QUI PHÚC -->
           </div>
           <div class="header-right-left-icon">
          
           </div>
        </div>
        <div class="header-right-right">
           <!-- <div class="m-icon-notice">

           </div> -->
           <div class="m-icon-user">

           </div>
           <div class="header-right-r-title">
                <!-- <label for="">Hi, {{  auth.user.name }} </label> -->
                <!-- <div v-if="auth.isAuthenticated"> <router-link to="/admin" class="nav-item nav-link"><div class="nav-text">Login</div></router-link></div> -->
                           <div>
                            <a class="nav-item nav-link"><div class="nav-text">Hi ,{{ auth.user.name }}</div></a>
                            </div>
                            <div v-if="auth.isAuthenticated==false"><a class="nav-item nav-link" @click="logout()"><div class="nav-text">Logout</div></a>
                            </div>
               
           </div>
           <div class="header-right-r-icon">
          
           </div>
        </div>
    </div>
</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
//import TheHeaderCur from './TheHeaderCur.vue'
export default {
  name: "TheHeader",
  components: {},
  computed: { ...mapGetters(["auth"]) },
  created() {
    // this.getCatagorys();
    // this.getManufactorers();
    //lấy người dùng
    const user = localStorage.getItem("selectedUser");
    console.log(this.auth.isAuthenticated);
    if (user) {
      // Nếu đã lưu sản phẩm trong Local Storage, sử dụng nó
      this.$store.commit("SET_USER", JSON.parse(user));
      console.log("lật lại user");
      this.$store.commit("TOGGLE_AUTH");
      console.log(this.auth.isAuthenticated);
    } else {
      // Nếu chưa có, gọi API để lấy sản phẩm
      this.getUser(this.auth.user.name, this.auth.user.password);
    }
    // // lấy giỏ hàng
    // this.getCarts(this.auth.user.userId);
  },

  methods: {
    ...mapActions([
    //   "getCatagorys",
    //   "getManufactorers",
    //   "getProductsByCatagoryId",
    //   "getProductsByManufactorerId",
      "getUser",
    //   "resetCarts",
    //   "getCarts"
    ]),

    logout() {
      // Xóa token khỏi localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("selectedProduct");
      localStorage.removeItem("commentedProduct");
      localStorage.removeItem("selectedUser");

      // Đặt lại trạng thái ủy quyền (authenticated) và dữ liệu cần thiết khác
      this.auth.isAuthenticated = true;
      this.auth.name = "";
      this.auth.user = {};
    //   this.resetCarts();
      // Cập nhật giao diện hoặc chuyển hướng đến trang chủ
      this.$router.push("/admin");
    }
  }
};
</script>
<style scoped="">
.header-right-r-title{
    display:flex;
}
@import url("../../../assets_ad/css_ad/layout/header.css");
</style>