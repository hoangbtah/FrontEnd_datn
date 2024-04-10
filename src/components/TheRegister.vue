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
                            <input type="email" class="form-control" id="email" placeholder="Email "
                                required="required" data-validation-required-message="Please enter your email" />
                            <p class="help-block text-danger"></p>
                        </div>
                        <div class="control-group">
                            <input type="text" class="form-control" id="phonenumber" placeholder="Số điện thoại"
                                required="required" data-validation-required-message="Please enter a subject" />
                            <p class="help-block text-danger"></p>
                        </div>
                        <div class="control-group">
                            <input type="text" class="form-control" id="password" placeholder="Mật khẩu" v-model="password"
                                required="required" data-validation-required-message="Please enter a subject" />
                            <p class="help-block text-danger"></p>
                        </div>
                        <!-- <div class="control-group">
                            <textarea class="form-control" rows="6" id="message" placeholder="Message"
                                required="required"
                                data-validation-required-message="Please enter your message"></textarea>
                            <p class="help-block text-danger"></p>
                        </div> -->
                         <!-- Hiển thị trường chọn vai trò nếu là nhân viên -->
                        <div v-if="auth.isEmployee">
                            <label for="role">Vai trò:</label>
                            <select v-model="role">
                            <option value="Admin">Quản trị viên</option>
                            <option value="Sales">Nhân viên bán hàng</option>
                            <option value="Technician">Kỹ thuật viên</option>
                            </select>
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
                <h5 class="font-weight-semi-bold mb-3">Get In Touch</h5>
                <p>Justo sed diam ut sed amet duo amet lorem amet stet sea ipsum, sed duo amet et. Est elitr dolor elitr erat sit sit. Dolor diam et erat clita ipsum justo sed.</p>
                <div class="d-flex flex-column mb-3">
                    <h5 class="font-weight-semi-bold mb-3">Store 1</h5>
                    <p class="mb-2"><i class="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New York, USA</p>
                    <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>info@example.com</p>
                    <p class="mb-2"><i class="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890</p>
                </div>
                <div class="d-flex flex-column">
                    <h5 class="font-weight-semi-bold mb-3">Store 2</h5>
                    <p class="mb-2"><i class="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New York, USA</p>
                    <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>info@example.com</p>
                    <p class="mb-0"><i class="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Contact End -->
</template>
<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
export default {
    name:'TheRegister',
    data(){
        return {
            name:'',
            password:'',
            role:'',
            registrationSuccess: false,
            registrationError: '',
            isEmployee: false,
        };
    },
    computed:{...mapGetters(['auth'])},
    methods:{
        async  submitForm() {
      const formData = {
        name: this.name,
        password: this.password,
        // email: this.email,
        role: this.role
      };

    try{
          // Gọi API đăng ký bằng Axios
     const respone = await axios.post('https://localhost:7043/api/Auth/register', formData)
        // .then(response => {
          console.log('Đăng ký thành công!');
          // Xử lý phản hồi từ server nếu cần
            this.registrationSuccess=true;
          console.log(respone.data);
         // this.$router.push('/login');
    }     
    catch (error) {
        console.error(error);
        console.error('Đăng ký thất bại:', error.response.data);
          this.registrationError = 'Tên đăng nhập hoặc mật khẩu không hợp lệ.';
      }
    },
    }
}
</script>
<style lang="">
    
</style>