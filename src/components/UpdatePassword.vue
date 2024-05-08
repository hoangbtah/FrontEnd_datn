<template lang="">
    <div class="login">
     <div class="login-container">
         <h1>E SHOPPER</h1>
     <div class="login-form" >
       <h5>ĐỔI MẬT KHẨU</h5>
       <!-- <div class="input-group">
         <label for="username">Mật khẩu cũ:</label>
         <input type="username" id="username" name="username" required v-model="name">
       </div>
       <div class="input-group">
         <label for="username">Mật khẩu mới:</label>
         <input type="username" id="username" name="username" required v-model="name">
       </div> -->
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
 import {mapActions,mapGetters} from 'vuex';
 
 export default {
     name:'UpdatePassword',
     data(){
       return {
         oldPassword:'',
         newPassword:'',
         examPassword:''
       };
     },
     created(){
     },
     computed:{...mapGetters(['auth'])},
     methods:{
       ...mapActions(['getUser','getCarts']),
         async  updatePassword() {
            // kiểm tra mật khẩu mới và mật khẩu xác nhận
            if(this.newPassword !== this.examPassword)
            {

            }
       const formData = {
         
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
           // Lưu token với key dựa trên định danh của người dùng
           // sessionStorage.setItem(`token_${formData.name}`, respone.data);
 
           this.auth.isEmployee= true;
           this.registrationError='';
          await this.getUser(formData);
         await  this.getCarts(this.auth.user.userId);
          this.$router.push('/user');      
        
     }
     catch (error) {
         console.error(error);
         console.error('Đăng nhập thất bại:', error.response.data);
           this.registrationError =  error.response.data;
       }
     },
     toggleShowPassword() {
       this.showPassword = !this.showPassword;
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