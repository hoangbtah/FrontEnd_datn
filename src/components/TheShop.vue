<template >
    <div>
         <!-- Page Header Start -->
    <div class="container-fluid bg-secondary mb-5">
        <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 300px">
            <h1 class="font-weight-semi-bold text-uppercase mb-3">Our Shop</h1>
            <div class="d-inline-flex">
                <p class="m-0"><a >Home</a></p>
                <p class="m-0 px-2">-</p>
                <p class="m-0">Shop</p>
            </div>
        </div>
    </div>
    <!-- Page Header End -->
         <!-- Shop Start -->
    <div class="container-fluid pt-5">
        <div class="row px-xl-5">
            <!-- Shop Sidebar Start -->
            <div class="col-lg-3 col-md-12">
                <!-- Price Start -->
                <div class="border-bottom mb-4 pb-4">
                    <h5 class="font-weight-semi-bold mb-4">Filter by price</h5>
                    <form>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" checked id="price-all">
                            <label class="custom-control-label" for="price-all">All Price</label>
                            <!-- <span class="badge border font-weight-normal">1000</span> -->
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="price-1">
                            <label class="custom-control-label" for="price-1">199 k - 399k</label>
                            <!-- <span class="badge border font-weight-normal">150</span> -->
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="price-2">
                            <label class="custom-control-label" for="price-2">400k - 599k</label>
                            <!-- <span class="badge border font-weight-normal">295</span> -->
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="price-3">
                            <label class="custom-control-label" for="price-3">600k - 999k</label>
                            <!-- <span class="badge border font-weight-normal">246</span> -->
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="price-4">
                            <label class="custom-control-label" for="price-4">1000k - 1999k</label>
                            <!-- <span class="badge border font-weight-normal">145</span> -->
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                            <input type="checkbox" class="custom-control-input" id="price-5">
                            <label class="custom-control-label" for="price-5">2000k - $</label>
                            <!-- <span class="badge border font-weight-normal">168</span> -->
                        </div>
                    </form>
                </div>
                <!-- Price End -->
                
                

                <!-- Size Start -->
                <div class="mb-5">
                    <h5 class="font-weight-semi-bold mb-4">Filter by size</h5>
                    <form>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" checked id="size-all">
                            <label class="custom-control-label" for="size-all">All Size</label>
                            <!-- <span class="badge border font-weight-normal">1000</span> -->
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="size-1">
                            <label class="custom-control-label" for="size-1">10 ml</label>
                            <!-- <span class="badge border font-weight-normal">150</span> -->
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="size-2">
                            <label class="custom-control-label" for="size-2">20 ml</label>
                            <!-- <span class="badge border font-weight-normal">295</span> -->
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="size-3">
                            <label class="custom-control-label" for="size-3">30 ml</label>
                            <!-- <span class="badge border font-weight-normal">246</span> -->
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="size-4">
                            <label class="custom-control-label" for="size-4">50 ml</label>
                            <!-- <span class="badge border font-weight-normal">145</span> -->
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                            <input type="checkbox" class="custom-control-input" id="size-5">
                            <label class="custom-control-label" for="size-5">100 ml</label>
                            <!-- <span class="badge border font-weight-normal">168</span> -->
                        </div>
                    </form>
                </div>
                <!-- Size End -->
            </div>
            <!-- Shop Sidebar End -->


            <!-- Shop Product Start -->
            <div class="col-lg-9 col-md-12">
                <div class="row pb-3">
                    <div class="col-12 pb-1">
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <form action="">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search by name">
                                    <div class="input-group-append">
                                        <span class="input-group-text bg-transparent text-primary">
                                            <i class="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </form>
                            <div class="dropdown ml-4">
                                <button class="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                            Sort by
                                        </button>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                                    <a class="dropdown-item" href="#">Latest</a>
                                    <a class="dropdown-item" href="#">Popularity</a>
                                    <a class="dropdown-item" href="#">Best Rating</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 pb-1" v-for="productabc in pageproducts" :key="productabc.ProductId">
                        <div class="card product-item border-0 mb-4">
                            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                              <div class="sale-product">
                                <div class="product-0" v-if="productabc.Quantity==0"> <p>Đã hết hàng</p></div>
                                <div class="sale" v-if="productabc.DiscountPercent>0"> <P>-{{productabc.DiscountPercent*100}}%</P> </div>
                              </div>
                            
                              <P></P>
                                <img class="img-fluid w-100" :src="productabc.Image" alt="">
                            </div>
                            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                <h7 class="text-truncate mb-3">{{productabc.ManufactorerName}}</h7>
                                <h6 class="text-truncate mb-3">{{productabc.ProductName}}</h6>
                                <div class="d-flex justify-content-center">
                                    <h6 v-if="productabc.DiscountPercent>0">{{formatCurrency(productabc.Price- productabc.Price*productabc.DiscountPercent) }}đ</h6>
                                    <h6 class="text-muted ml-2" v-if="productabc.DiscountPercent>0"><del>{{ formatCurrency(productabc.Price) }}</del>đ</h6>
                                    <h6 v-else>{{formatCurrency(productabc.Price)}}đ</h6>

                                </div>
                            </div>
                            <div class="card-footer d-flex justify-content-between bg-light border">
                                <!-- <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a> -->
                                <router-link to="/productdetail" class="btn btn-sm text-dark p-0" ><button  @click ="handleProductClick(productabc.ProductId)" style="border: none; background-color: transparent;"><i class="fas fa-eye text-primary mr-1"></i>View Detail</button></router-link>
                                <a @click="addToCart(productabc)"  class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                            </div>
                        </div>
                    </div>
                  
                    <div class="col-12 pb-1">
                        <nav aria-label="Page navigation">
                          <ul class="pagination justify-content-center mb-3">
                            <li class="page-item">
                              <a class="page-link"  @click="prevPage" :disabled="pageNumber === 1" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                              </a> 
                            </li>
                            <!-- <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li> -->
                            <li class="page-item" v-for="page in displayedPages" :key="page" @click="gotoPage(page)" :class="{ 'active': page === pageNumber }"><a class="page-link" href="#">{{ page }}</a></li>
                            <li class="page-item">
                              <a class="page-link" @click="nextPage" :disabled="pageNumber === totalPages" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                              </a>
                             
                            </li>
                           
                          </ul>
                          
                        </nav>
                    </div>
                </div>
            </div>
            <!-- Shop Product End -->
        </div>
    </div>
    <!-- Shop End -->

    </div>
</template>
<script>
import { mapActions ,mapGetters} from 'vuex';
import axios from "axios";
// Import Vue và VueToasted
import Vue from 'vue';
import Toasted from 'vue-toasted';

// Sử dụng VueToasted với Vue
Vue.use(Toasted);
export default {
    name:'TheShop',
    computed:{...mapGetters(['products','product','carts','auth','pageproducts','selectedManufacturerId']),
      // hiển thị trang
      displayedPages() {
      const start = Math.max(1,this.pageNumber - Math.floor(this.maxDisplayedPages / 2)
      );
      const end = Math.min(this.totalPages, start + this.maxDisplayedPages - 1);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
    },
    created() {
      this.getProducts();
     this.fetchItems(this.pageNumber,this.pageSize);
    this.total();

    },
    // sử dụng watch để cập nhật khi thay phát hiện có thay đổi dữ liệu
    watch: {
    products() {
      this.total(); // Gọi lại hàm total() để tính lại totalPages
      console.log("tông số trang theo nhà sản xuất");
      console.log(this.totalPages);
     // this.gotoPage();
    }
  },
    methods:{
        ...mapActions(['getProducts','getProduct','getComments','fetchItems','addProductToCart','getUser','getProductsByManufactorerId']),
        handleProductClick(productId) {
        this.getProduct(productId);
        this.getComments(productId);
        this.$nextTick(() => {
            window.scrollTo(0, 0);
        });
    },
    async fetchItems() {
      try {
        const response = await axios.get(
          `https://localhost:7159/api/v1/Product/products/search?pagenumber=${this.pageNumber
          }&pagesize=${this.pageSize}`
        );
        console.log("dữ liệu phân trang")
        console.log(response.data);
       // this.pageproducts= response.data;
     this.$store.commit('SET_PAGEPRODUCTS', response.data);
      console.log("trạng thái ban đầu");
      console.log(this.pageproducts);

          this.total();
        //  this.displayedPages();
          // Lưu danh sách sản phẩm phân trang vào Local Storage
        //  localStorage.setItem('listPageProduct', JSON.stringify(response.data));
        console.log("tong só trang")
        console.log(this.totalPages);
      } catch (error) {
        console.error(error);
      }
    },
 async  nextPage() {
      if (this.pageNumber < this.totalPages) {
        this.pageNumber++;
       // this.fetchItems();
       if (this.selectedManufacturerId) {
    //  await this.fetchItems(this.selectedManufacturerId);
    await this.getProductsByManufactorerId(this.selectedManufacturerId);
    } else {
      await this.fetchItems();
    }
      }
    },
  async  prevPage() {
      if (this.pageNumber > 1) {
        this.pageNumber--;
       // this.fetchItems();
       if (this.selectedManufacturerId) {
     // await this.fetchItems(this.selectedManufacturerId);
    await this.getProductsByManufactorerId(this.selectedManufacturerId);

    } else {
      await this.fetchItems();
    }
      }
    },
  async  gotoPage(page) {
      if (page !== this.pageNumber) {
        this.pageNumber = page;
       // this.fetchItems();
       if (this.selectedManufacturerId) {
      //await this.fetchItems(this.selectedManufacturerId);
    await this.getProductsByManufactorerId(this.selectedManufacturerId);

    } else {
      await this.fetchItems();
    }
        // khi chuyển sang trang di chuyển lên vị trí đầu trang
        this.$nextTick(() => {
            window.scrollTo(0, 0);
        });
      }
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
    total() {
      (this.totalPages = Math.ceil(this.products.length / this.pageSize))
    },
    async addToCart(product) {
      const formData = {
        productId:product.ProductId,
        userId : this.auth.user.userId,
        productName:product.ProductName,
        image:product.Image,
        quantity:product.Quantity,
        price:product.Price,
      }
        console.log("product add to cart")
        console.log(product);
     // const userId = this.auth.user.userId;
     // console.log(userId);
     const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {

        // Nếu không có token, chuyển hướng đến trang đăng nhập
         this.$router.push("/login");
      //  commit('SET_NEED_LOGIN', true);
        return;
      }
      try {
       // await this.$store.dispatch("addProductToCart", { userId, product });
       console.log(formData);
       await this.addProductToCart(formData);
        console.log("Sản phẩm đã được thêm vào giỏ hàng!");
        // Hiển thị thông báo thành công
      this.$toasted.show('Thêm sản phẩm vào giỏ hàng thành công!', {
        duration: 2000, // Thời gian hiển thị thông báo (ms)
        position: 'top-center', // Vị trí hiển thị
        type: 'success' // Kiểu thông báo (success, info, error)
      });
      } catch (error) {
           // Hiển thị thông báo lỗi
      this.$toasted.show(error.response.data, {
        duration: 2000, // Thời gian hiển thị thông báo (ms)
        position: 'top-center', // Vị trí hiển thị
        type: 'error' // Kiểu thông báo (success, info, error)
      });
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      }
    }
      
    },
    data() {
    return {
     // items: [],
      pageNumber: 1,
      pageSize: 3,
      totalPages: 0,
      maxDisplayedPages: 5
    };
  }
}
</script>
<style>
.sale-product{
  display:flex;
  position: relative;
}
.sale-product .sale{
  position: absolute;
  right:0;
  padding-right:5px;
  z-index:999;
}
.sale-product  p{
  color:red;
}
.sale-product .product-0{
  margin-left: 5px;
  position: absolute;
  z-index:999;
}
</style>