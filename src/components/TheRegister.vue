<template lang="">
    <!-- Contact Start -->
    <div class="container-fluid pt-5">
        <div class="text-center mb-4">
            <h2 class="section-title px-5"><span class="px-2">Đăng kí tài khoản</span></h2>
        </div>
        <div class="row px-xl-5">
            <div class="col-lg-7 mb-5">
                <div class="contact-form">
                    <div id="success"></div>
                    <form name="sentMessage" id="contactForm" novalidate="novalidate" @submit.prevent="submitForm">
                        <div class="control-group">
                            <input type="text" class="form-control" id="name" placeholder="Họ và tên" v-model="name"
                                required="required" data-validation-required-message="Please enter your name" />
                            <p class="help-block text-danger"></p>
                        </div>
                        <div class="control-group">
                            <input type="text" class="form-control" id="password" placeholder="Mật khẩu" v-model="password"
                                required="required" data-validation-required-message="Please enter a subject" />
                            <p class="help-block text-danger"></p>
                        </div>
                        <div class="control-group">
                            <input type="email" class="form-control" id="email" placeholder="Email " v-model="email"
                                required="required" data-validation-required-message="Please enter your email" />
                            <p class="help-block text-danger"></p>
                        </div>
                        <div class="control-group">
                            <input type="text" class="form-control" id="phonenumber" placeholder="Số điện thoại" v-model="phoneNumber"
                                required="required" data-validation-required-message="Please enter a subject" />
                            <p class="help-block text-danger"></p>
                        </div>
                        <div class="control-group">
                            <input type="text" class="form-control" id="address" placeholder="Địa chỉ" v-model="address"
                                required="required" data-validation-required-message="Please enter a subject" />
                            <p class="help-block text-danger"></p>
                        </div>
                       
                        
                        <div>
                            <!-- <router-link to="/login"> -->
                            <button class="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton">Đăng ký</button>
                            <!-- </router-link> -->
                        </div>
                        <div>
                            <p v-if="registrationError" style="color: red;">{{ registrationError }}</p>
                        </div>
                        <p v-if="registrationSuccess" style="color: green;">Đăng ký thành công! Hãy đăng nhập vào tài khoản của bạn.</p>
                        <router-link  class="nav-item nav-link" to="/login" exact><div class="nav-text">Chuyển đến trang đăng nhập</div></router-link>


                    </form>
                </div>
            </div>
            <div class="col-lg-5 mb-5">
               
            </div>
        </div>
    </div>
    <!-- Contact End -->
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
// Import Vue và VueToasted
import Vue from "vue";
import Toasted from "vue-toasted";
Vue.use(Toasted);
export default {
  name: "TheRegister",
  data() {
    return {
      name: "",
      password: "",
      role: "",
      email: "",
      address: "",
      phoneNumber: "",
      // registrationSuccess: false,
      registrationError: "",
      isEmployee: false
    };
  },
  computed: { ...mapGetters(["auth"]) },
  methods: {
    validateEmail(email) {
      // Biểu thức chính quy để kiểm tra định dạng email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    // xác định mật khẩu mạnh cho mật khẩu
    validatePassword(password) {
      // Kiểm tra chiều dài mật khẩu
      if (password.length < 8) {
        return false;
      }

      // Kiểm tra xem mật khẩu có chứa ít nhất một chữ cái thường
      if (!/[a-z]/.test(password)) {
        return false;
      }

      // Kiểm tra xem mật khẩu có chứa ít nhất một chữ cái hoa
      if (!/[A-Z]/.test(password)) {
        return false;
      }

      // Kiểm tra xem mật khẩu có chứa ít nhất một số
      if (!/\d/.test(password)) {
        return false;
      }

      // Kiểm tra xem mật khẩu có chứa khoảng trắng không
      if (/\s/.test(password)) {
        return false;
      }

      return true;
    },
    async submitForm() {
      const formData = {
        name: this.name,
        password: this.password,
        email: this.email,
        role: "User",
        phoneNumber: this.phoneNumber,
        address: this.address
      };
      console.log("dữ liệu đăng kí", formData);
      //validate dữ liệu đăng kí
      if (
        !formData.name ||
        !formData.password ||
        !formData.email ||
        !formData.phoneNumber
      ) {
        // Hiển thị thông báo thành công
        this.$toasted.show(
          "Thông tin tên đăng nhập, mật khẩu, số điện thoại và email không được để trống!",
          {
            duration: 4000, // Thời gian hiển thị thông báo (ms)
            position: "top-right", // Vị trí hiển thị
            type: "error" // Kiểu thông báo (success, info, error)
          }
        );
        return;
      }
      //kiểm tra định dạng email
      if (!this.validateEmail(formData.email)) {
        // Hiển thị thông báo thành công
        this.$toasted.show("Email không đúng định dạng !", {
          duration: 2000, // Thời gian hiển thị thông báo (ms)
          position: "top-right", // Vị trí hiển thị
          type: "error" // Kiểu thông báo (success, info, error)
        });
        return;
      }
      // kiểm tra mật khẩu có mạnh không
      if (!this.validatePassword(formData.password)) {
        // Hiển thị thông báo lỗi
        this.$toasted.show(
          "Mật khẩu phải viết liền có từ 8 kí tự trở lên , có kí tự thường , kí tự in hoa và số !",
          {
            duration: 5000, // Thời gian hiển thị thông báo (ms)
            position: "top-center", // Vị trí hiển thị
            type: "error" // Kiểu thông báo (success, info, error)
          }
        );
        return;
      }

      try {
        // Gọi API đăng ký bằng Axios
         await axios.post(
          "https://localhost:7159/api/Auth/register",
          formData
        );
       
        // Hiển thị thông báo thành công
        this.$toasted.show("Đăng kí tài khoản thành công!", {
          duration: 2000, // Thời gian hiển thị thông báo (ms)
          position: "top-right", // Vị trí hiển thị
          type: "success" // Kiểu thông báo (success, info, error)
        });
      } catch (error) {
        console.error(error);
        console.error("Đăng ký thất bại:", error.response.data);
        this.registrationError = "Tên đăng nhập hoặc mật khẩu không hợp lệ.";
      }
    }
  }
};
</script>
<style lang="">
</style>