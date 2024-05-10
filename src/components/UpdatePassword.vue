<template lang="">
    <div class="login">
     <div class="login-container">
         <h1>E SHOPPER</h1>
     <div class="login-form" >
       <h5>ĐỔI MẬT KHẨU</h5>
       <div class="input-group">
         <label for="password">Mật khẩu cũ:</label>
         <input class="password-field"
         :type="showPassword ? 'text' : 'password'"
         id="password" name="password" required v-model="oldPassword">
         <span @click="toggleShowPassword" class="toggle-password">
               <i class="fa" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"></i>
             </span>
        </div>     
        <div class="input-group">
         <label for="password">Mật khẩu mới:</label>
         <input class="password-field"
         :type="showPassword ? 'text' : 'password'"
         id="password" name="password" required v-model="newPassword">
         <span @click="toggleShowPassword" class="toggle-password">
               <i class="fa" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"></i>
             </span>
        </div>     
       <div class="input-group">
         <label for="password">Xác nhận mật khẩu mới:</label>
         <input class="password-field"
         :type="showPassword ? 'text' : 'password'"
         id="password" name="password" required v-model="examPassword">
         <span @click="toggleShowPassword" class="toggle-password">
               <i class="fa" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"></i>
             </span>
        </div>     
     </div>
       <button @click="updatePassword()">Cập nhật</button>
     </div>
   </div>
</template>
 <script>
 import axios from 'axios';
import { mapActions, mapGetters } from "vuex";
// Import Vue và VueToasted
import Vue from "vue";
import Toasted from "vue-toasted";
Vue.use(Toasted);
export default {
  name: "UpdatePassword",
  data() {
    return {
      // name:'',
      showPassword:false,
      oldPassword: "",
      newPassword: "",
      examPassword: ""
    };
  },
  created() {},
  computed: { ...mapGetters(["auth"]) },
  methods: {
    ...mapActions(["getUser", "getCarts"]),
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
    async updatePassword() {
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
            // kiểm tra mật khẩu có mạnh không
            if (!this.validatePassword(this.newPassword) ) {
        // Hiển thị thông báo lỗi
        this.$toasted.show("Mật khẩu phải viết liền có từ 8 kí tự trở lên , có kí tự thường , kí tự in hoa và số !", {
          duration: 5000, // Thời gian hiển thị thông báo (ms)
          position: "top-center", // Vị trí hiển thị
          type: "error" // Kiểu thông báo (success, info, error)
        });
        return;
      }
      const formData = {
        username: this.auth.user.name,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };
      console.log("thông tin cập nhật", formData);

      try {
        // Gọi API đăng ký bằng Axios
        const token = localStorage.getItem("token");
        // if(token===null){
        //   token=localStorage.getItem("loginAdmin");
        // }

       const respone =await axios.post('https://localhost:7159/api/Auth/changePassword', formData,
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
            //  localStorage.setItem('token',  respone.data);
                    // Hiển thị thông thành công
            this.$toasted.show(respone.data, {
            duration: 2000, // Thời gian hiển thị thông báo (ms)
            position: "top-center", // Vị trí hiển thị
            type: "success" // Kiểu thông báo (success, info, error)
          });
            this.$router.push('/user');
      } catch (error) {
        console.error(error);
        console.error("Cập nhật thất bại:", error.response.data);
              // Hiển thị thông thành công
              this.$toasted.show( error.response.data, {
            duration: 2000, // Thời gian hiển thị thông báo (ms)
            position: "top-center", // Vị trí hiển thị
            type: "error" // Kiểu thông báo (success, info, error)
          });
        //  this.registrationError =  error.response.data;
      }
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
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
</style>