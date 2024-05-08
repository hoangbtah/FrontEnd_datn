<template >
      <!-- Contact Start -->
      <div class="container-fluid pt-5">
        <div class="text-center mb-4">
            <h4>Chỉnh sửa thông tin tài khoản</h4>
        </div>
        <div class="row px-xl-5">
            <div class="col-lg-7 mb-5">
                <div class="contact-form">
                    <div id="success"></div>
                    <div >
                        <div class="control-group">
                            <label for="username">Tên đăng nhập:</label>
                            <input type="text" class="form-control" id="name" placeholder="Họ và tên" v-model="auth.user.name"
                                required="required" data-validation-required-message="Please enter your name" />
                            <p class="help-block text-danger"></p>
                        </div>
                       
                        <div class="control-group">
                            <label for="username">Email:</label>
                            <input type="email" class="form-control" id="email" placeholder="Email" v-model="auth.user.email"
                                required="required" data-validation-required-message="Please enter your email" />
                            <p class="help-block text-danger"></p>
                        </div>
                        <div class="control-group">
                            <label for="username">Số điện thoại:</label>
                            <input type="text" class="form-control" id="phonenumber" placeholder="Số điện thoại" v-model="auth.user.phoneNumber"
                                required="required" data-validation-required-message="Please enter a subject" />
                            <p class="help-block text-danger"></p>
                        </div>
                        <div class="control-group">
                            <label for="username">Địa chỉ:</label>
                            <input type="text" class="form-control" id="address" placeholder="Địa chỉ" v-model="auth.user.address"
                                required="required" data-validation-required-message="Please enter a subject" />
                            <p class="help-block text-danger"></p>
                        </div>
                        <div>
                            <button class="btn btn-primary py-2 px-4" @click="btnUpdateUser()">Cập nhật thông tin</button>
                            <button class="btn btn-primary py-2 px-4" style="margin-left:10px" @click="btnUpdatePassword()">Đổi mật khẩu</button>
                        </div>
                       

                    </div>
                </div>
            </div>
           
        </div>
    </div>
    <!-- Contact End -->
</template>
  <script>
  import { mapActions, mapGetters } from "vuex";
  
  // import axios from "axios";
  export default {
  name: "UpdateUser",
  components:{},
  computed: {
   ...mapGetters(["auth"])
   
   
  },
  created() {
  
  },
  methods: {
   ...mapActions([]),
   
  
  },
  data() {
   return {
    
   };
  }
  };
  </script>
  <style>
  @import url("../../../../assets_ad/css_ad/layout/content.css");
  @import url("../../../../assets_ad/css_ad/page/employ.css");
  @import url("../../../../assets_ad/css_ad/component/page.css");
  </style>