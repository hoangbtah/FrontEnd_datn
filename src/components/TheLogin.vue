<template lang="">
   <div class="login">
    <div class="login-container">
        <h1>E SHOPPER</h1>
    <form class="login-form"  @submit.prevent="Login">
      <h5>Đăng Nhập</h5>
      <!-- <div class="input-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div> -->
      <div class="input-group">
        <label for="username">Tên đăng nhập:</label>
        <input type="username" id="username" name="username" required v-model="name">
      </div>
      <div class="input-group">
        <label for="password">Mật khẩu:</label>
        <input type="password" id="password" name="password" required v-model="password">
      </div>
      <div class="forgot-password">
      <p>Quên mật khẩu ?</p>
    </div>
      <button  type="submit">Đăng Nhập</button>
      <div>
        <p v-if="registrationError" style="color: red;">{{ registrationError }}</p>
      </div>
    </form>
   <div class="register">
    <router-link to="/register" ><div><label>Đăng ký tài khoản !</label></div></router-link>
   </div>
    
  </div>
   </div>
</template>
<script>
import axios from 'axios';
import {mapActions,mapGetters} from 'vuex';
export default {
    name:'TheLogin',
    data(){
      return {
        name:'',
        password:'',
        registrationError:''
      };
    },
    created(){
     // this.Login();
    //  this.getUser();
      //this.getCarts();
    },
    computed:{...mapGetters(['auth'])},
    methods:{
      ...mapActions(['getUser','getCarts']),
        async  Login() {
      const formData = {
        name: this.name,
        password: this.password,
      
        // email: this.email,
        // role: this.role
      };

    try{
          // Gọi API đăng ký bằng Axios
     const respone = await axios.post('https://localhost:7159/api/Auth/Login', formData)
        // .then(response => {
        //  console.log('Đăng nhập thành công!');
          // Xử lý phản hồi từ server nếu cần
       //   const token = respone.data;
       //   console.log(respone.data.token);
          // Lưu token vào local storage để sử dụng sau này
          localStorage.setItem('token',  respone.data);
           // this.registrationSuccess=true;
        //  console.log(respone.data);
          this.auth.isEmployee= true;
        
         console.log(this.auth.isAuthenticated);
         // this.auth.name=this.name;
          this.registrationError='';
         await this.getUser(formData);
      //    console.log("userid: ",this.auth.user.userId);
        await  this.getCarts(this.auth.user.userId);
         this.$router.push('/');      
       //  this.auth.isAuthenticated=false;
       
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
.forgot-password p{
  color:red;
  cursor: pointer;
  text-align: center;
}
.register{
  margin-top: 20px;
}
.register label{
  color:#000;
}
</style>