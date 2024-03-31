<template lang="">
   
    <div>
        <TheHeaderCur/>  
         <!-- Featured Start -->
    <div class="container-fluid pt-5">
        <div class="row px-xl-5 pb-3">
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
                    <h1 class="fa fa-check text-primary m-0 mr-3"></h1>
                    <h5 class="font-weight-semi-bold m-0">Quality Product</h5>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
                    <h1 class="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                    <h5 class="font-weight-semi-bold m-0">Free Shipping</h5>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
                    <h1 class="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                    <h5 class="font-weight-semi-bold m-0">14-Day Return</h5>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
                    <h1 class="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                    <h5 class="font-weight-semi-bold m-0">24/7 Support</h5>
                </div>
            </div>
        </div>
    </div>
    <!-- Featured End -->


    <!-- Categories Start -->
    <div class="container-fluid pt-5">
        <div class="row px-xl-5 pb-3">
            <div class="col-lg-4 col-md-6 pb-1">
                <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                    <p class="text-right">15 Products</p>
                    <a href="" class="cat-img position-relative overflow-hidden mb-3">
                        <img class="img-fluid" src="../assets/img/bna.webp" alt="">
                    </a>
                    <h5 class="font-weight-semi-bold m-0">Deal Thơm</h5>
                </div>
            </div>
           
            <div class="col-lg-4 col-md-6 pb-1">
                <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                    <p class="text-right">15 Products</p>
                    <a href="" class="cat-img position-relative overflow-hidden mb-3">
                        <img class="img-fluid" src="../assets/img/bnb.webp" alt="">
                    </a>
                    <h5 class="font-weight-semi-bold m-0">Nước hoa nam</h5>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 pb-1">
                <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                    <p class="text-right">15 Products</p>
                    <a href="" class="cat-img position-relative overflow-hidden mb-3">
                        <img class="img-fluid" src="../assets/img/bnc.webp" alt="">
                    </a>
                    <h5 class="font-weight-semi-bold m-0">Nước hoa nữ</h5>
                </div>
            </div>
            
        </div>
    </div>
    <!-- Categories End -->


    <!-- Offer Start -->
    <div class="container-fluid offer pt-5">
        <div class="row px-xl-5">
            <div class="col-md-6 pb-4">
                <div class="position-relative bg-secondary text-center text-md-right text-white mb-2 py-5 px-5">
                    <img src="../assets/img/offer-1.png" alt="">
                    <div class="position-relative" style="z-index: 1;">
                        <h5 class="text-uppercase text-primary mb-3">20% off the all order</h5>
                        <h1 class="mb-4 font-weight-semi-bold">Spring Collection</h1>
                        <a href="" class="btn btn-outline-primary py-md-2 px-md-3">Shop Now</a>
                    </div>
                </div>
            </div>
            <div class="col-md-6 pb-4">
                <div class="position-relative bg-secondary text-center text-md-left text-white mb-2 py-5 px-5">
                    <img src="../assets/img/offer-2.png" alt="">
                    <div class="position-relative" style="z-index: 1;">
                        <h5 class="text-uppercase text-primary mb-3">20% off the all order</h5>
                        <h1 class="mb-4 font-weight-semi-bold">Winter Collection</h1>
                        <a href="" class="btn btn-outline-primary py-md-2 px-md-3">Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Offer End -->


    <!-- Products Start -->
    <div class="container-fluid pt-5">
        <div class="text-center mb-4">
            <h2 class="section-title px-5"><span class="px-2">GUCCI</span></h2>
        </div>
        <div class="row px-xl-5 pb-3">
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1" v-for="product in getGucciProducts()" :key="product.ProductId">
                <div class="card product-item border-0 mb-4" >
                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img class="img-fluid w-100" :src="product.Image" alt="">
                    </div>
                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h7 class="text-truncate mb-3">{{product.ManufactorerName}}</h7>
                        <h6 class="text-truncate mb-3">{{product.ProductName}}</h6>
                        <div class="d-flex justify-content-center">
                            <h6>{{product.Price}}VNĐ</h6><h6 class="text-muted ml-2"><del>$123.00</del></h6>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light border">
                        <router-link to="/productdetail" class="btn btn-sm text-dark p-0" ><button @click="handleProductClick(product.ProductId)"
                         style="border: none; background-color: transparent;"><i class="fas fa-eye text-primary mr-1"></i>View Detail</button></router-link>
                        <router-link to="/shoppingcart" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</router-link>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    <!-- Products End -->
      <!-- Products Start -->
      <div class="container-fluid pt-5">
        <div class="text-center mb-4">
            <h2 class="section-title px-5"><span class="px-2">VALENTINO</span></h2>
        </div>
        <div class="row px-xl-5 pb-3">
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1"  v-for="product in getValentinoProducts()" :key="product.ProductId">
                <div class="card product-item border-0 mb-4">
                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img class="img-fluid w-100" :src="product.Image" alt="">
                    </div>
                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h7 class="text-truncate mb-3">{{product.ManufactorerName}}</h7>
                        <h6 class="text-truncate mb-3">{{product.ProductName}}</h6>
                        <div class="d-flex justify-content-center">
                            <h6>{{product.Price}}VNĐ</h6><h6 class="text-muted ml-2"><del>$123.00</del></h6>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light border">
                        <router-link to="/productdetail" class="btn btn-sm text-dark p-0" ><button @click="handleProductClick(product.ProductId)" 
                        style="border: none; background-color: transparent;"><i class="fas fa-eye text-primary mr-1"></i>View Detail</button></router-link>
                        <router-link to="/shoppingcart" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</router-link>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    <!-- Products End -->

    <!-- Subscribe Start -->
    <div class="container-fluid bg-secondary my-5">
        <div class="row justify-content-md-center py-5 px-xl-5">
            <div class="col-md-6 col-12 py-5">
                <div class="text-center mb-2 pb-2">
                    <h2 class="section-title px-5 mb-3"><span class="bg-secondary px-2">Hãy là người đầu tiên được biết</span></h2>
                    <p>Nhiều hoạt động hợp tác cùng các thương hiệu danh tiếng và chương trình khuyến mại hấp dẫn chỉ dành riêng cho khách hàng</p>
                </div>
                <form action="">
                    <div class="input-group">
                        <input type="text" class="form-control border-white p-4" placeholder="Email Goes Here">
                        <div class="input-group-append">
                            <button class="btn btn-primary px-4">Đăng kí ngay</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Subscribe End -->
        <!-- Products Start -->
        <div class="container-fluid pt-5">
        <div class="text-center mb-4">
            <h2 class="section-title px-5"><span class="px-2">NARCISO RODRIGUEZ</span></h2>
        </div>
        <div class="row px-xl-5 pb-3">
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1"  v-for="product in getNARCISOProducts()" :key="product.ProductId">
                <div class="card product-item border-0 mb-4">
                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img class="img-fluid w-100" :src="product.Image" alt="">
                    </div>
                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h7 class="text-truncate mb-3">{{product.ManufactorerName}}</h7>
                        <h6 class="text-truncate mb-3">{{product.ProductName}}</h6>
                        <div class="d-flex justify-content-center">
                            <h6>{{product.Price}}VNĐ</h6><h6 class="text-muted ml-2"><del>$123.00</del></h6>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light border">
                        <router-link to="/productdetail" class="btn btn-sm text-dark p-0" ><button @click="handleProductClick(product.ProductId)"  style="border: none; background-color: transparent;"><i class="fas fa-eye text-primary mr-1"></i>View Detail</button></router-link>
                        <router-link to="/shoppingcart" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</router-link>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    <!-- Products End -->

        <!-- Products Start -->
        <div class="container-fluid pt-5">
        <div class="text-center mb-4">
            <h2 class="section-title px-5"><span class="px-2">BURBERRY</span></h2>
        </div>
        <div class="row px-xl-5 pb-3">
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1"  v-for="product in getBURBERRYProducts()" :key="product.ProductId">
                <div class="card product-item border-0 mb-4">
                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img class="img-fluid w-100" :src="product.Image" alt="">
                    </div>
                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h7 class="text-truncate mb-3">{{product.ManufactorerName}}</h7>
                        <h6 class="text-truncate mb-3">{{product.ProductName}}</h6>
                        <div class="d-flex justify-content-center">
                            <h6>{{product.Price}}VNĐ</h6><h6 class="text-muted ml-2"><del>$123.00</del></h6>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light border">
                        <router-link to="/productdetail"  class="btn btn-sm text-dark p-0" ><button @click="handleProductClick(product.ProductId)" style="border: none; background-color: transparent;"><i class="fas fa-eye text-primary mr-1"></i>View Detail</button></router-link>
                        <router-link to="/shoppingcart" class="btn btn-sm text-dark p-0" ><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</router-link>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    <!-- Products End -->
   

    <!-- Vendor Start -->
    <!-- <div class="container-fluid py-5">
        <div class="row px-xl-5">
            <div class="col">
                <div class="owl-carousel vendor-carousel">
                    <div class="vendor-item border p-4">
                        <img src="img/vendor-1.jpg" alt="">
                    </div>
                    <div class="vendor-item border p-4">
                        <img src="img/vendor-2.jpg" alt="">
                    </div>
                    <div class="vendor-item border p-4">
                        <img src="img/vendor-3.jpg" alt="">
                    </div>
                    <div class="vendor-item border p-4">
                        <img src="img/vendor-4.jpg" alt="">
                    </div>
                    <div class="vendor-item border p-4">
                        <img src="img/vendor-5.jpg" alt="">
                    </div>
                    <div class="vendor-item border p-4">
                        <img src="img/vendor-6.jpg" alt="">
                    </div>
                    <div class="vendor-item border p-4">
                        <img src="img/vendor-7.jpg" alt="">
                    </div>
                    <div class="vendor-item border p-4">
                        <img src="img/vendor-8.jpg" alt="">
                    </div>
                </div>
            </div>
        </div> -->
    <!-- </div> -->
    <!-- Vendor End -->

    </div>
</template>
<script>
import { mapActions ,mapGetters} from 'vuex';
import TheHeaderCur from '../layout/TheHeaderCur.vue'
export default {
    name:'ShopIndex',
    components:{TheHeaderCur},
    computed:{...mapGetters(['products','product','comments'])
    },
    created() {
        this.getProducts()
     
        
    },
    methods:{
        ...mapActions(['getProducts','getProduct','getComments']),
        getValentinoProducts() {
            return this.products.filter(product => product.ManufactorerName === 'VALENTINO').slice(0, 4);
        },
        getGucciProducts() {
        return this.products.filter(product => product.ManufactorerName === 'GUCCI').slice(0, 4);
         },       
         getNARCISOProducts() {
        return this.products.filter(product => product.ManufactorerName === 'NARCISO RODRIGUEZ').slice(0, 4);
         },
         getBURBERRYProducts() {
        return this.products.filter(product => product.ManufactorerName === 'BURBERRY').slice(0, 4);
         },
  goToShoppingCart() {
    console.log("get");
        // this.$router.push('/productdetail');
        // Cuộn đến đầu trang sau khi trang được tải hoàn toàn
        this.$nextTick(() => {
            window.scrollTo(0, 0);
        });
    },
    handleProductClick(productId) {
        this.getProduct(productId);
        this.getComments(productId);
        this.goToShoppingCart();
    }

    },
}
</script>
<style lang="">
    
</style>