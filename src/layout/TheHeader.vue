<template >
    <div>
          <!-- Topbar Start -->
    <div class="container-fluid">
        <div class="row bg-secondary py-2 px-xl-5">
            <div class="col-lg-6 d-none d-lg-block">
                <div class="d-inline-flex align-items-center">
                    <a class="text-dark" href="">FAQs</a>
                    <span class="text-muted px-2">|</span>
                    <a class="text-dark" href="">Help</a>
                    <span class="text-muted px-2">|</span>
                    <a class="text-dark" href="">Support</a>
                </div>
            </div>
            <div class="col-lg-6 text-center text-lg-right">
                <div class="d-inline-flex align-items-center">
                    <a class="text-dark px-2" href="">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a class="text-dark px-2" href="">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a class="text-dark px-2" href="">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a class="text-dark px-2" href="">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a class="text-dark pl-2" href="">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="row align-items-center py-3 px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <a href="" class="text-decoration-none">
                    <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                </a>
            </div>
            <div class="col-lg-6 col-6 text-left">
                <!-- <form action="">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for products" v-model="searchKey">
                        <div class="input-group-append">
                          
                            <button  style="border: none; background-color: bg-transparent;" @click="getSearchProduct()" > 
                                           <span class="input-group-text bg-transparent text-primary">
                                            <i class="fa fa-search"></i>
                                        </span>
                            </button>
                        </div>
                    </div>
                </form> -->
            </div>
            <div class="col-lg-3 col-6 text-right">
                <a @click="goToNotification()" class="btn border">
                    <i class="fas fa-bell text-primary" ></i>
                    <span class="badge" style="color:red" v-if="unreadCount>0">{{ unreadCount }}</span>
                </a>
             
                <a @click="goToShoppingCart()" class="btn border">
                         <i class="fas fa-shopping-cart text-primary"></i>
                    <span class="badge">{{ carts.length }}</span>
                </a>
            </div>
            
        </div>
    </div>
    <!-- Topbar End -->


    <!-- Navbar Start -->
    <div class="container-fluid">
        <div class="row border-top px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <a class="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical" style="height: 65px; margin-top: -1px; padding: 0 30px;">
                    <h6 class="m-0">Thương hiệu</h6>
                    <i class="fa fa-angle-down text-dark"></i>
                </a>
                <nav class="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light" id="navbar-vertical" style="width: calc(100% - 30px); z-index: 1;">
                    <div class="navbar-nav w-100 overflow-hidden" style="min-height: 300px"  >
                       
                        <a class="nav-item nav-link"  v-for="manufactorer in manufactorers" :key="manufactorer.manufactorerId"
                        @click="handleGetProductsByManufactorer(manufactorer.manufactorerId)"> 
                        <router-link to="/theshop">{{ manufactorer.manufactorerName }}</router-link></a>
                        <a class="nav-item nav-link" @click="selectAllManufactorer()">
                             <!-- <router-link to="/theshop"> -->
                             CHỌN TẤT CẢ
                             <!-- </router-link> -->
                             </a>
                       
                    </div>
                </nav>
            </div>
            <div class="col-lg-9">
                <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                    <a href="" class="text-decoration-none d-block d-lg-none">
                        <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                    </a>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div class="navbar-nav ">
                            <router-link  class="nav-item nav-link" to="/" exact><div class="nav-text">Home</div></router-link>
                            <router-link class="nav-item nav-link" to="/theshop"><div class="nav-text">Shop</div></router-link>
                            <!-- <router-link to="/paymentreturn" class="nav-item nav-link"><div class="nav-text">Payment Return</div></router-link>
                            <router-link to="/payment" class="nav-item nav-link"><div class="nav-text">Payment</div></router-link> -->
                            <div class="nav-item dropdown" >
                                <a href="#" class="nav-link dropdown-toggle " data-toggle="dropdown">Danh mục</a>
                                <div class="dropdown-menu rounded-0 m-0" >
                                    <a class="dropdown-item" v-for="catagory in catagorys" :key="catagory.catagoryId" @click="getProductsByCatagoryId(catagory.catagoryId)"><router-link to="/theshop">{{ catagory.catagoryName }}</router-link></a>
                                    <a class="dropdown-item" @click="selectAllCatagory()">Chọn tất cả</a>
                                </div>
                            </div>
                            <!-- <router-link to="/contact"  class="nav-item nav-link"><div class="nav-text">Contact</div></router-link> -->
                        </div>
                        <div class="navbar-nav ml-auto py-0">
                           <div v-if="auth.isAuthenticated"> <router-link to="/login" class="nav-item nav-link"><div class="nav-text">Login</div></router-link></div>
                           <div v-else>
                            <router-link to="/user" class="nav-item nav-link"><div class="nav-text">{{ auth.user.name }}</div></router-link>
                            </div>
                            <router-link to="/register" class="nav-item nav-link"><div class="nav-text">Register</div></router-link>
                            <div v-if="auth.isAuthenticated==false"><a class="nav-item nav-link" @click="logout()"><div class="nav-text">Logout</div></a>
                            </div>
                          
                        </div>
                    </div>
                </nav>
                
            </div>
        </div>
    </div>

    <!-- Navbar End -->
    </div>
    
</template>

<script>
import { mapActions, mapGetters } from "vuex";
//import TheHeaderCur from './TheHeaderCur.vue'
export default {
  name: "TheHeader",
  components: {},
  computed: { ...mapGetters(["catagorys", "manufactorers", "auth", "carts","unreadCount","searchProduct"]) },
  created() {
    this.getCatagorys();
    this.getManufactorers();
    //lấy người dùng
    const user = localStorage.getItem("selectedUser");
    console.log(this.auth.isAuthenticated);
    if (user) {
      // Nếu đã lưu sản phẩm trong Local Storage, sử dụng nó
      this.$store.commit("SET_USER", JSON.parse(user));
     // console.log("lật lại user");
      this.$store.commit("TOGGLE_AUTH");
    //  console.log(this.auth.isAuthenticated);
    } else {
      // Nếu chưa có, gọi API để lấy sản phẩm
      this.getUser(this.auth.user.name, this.auth.user.password);
    }
    // lấy giỏ hàng
    this.getCarts(this.auth.user.userId);
  },
//   watch:{
//     unreadCount(){
      
//     }
//   },
  methods: {
    ...mapActions([
      "getCatagorys",
      "getManufactorers",
      "getProductsByCatagoryId",
      "getProductsByManufactorerId",
      "getUser",
      "resetCarts",
      "getCarts",
      "markAllAsRead"
    ]),
    handleGetProductsByManufactorer(manufactorerId) {
      this.getProductsByManufactorerId(manufactorerId);
    },
    goToShoppingCart(){
         this.$root.$router.push("/shoppingcart");
    },
   goToNotification(){
    this.markAllAsRead();
    console.log(this.unreadCount);
    this.$root.$router.push("/notification");
   },
    logout() {
      // Lấy định danh của người dùng
    //   const userIdentifier = this.auth.name;

    //   // Xóa token của người dùng khỏi localStorage
    //   sessionStorage.removeItem(`token_${userIdentifier}`);
    //  Xóa token khỏi localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("selectedProduct");
      localStorage.removeItem("commentedProduct");
      localStorage.removeItem("selectedUser");
      // xóa hiển thị thông báo
    //   this.$store.commit("SET_ALLREAD");

      // Đặt lại trạng thái ủy quyền (authenticated) và dữ liệu cần thiết khác
      this.auth.isAuthenticated = true;
      this.auth.name = "";
      this.auth.user = {};
      this.resetCarts();
      console.log("user");
      console.log(this.auth.user);
      console.log("giỏ hàng");
      console.log(this.carts);

      // Cập nhật giao diện hoặc chuyển hướng đến trang chủ
      this.$router.push("/theshop");
    },
    // chọn tất cả các hãng
    selectAllManufactorer(){
        this.$store.commit("RESET_SELECTEDMANUFACTORERID");
    },
    // chọn tất cả danh mục
    selectAllCatagory(){
        this.$store.commit("SET_SELECTEDCATAGORYID");
    },
    // getSearchProduct(){
    //     console.log("search key",this.searchKey)
    //     this.$store.commit("SET_SEARCHPRODUCT",this.searchKey);
    //     console.log("search Product",this.searchProduct)
    //   this.$router.push("/theshop");
    // }
  },
  data() {
    return {
    //   searchKey: "", // Biến lưu từ khóa tìm kiếm,
    };
  }
};
</script>
<style >
.router-link-active .nav-text {
  color: #d19c97;
}
</style>