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
                <form action="">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for products">
                        <div class="input-group-append">
                            <span class="input-group-text bg-transparent text-primary">
                                <i class="fa fa-search"></i>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-lg-3 col-6 text-right">
                <a href="" class="btn border">
                    <i class="fas fa-heart text-primary"></i>
                    <span class="badge">0</span>
                </a>
                <a href="" class="btn border">
                    <i class="fas fa-shopping-cart text-primary"></i>
                    <span class="badge">0</span>
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
                        <!-- <div class="nav-item dropdown">
                            <a href="#" class="nav-link" data-toggle="dropdown">Dresses <i class="fa fa-angle-down float-right mt-1"></i></a>
                            <div class="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                <a href="" class="dropdown-item">Men's Dresses</a>
                                <a href="" class="dropdown-item">Women's Dresses</a>
                                <a href="" class="dropdown-item">Baby's Dresses</a>
                            </div>
                        </div> -->
                        <a class="nav-item nav-link"  v-for="manufactorer in manufactorers" :key="manufactorer.manufactorerId"
                        @click="getProductsByManufactorerId(manufactorer.manufactorerId)"
                       > <router-link to="/theshop">{{ manufactorer.manufactorerName }}</router-link></a>
                        <!-- <a href="" class="nav-item nav-link">Jeans</a> -->
                        <!-- <a href="" class="nav-item nav-link">Swimwear</a>
                        <a href="" class="nav-item nav-link">Sleepwear</a>
                        <a href="" class="nav-item nav-link">Sportswear</a>
                        <a href="" class="nav-item nav-link">Jumpsuits</a>
                        <a href="" class="nav-item nav-link">Blazers</a>
                        <a href="" class="nav-item nav-link">Jackets</a>
                        <a href="" class="nav-item nav-link">Shoes</a> -->
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
                            <router-link to="/productdetail" class="nav-item nav-link"><div class="nav-text">Shop Detail</div></router-link>
                            <router-link to="/shoppingcart" class="nav-item nav-link"><div class="nav-text">Shopping Cart</div></router-link>
                            <router-link to="/checkout" class="nav-item nav-link"><div class="nav-text">Check out</div></router-link>
                            <div class="nav-item dropdown" >
                                <a href="#" class="nav-link dropdown-toggle " data-toggle="dropdown">Danh mục</a>
                                <div class="dropdown-menu rounded-0 m-0" >
                                    <a class="dropdown-item" v-for="catagory in catagorys" :key="catagory.catagoryId" @click="getProductsByCatagoryId(catagory.catagoryId)"><router-link to="/theshop">{{ catagory.catagoryName }}</router-link></a>
                                    <!-- <a class="dropdown-item">Checkout</a> -->
                                </div>
                            </div>
                            <router-link to="/contact"  class="nav-item nav-link"><div class="nav-text">Contact</div></router-link>
                        </div>
                        <div class="navbar-nav ml-auto py-0">
                            <a href="" class="nav-item nav-link">Login</a>
                            <a href="" class="nav-item nav-link">Register</a>
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
import { mapActions ,mapGetters} from 'vuex';
//import TheHeaderCur from './TheHeaderCur.vue'
export default {
    name:'TheHeader',
    components:{},
    computed:{...mapGetters(['catagorys','manufactorers'])},
    created() {
        this.getCatagorys()
        this.getManufactorers()
    },
    methods:{
        ...mapActions(['getCatagorys','getManufactorers','getProductsByCatagoryId','getProductsByManufactorerId'])
    },
}
</script>
<style >
.router-link-active .nav-text{
   color:#D19C97;
}
</style>