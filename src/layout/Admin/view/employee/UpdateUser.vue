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

import axios from "axios";
export default {
  name: "UpdateUser",
  components: {},
  computed: {
    ...mapGetters(["auth"])
  },
  created() {},
  methods: {
    ...mapActions([]),
    // kiểm tra định dạng email
    validateEmail(email) {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
    ///cập nhật mật khẩu người dùng
    btnUpdatePassword() {
      this.$router.push("/updatepassword");
    },
    async btnUpdateUser() {
      // kiểm tra mật khẩu mới và mật khẩu xác nhận
      if (this.newPassword !== this.examPassword) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Mật khẩu không khớp!", {
          duration: 4000, // Thời gian hiển thị thông báo (ms)
          position: "top-center", // Vị trí hiển thị
          type: "error" // Kiểu thông báo (success, info, error)
        });
        return;
      }
      const formData = {
        userId: this.auth.user.userId,
        name: this.auth.user.name,
        email: this.auth.user.email,
        address: this.auth.user.address,
        passwordHash: this.auth.user.passwordHash,
        passwordSalt: this.auth.user.passwordSalt,
        role: this.auth.user.role,
        phoneNumber: this.auth.user.phoneNumber,
        active: this.auth.user.active
      };
      console.log("thông tin cập nhật", formData);
      //validate dữ liệu đăng kí
      if (!formData.name || !formData.email || !formData.phoneNumber) {
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
        this.$toasted.show(
          "Email không đúng định dạng !",
          {
            duration: 2000, // Thời gian hiển thị thông báo (ms)
            position: "top-right", // Vị trí hiển thị
            type: "error" // Kiểu thông báo (success, info, error)
          }
        );
        return;
      }
      try {
        // Gọi API đăng ký bằng Axios
        // const token = localStorage.getItem("token");

        await axios.put(
          `https://localhost:7159/api/v1/User/${formData.userId}`,
          formData
        );
        // {
        //     headers: {
        //       Authorization: `Bearer ${token}`
        //     }
        //   }
        // )
        //  localStorage.setItem('token',  respone.data);
        // Hiển thị thông thành công
        this.$toasted.show("Cập nhật thành công", {
          duration: 2000, // Thời gian hiển thị thông báo (ms)
          position: "top-center", // Vị trí hiển thị
          type: "success" // Kiểu thông báo (success, info, error)
        });
        // this.$router.push('/user');
      } catch (error) {
        console.error(error);
        console.error("Cập nhật thất bại:", error.response.data);
        // Hiển thị thông thành công
        this.$toasted.show("Cập nhật thất bại", {
          duration: 2000, // Thời gian hiển thị thông báo (ms)
          position: "top-center", // Vị trí hiển thị
          type: "error" // Kiểu thông báo (success, info, error)
        });
        //  this.registrationError =  error.response.data;
      }
    }
  },
  data() {
    return {};
  }
};
</script>
  <style>
@import url("../../../../assets_ad/css_ad/layout/content.css");
@import url("../../../../assets_ad/css_ad/page/employ.css");
@import url("../../../../assets_ad/css_ad/component/page.css");
</style>