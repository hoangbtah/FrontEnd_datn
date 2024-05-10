<template lang="">
    <div class="login">
     <div class="login-container">
        
     <div class="login-form" >
       <h5>Quên Mật Khẩu</h5>
       <div class="input-group">
         <label for="username">Nhập tài khoản Email của bạn khi đăng kí tài khoản:</label>
         <input type="username" id="username" name="username" required v-model="email">
       </div>
      
       
       <button @click="btnSendPassword()">Gửi Thông Tin</button>
       <div>
         <p v-if="emailError" style="color: red;">{{ emailError }}</p>
         <p v-if="emailDone" style="color: blue;">{{ emailDone }}</p>
       </div>
     </div>
    <div class="register">
     <router-link to="/login" ><div><label style="cursor:pointer">Chuyển đến trang đăng nhập</label></div></router-link>
    </div>
    

   </div>
   <!-- <loading :active="isLoading" :can-cancel="false"> -->
    <div class="custom-loading" v-if="isLoading">
  <div class="spinner"></div>
</div>

   <!-- </loading> -->
    </div>
</template>
 <script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
// import Loading from "vue-loading-overlay";
// import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "ForgotPassword",
  components: {
    // Loading
  },
  data() {
    return {
      email: "",
      emailError: "",
      emailDone: "",
      isLoading: false
    };
  },
  created() {},
  computed: { ...mapGetters(["auth"]) },
  methods: {
    ...mapActions(["getUser", "getCarts"]),
    // kiểm tra định dạng email
    validateEmail(email) {
      // Biểu thức chính quy để kiểm tra định dạng email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    async Login() {
      const formData = {
        name: this.name,
        password: this.password
      };

      try {
        // Gọi API đăng ký bằng Axios
        const respone = await axios.post(
          "https://localhost:7159/api/Auth/Login",
          formData
        );
        // Lưu token vào local storage để sử dụng sau này
        localStorage.setItem("token", respone.data);
        this.auth.isEmployee = true;
        this.emailError = "";
        await this.getUser(formData);
        await this.getCarts(this.auth.user.userId);
        this.$router.push("/");
      } catch (error) {
        console.error(error);
        console.error("Đăng nhập thất bại:", error.response.data);
        this.emailError = error.response.data;
      }
    },

    // gửi mật khẩu mới khi người dùng quên mật khẩu
    async btnSendPassword() {
      // Khi bắt đầu gửi yêu cầu, thiết lập isLoading thành true
      this.isLoading = true;
      console.log("trạng thái loading ",this.isLoading )
      const formData = {
        email: this.email
      };
      //kiểm tra định dạng email
      if (!this.validateEmail(formData.email)) {
        this.emailError = "Tài khoản Email không đúng định dạng !";
        // Khi gặp lỗi, dừng loading
        this.isLoading = false;
      console.log("trạng thái loading ",this.isLoading )
        return;
      }
      try {
        const response = await axios.post(
          "https://localhost:7159/api/Auth/forgotPassword",
          formData
        );
        this.emailError = "";
        this.emailDone = response.data;
      } catch (error) {
        console.log("lỗi");
        this.emailDone = "";
        this.emailError = error.response.data;
        console.log(this.emailError);
      }
      // Sau khi nhận được kết quả, dừng loading
      this.isLoading = false;
      console.log("trạng thái loading ",this.isLoading )

    }
  }
};
</script>
 <style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  margin: 0;
}
.login-container {
  width: 500px;
}

h1 {
  text-align: center;
  margin-top: 20px;
  color: #d19c97;
}
h5 {
  text-align: center;
  margin-top: 50px;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #d19c97;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.forgot-password p {
  color: red;
  cursor: pointer;
  text-align: center;
}
.register {
  margin-top: 20px;
}
.register label {
  color: #000;
}
.toggle-password {
  position: absolute;
  top: 50px;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}

/* Điều chỉnh biểu tượng mắt */
.toggle-password i {
  font-size: 18px;
  color: #2b2727;
}
.custom-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-left-color: #d55e5e;
  border-radius: 50%;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style>