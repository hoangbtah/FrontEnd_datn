<template lang="">
   <div class="login">
    <div class="login-container">
        <h1>E SHOPPER</h1>
    <form class="login-form"  @submit.prevent="Login">
      <h5>Đăng nhập</h5>
      <!-- <div class="input-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div> -->
      <div class="input-group">
        <label for="username">Tên đăng nhập:</label>
        <input type="username" id="username" name="username" required v-model="username">
      </div>
      <div class="input-group">
        <label for="password">Mật khẩu:</label>
        <input type="password" id="password" name="password" required v-model="password">
      </div>
      <button  type="submit">Đăng nhập</button>
      <div>
        <p v-if="registrationError" style="color: red;">{{ registrationError }}</p>
      </div>
    </form>
    
  </div>
   </div>
</template>
<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
export default {
    name:'TheLogin',
    data(){
      return {
        username:'',
        password:'',
        registrationError:''
      };
    },
    computed:{...mapGetters(['auth'])},
    methods:{
        async  Login() {
      const formData = {
        username: this.username,
        password: this.password,
        // email: this.email,
        // role: this.role
      };

    try{
          // Gọi API đăng ký bằng Axios
     const respone = await axios.post('https://localhost:7043/api/Auth/Login', formData)
        // .then(response => {
          console.log('Đăng nhập thành công!');
          // Xử lý phản hồi từ server nếu cần
          const token = respone.data;
       //   console.log(respone.data.token);
          // Lưu token vào local storage để sử dụng sau này
          localStorage.setItem('token', token);
           // this.registrationSuccess=true;
          console.log(respone.data);
          this.auth.isEmployee= true;
          this.auth.isAuthenticated=false;
          this.auth.username=this.username;
          this.registrationError='';
         this.$router.push('/shoppingcart');

        
    }     
    catch (error) {
        console.error(error);
        console.error('Đăng nhập thất bại:', error.response.data);
          this.registrationError = 'Tên đăng nhập hoặc mật khẩu không đúng.';
      }
    },
    }
}
</script>
<style scoped>
.login{
    display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  margin: 0;
}
    .login-container {
  width: 500px;
 
}

h1{
    text-align: center;
    margin-top:20px;
    color: #D19C97;
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
  background-color: #D19C97;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>