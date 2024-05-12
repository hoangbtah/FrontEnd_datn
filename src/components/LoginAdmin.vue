<template>
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
         <!-- <div class="password-input"> -->
         <input class="password-field"
         :type="showPassword ? 'text' : 'password'"
         id="password" name="password" required v-model="password">
         <span @click="toggleShowPassword" class="toggle-password">
               <i class="fa" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"></i>
             </span>
             <!-- </div> -->
        </div>     
       <div class="forgot-password">
       <p @click="btnForgotPassword()">Quên mật khẩu ?</p>
     </div>
       <button  type="submit">Đăng Nhập</button>
       <div>
         <p v-if="registrationError" style="color: red;">{{ registrationError }}</p>
       </div>
     </form>
    <!-- <div class="register">
     <router-link to="/register" ><div><label>Đăng ký tài khoản !</label></div></router-link>
    </div> -->
     
   </div>
    </div>
</template>
 <script>
 import axios from 'axios';
 import {mapActions,mapGetters} from 'vuex';
 export default {
     name:'LoginAdmin',
     data(){
       return {
         name:'',
         password:'',
         registrationError:'',
         showPassword:false
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
         password: this.password.trim(),
       
       };
 
     try{
           // Gọi API đăng ký bằng Axios
      const respone = await axios.post('https://localhost:7159/api/Auth/Login', formData)
       
          //  localStorage.setItem('loginAdmin',  respone.data);
          localStorage.setItem('token',  respone.data);
        
           this.auth.isEmployee= true;
         
          console.log(this.auth.isAuthenticated);
          // this.auth.name=this.name;
           this.registrationError='';
          await this.getUser(formData);
       //    console.log("userid: ",this.auth.user.userId);
         await  this.getCarts(this.auth.user.userId);
          this.$router.push('/adminindex');      
        //  this.auth.isAuthenticated=false;
        
     }
     catch (error) {
         console.error(error);
         console.error('Đăng nhập thất bại:', error.response.data);
           this.registrationError =  error.response.data;
       }
     },
     toggleShowPassword() {
       this.showPassword = !this.showPassword;
     },
     btnForgotPassword(){
      this.$router.push('forgotpasswordadmin');      
    }
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