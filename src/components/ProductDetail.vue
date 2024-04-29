<template lang="">
    <div>
         <!-- Page Header Start -->
    <div class="container-fluid bg-secondary mb-5">
        <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 300px">
            <h1 class="font-weight-semi-bold text-uppercase mb-3">Shop Detail</h1>
            <div class="d-inline-flex">
                <p class="m-0"><a href="">Home</a></p>
                <p class="m-0 px-2">-</p>
                <p class="m-0">Shop Detail</p>
            </div>
        </div>
    </div>
    <!-- Page Header End -->


    <!-- Shop Detail Start -->
    <div class="container-fluid py-5">
        <div class="row px-xl-5">
            <div class="col-lg-5 pb-5">
                <div id="product-carousel" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner border">
                        <div class="carousel-item active">
                            <img class="w-100 h-100" :src="product.Image" alt="Image">
                        </div>
                    
                    </div>
                 
                </div>
            </div>

            <div class="col-lg-7 pb-5">
                <h3 class="font-weight-semi-bold">{{product.ProductName}}</h3>
                <div class="d-flex mb-3">
                    <div class="text-primary mr-2">
                        <small class="fas fa-star"></small>
                        <small class="fas fa-star"></small>
                        <small class="fas fa-star"></small>
                        <small class="fas fa-star-half-alt"></small>
                        <small class="far fa-star"></small>
                    </div>
                    <small class="pt-1">(50 Reviews)</small>
                </div>
                <h3 class="font-weight-semi-bold mb-4">{{formatCurrency(product.Price-product.Price*product.DiscountPercent)}}đ</h3>
                <p class="mb-4">{{product.Decription}}</p>
                <div class="d-flex mb-3">
                    <p class="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
                    <form>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="size-1" name="size">
                            <label class="custom-control-label" for="size-1">10 ml</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="size-2" name="size">
                            <label class="custom-control-label" for="size-2">20 ml</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="size-3" name="size">
                            <label class="custom-control-label" for="size-3">30 ml</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="size-4" name="size">
                            <label class="custom-control-label" for="size-4">50 ml</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="size-5" name="size">
                            <label class="custom-control-label" for="size-5">100 ml</label>
                        </div>
                    </form>
                </div>
                <div class="d-flex mb-4">
                    
                </div>
                <div class="d-flex align-items-center mb-4 pt-2">
                    <div class="input-group quantity mr-3" style="width: 130px;">
                        <div class="input-group-btn">
                            <button class="btn btn-primary btn-minus" >
                            <i class="fa fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" class="form-control bg-secondary text-center" v-model="quantity"
                        @change="updateQuantity(product)"  >
                        <div class="input-group-btn">
                            <button class="btn btn-primary btn-plus">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <button class="btn btn-primary px-3" @click="addToCart(product)"><i class="fa fa-shopping-cart mr-1"></i> Add To Cart</button>
                </div>
                <div class="d-flex pt-2">
                    <p class="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                    <div class="d-inline-flex">
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
                            <i class="fab fa-pinterest"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row px-xl-5">
            <div class="col">
                <div class="nav nav-tabs justify-content-center border-secondary mb-4">
                    <a class="nav-item nav-link active" data-toggle="tab" href="#tab-pane-1">Mô tả</a>
                    <a class="nav-item nav-link" data-toggle="tab" href="#tab-pane-2">Sử dụng và bảo quản</a>
                    <a class="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">Đánh giá {{comments.length}}</a>
                </div>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="tab-pane-1">
                        <h4 class="mb-3">Mô tả sản phẩm</h4>
                        <p>{{product.Description}}</p>
                    </div>
                    <div class="tab-pane fade" id="tab-pane-2">
                        <h4 class="mb-3">Sử dụng và bảo quản</h4>
                      
                        <div class="row">
                            <div class="col-md-6">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item px-0">
                                        Nước hoa mang lại mùi hương cho cơ thể bạn thông qua việc tiếp xúc lên da và phản ứng với hơi ấm trên cơ thể của bạn. Việc được tiếp xúc với các bộ phận như cổ tay, khuỷu tay, sau tai, gáy, cổ trước là những vị trí được ưu tiên hàng đầu trong việc sử dụng nước hoa bởi sự kín đáo và thuận lợi trong việc tỏa mùi hương.
                                    </li>
                                    <li class="list-group-item px-0">
                                        Sau khi sử dụng, xịt nước hoa lên cơ thể, tránh dùng tay chà xát hoặc làm khô da bằng những vật dụng khác, điều này phá vỡ các tầng hương trong nước hoa, khiến nó có thể thay đổi mùi hương hoặc bay mùi nhanh hơn.
                                    </li>
                                    <li class="list-group-item px-0">
                                        Để chai nước hoa cách vị trí cần dùng nước hoa trong khoảng 15-20cm và xịt mạnh, dứt khoát để mật đổ phủ của nước hoa được rộng nhất, tăng độ bám tỏa trên da của bạn.
                                    </li>
                                    <li class="list-group-item px-0">
                                        Phần cổ tay được xịt nước hoa thường có nhiều tác động như lúc rửa tay, đeo vòng, đồng hồ, do đó để đảm bảo mùi hương được duy trì, bạn nên sử dụng nước hoa ở cổ tay ở tần suất nhiều hơn lúc cần thiết.
                                    </li>
                                  </ul> 
                            </div>
                            <div class="col-md-6">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item px-0">
                                        Nước hoa phổ thông (Designer) thường không có hạn sử dụng, ở một số Quốc gia, việc ghi chú hạn sử dụng là điều bắt buộc để hàng hóa được bán ra trên thị trường. Hạn sử dụng ở một số dòng nước hoa được chú thích từ 24 đến 36 tháng, và tính từ ngày bạn mở sản phẩm và sử dụng lần đầu tiên.
                                    </li>
                                    <li class="list-group-item px-0">
                                        Nước hoa là tổng hợp của nhiều thành phần hương liệu tự nhiên và tổng hợp, nên bảo quản nước hoa ở những nơi khô thoáng, mát mẻ, tránh nắng, nóng hoặc quá lạnh, lưu ý không để nước hoa trong cốp xe, những nơi có nhiệt độ nóng lạnh thất thường...
                                    </li>
                                    <!-- <li class="list-group-item px-0">
                                        Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                    </li>
                                    <li class="list-group-item px-0">
                                        Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                                    </li> -->
                                  </ul> 
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tab-pane-3">
                        <div class="row">
                            <div class="col-md-6" >
                                <h4 class="mb-4">Có {{comments.length}} đánh giá cho sản phẩm này</h4>
                               
                                <div class="media mb-4" v-for="comment in comments" :key="comment.CommentId">
                                    <img src="img/user.jpg" alt="Image" class="img-fluid mr-3 mt-1" style="width: 45px;">
                                    <div class="media-body">
                                        <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                                        <div class="text-primary mb-2">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star-half-alt"></i>
                                            <i class="far fa-star"></i>
                                        </div>
                                        <p>{{comment.CommentContent}}</p>
                                    </div>
                                </div>
                            </div>
                           
                            <div class="col-md-6">
                                <h4 class="mb-4">Leave a review</h4>
                                <small>Your email address will not be published. Required fields are marked *</small>
                                <div class="d-flex my-3">
                                    <p class="mb-0 mr-2">Your Rating * :</p>
                                    <div class="text-primary">
                                        <i class="far fa-star"></i>
                                        <i class="far fa-star"></i>
                                        <i class="far fa-star"></i>
                                        <i class="far fa-star"></i>
                                        <i class="far fa-star"></i>
                                    </div>
                                </div>
                                <form>
                                    <div class="form-group">
                                        <label for="message">Your Review *</label>
                                        <textarea id="message" cols="30" rows="5" class="form-control"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="name">Your Name *</label>
                                        <input type="text" class="form-control" id="name">
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Your Email *</label>
                                        <input type="email" class="form-control" id="email">
                                    </div>
                                    <div class="form-group mb-0">
                                        <input type="submit" value="Leave Your Review" class="btn btn-primary px-3">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Shop Detail End -->
      <!-- Products Start -->
      <div class="container-fluid pt-5">
        <div class="text-center mb-4">
            <h2 class="section-title px-5"><span class="px-2">CÓ THỂ BẠN CŨNG THÍCH</span></h2>
        </div>
        <div class="row px-xl-5 pb-3">
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1"  v-for="product in products.slice(0,4)" :key="product.ProductId">
                <div class="card product-item border-0 mb-4">
                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img class="img-fluid w-100" :src="product.Image" alt="">
                    </div>
                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h7 class="text-truncate mb-3">{{product.ManufactorerName}}</h7>
                        <h6 class="text-truncate mb-3">{{product.ProductName}}</h6>
                        <div class="d-flex justify-content-center">
                            <h6>{{formatCurrency(product.Price)}}VNĐ</h6>
                            <!-- <h6 class="text-muted ml-2"><del>$123.00</del></h6> -->
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
    </div>
</template>
<script>
import { mapActions ,mapGetters} from 'vuex';
//import axios from "axios";
// Import Vue và VueToasted
import Vue from "vue";
import Toasted from "vue-toasted";

// Sử dụng VueToasted với Vue
Vue.use(Toasted);
export default {
    name:'ProductDetail',
    created() {
        this.getProducts();
        //lấy sản phẩm
        const storedProduct = localStorage.getItem('selectedProduct');
    
    if (storedProduct) {
      // Nếu đã lưu sản phẩm trong Local Storage, sử dụng nó
      this.$store.commit('SET_PRODUCT', JSON.parse(storedProduct));
    } else {
      // Nếu chưa có, gọi API để lấy sản phẩm
      this.getProduct(this.product.productId);
    }
    //lấy comment sản phẩm 
    const commentedProduct = localStorage.getItem('commentsProduct');
    
    if (commentedProduct) {
      // Nếu đã lưu sản phẩm trong Local Storage, sử dụng nó
      this.$store.commit('SET_COMMENTS', JSON.parse(commentedProduct));
    } else {
      // Nếu chưa có, gọi API để lấy sản phẩm
      this.getComments(this.product.productId);
    }

    },
    computed:{...mapGetters(["product",'comments','products','auth'])},
  
    methods:{
        ...mapActions(["getProduct",'getProducts','getComments','addProductToCart']),
    //     goToShoppingCart() {
    // console.log("get");
    //     // this.$router.push('/productdetail');
    //     // Cuộn đến đầu trang sau khi trang được tải hoàn toàn
    //     this.$nextTick(() => {
    //         window.scrollTo(0, 0);
    //     });
    // },
    handleProductClick(productId) {
        this.getProduct(productId);
        this.getComments(productId);
     //   this.goToShoppingCart();
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
    async addToCart(product) {
        console.log("sản phẩm thêm vào giỏ",product);
      const formData = {
        productId: product.ProductId,
        userId: this.auth.user.userId,
        productName: product.ProductName,
        image: product.Image,
        quantity: product.Quantity,
       // price: this.formatCurrency(product.Price-product.Price*product.DiscountPercent)
       price:product.Price-product.Price*product.DiscountPercent
      };
      console.log("product add to cart");
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
        this.$toasted.show("Thêm sản phẩm vào giỏ hàng thành công!", {
          duration: 2000, // Thời gian hiển thị thông báo (ms)
          position: "top-center", // Vị trí hiển thị
          type: "success" // Kiểu thông báo (success, info, error)
        });
      } catch (error) {
        // Hiển thị thông báo lỗi
        this.$toasted.show(error.response.data, {
          duration: 2000, // Thời gian hiển thị thông báo (ms)
          position: "top-center", // Vị trí hiển thị
          type: "error" // Kiểu thông báo (success, info, error)
        });
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      }
    },
       // Cập nhật số lượng sản phẩm trước khi thêm vào giỏ hàng
       async updateQuantity(product) {
      try {
        /// tạo 1 bản sao của product  khi thay đôi update nó 
        const updatedCart = { ...product };
        console.log("product input")
        console.log(updatedCart);
        await this.updateCart(updatedCart);
        console.log("Đã cập nhật số lượng trên máy chủ!");
          // Hiển thị thông báo thành công
      this.$toasted.show('Cập nhật số lượng thành công !', {
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
    }}},
    data() {
    return {
    quantity:1
    };
  }
   
}
</script>
<style lang="">
    
</style>