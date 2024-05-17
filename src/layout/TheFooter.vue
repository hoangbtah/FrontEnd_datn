<template lang="">
    <div>
    <!-- Footer Start -->
    <div class="container-fluid bg-secondary text-dark mt-5 pt-5">
        <div class="row px-xl-5 pt-5">
            <div class="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                <a href="" class="text-decoration-none">
                    <h1 class="mb-4 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border border-white px-3 mr-1">E</span>Shopper</h1>
                </a>
                <p>Nơi mùi hương là
                bạn đồng hành</p>
                <p class="mb-2"><i class="fa fa-map-marker-alt text-primary mr-3"></i> Tầng 7, 19A Cộng Hòa, Tòa Nhà Scetpa, Phường 12, Quận Tân Bình, TP. Hồ Chí Minh</p>
                <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>info@example.com</p>
                <p class="mb-0"><i class="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890</p>
            </div>
            <div class="col-lg-8 col-md-12">
                <div class="row">
                    <div class="col-md-4 mb-5">
                        <h5 class="font-weight-bold text-dark mb-4">Quick Links</h5>
                        <div class="d-flex flex-column justify-content-start">
                            <a class="text-dark mb-2" href="index.html"><i class="fa fa-angle-right mr-2"></i>Home</a>
                            <a class="text-dark mb-2" href="shop.html"><i class="fa fa-angle-right mr-2"></i>Our Shop</a>
                            <a class="text-dark mb-2" href="detail.html"><i class="fa fa-angle-right mr-2"></i>Shop Detail</a>
                            <a class="text-dark mb-2" href="cart.html"><i class="fa fa-angle-right mr-2"></i>Shopping Cart</a>
                            <a class="text-dark mb-2" href="checkout.html"><i class="fa fa-angle-right mr-2"></i>Checkout</a>
                            <a class="text-dark" href="contact.html"><i class="fa fa-angle-right mr-2"></i>Contact Us</a>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <h5 class="font-weight-bold text-dark mb-4">Hỗ trợ</h5>
                        <div class="d-flex flex-column justify-content-start">
                            <a class="text-dark mb-2" href="index.html"><i class="fa fa-angle-right mr-2"></i>Các câu hỏi thường gặp</a>
                            <a class="text-dark mb-2" href="shop.html"><i class="fa fa-angle-right mr-2"></i>Cách thức mua hàng</a>
                            <a class="text-dark mb-2" href="detail.html"><i class="fa fa-angle-right mr-2"></i>Hướng dẫn đặt hàng</a>
                            <a class="text-dark mb-2" href="cart.html"><i class="fa fa-angle-right mr-2"></i>Phương thức vận chuyển</a>
                            <a class="text-dark mb-2" href="checkout.html"><i class="fa fa-angle-right mr-2"></i>Chính sách giá cả</a>
                            <a class="text-dark" href="contact.html"><i class="fa fa-angle-right mr-2"></i>Chính sách đổi trả</a>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <h5 class="font-weight-bold text-dark mb-4">News letter</h5>
                        <form action="">
                            <div class="form-group">
                                <input type="text" class="form-control border-0 py-4" placeholder="Your Name" required="required" />
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control border-0 py-4" placeholder="Your Email"
                                    required="required" />
                            </div>
                            <div>
                                <button class="btn btn-primary btn-block border-0 py-3" type="submit">Subscribe Now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="row border-top border-light mx-xl-5 py-4">
            <div class="col-md-6 px-xl-0">
                <!-- <p class="mb-md-0 text-center text-md-left text-dark">
                    &copy; <a class="text-dark font-weight-semi-bold" href="#">Your Site Name</a>. All Rights Reserved. Designed
                    by
                    <a class="text-dark font-weight-semi-bold" href="https://htmlcodex.com">HTML Codex</a>
                </p> -->
            </div>
            <div class="col-md-6 px-xl-0 text-center text-md-right">
                <!-- <img class="img-fluid" src="img/payments.png" alt=""> -->
            </div>
        </div>
    </div>
    <!-- Footer End -->
    <a href="#" class="btn btn-primary back-to-top" @click="backToTop"><i class="fa fa-angle-double-up"></i></a>

    </div>

</template>
<script>
export default {
  name: "TheFooter",
  //     mounted() {
  //     window.addEventListener('scroll', this.handleScroll);
  //   },
  //   beforeDestroy() {
  //     window.removeEventListener('scroll', this.handleScroll);
  //   },
  methods: {
    backToTop($) {
      // Back to top button
      $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
          $(".back-to-top").fadeIn("slow");
        } else {
          $(".back-to-top").fadeOut("slow");
        }
      });
      $(".back-to-top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 3000, "easeInOutExpo");
        return false;
      });
    }
    // handleScroll() {
    //   const backToTopButton = this.$el.querySelector('.back-to-top');
    //   if (window.scrollY > 100) {
    //     backToTopButton.style.display = 'block';
    //   } else {
    //     backToTopButton.style.display = 'none';
    //   }
    // },
    // backToTop() {
    //   window.scrollTo({
    //     top: 0,
    //     behavior: 'smooth'
    //   });
    // }
  }
};
</script>
<style lang="">
</style>