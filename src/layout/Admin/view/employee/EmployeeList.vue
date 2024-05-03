<template>
     <div class="page-content">
            <div class="m-page-header">
                <div class="m-page-title">Thông tin tài khoản</div>
                <div class="m-page-button">
                    <button id="btn-add" class="m-btn ">Thêm mới tài khoản</button>
                </div>
            </div>
            <div class="m-page-toolbar">
                <div class="m-toolbar-left">
                    <input id="txtSearch" class="m-input m-btn-icon-right m-icon-search" placeholder="Tìm theo tên " style="width: 200px;"/>
                </div>
                <div class="m-toolbar-right">
                    <button id="reload" class="m-icon-refresh"></button>
                </div>
            </div>
            <div class="m-page-grid">
                    <div class="m-grid">
                        <table id="tblEmployee" class="m-table">
                            <thead>
                             <tr>
                                <th>Stt</th>
                                 <th class="m-employee-name">Họ và tên</th>
                                 <th class="m-gender">Email</th>
                                 <th class="m-dateOfbrith">Địa chỉ</th>
                                 <th class="m-account">Số điện thoại</th>
                                 <th class="m-option">Chức vụ</th>
                                 <th class="m-bank-name">Trạng thái </th>
                                <th>Chức năng</th>
                             </tr>       
                            </thead>     
                            <tbody v-for="(user,index) in items" :key="user.userId">
                               <tr>
                                <td>{{ index+1 }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.address }}</td>
                                <td>{{ user.phoneNumber }}</td>
                                <td>{{ user.role }}</td>
                                <td v-if="user.active===1">Đang hoạt động</td>
                                <td v-if="user.active==0">Đang khóa</td>
                                <td>
                                    <button class="m-btn-option btn-info" v-if="user.active===1" @click="btnUpdateUser(user)">Khóa</button>
                                    <button class="m-btn-option btn-warning" v-if="user.active===0" @click="btnUpdateUser(user)">Mở khóa</button>
                                </td>
                               </tr>
                            </tbody>
                            </table>
                    </div>
                   
                    <div class="m-page-paging">
                        <div class="m-page-left">
                            <label>Tổng số {{ items.length }} người dùng</label>
                        </div>
                        <div class="m-page-right">
                            <!-- <div class="m-number-page">
                               
                            </div>
                            <div class="m-number">
                                <button >Trước</button>
                                <button class="m-page-selected">1</button>
                            <button >2</button>
                            <button >3</button>
                            <button >4</button>
                            <button >Sau</button>
                            </div> -->
                           
                        </div>
                    </div>   
            </div>
         
              
          
        </div>
</template>
<script>
import axios from "axios";
import { mapActions ,mapGetters} from 'vuex';
// Import Vue và VueToasted
import Vue from 'vue';
import Toasted from 'vue-toasted';

// Sử dụng VueToasted với Vue
Vue.use(Toasted);
export default {
    name:'EmployeeList',
    computed:{...mapGetters(['product','comments','products'])},
    created() {
        // this.getProduct() 
        this.getUser();   
    },
    methods:{
        ...mapActions(['getProduct','getProducts','getComments']),
      async  getUser(){
        try{
             const respone= await axios.get("https://localhost:7159/api/v1/User");
             console.log("lấy người dùng thành công");
             this.items= respone.data;
        }
        catch(error)
        {
            console.log("lấy người dùng thất bại");
        }
        },
      async  btnUpdateUser(user){
        if(user.active===1)
        {
            user.active=0;
        }
        else{
            user.active=1;
        }
        // const formData={
        //     userId:user.userId,
        //     name:user.name,
        //     email:user.email,
        //     address:user.address,
        //     passwordHash:user.passwordHash,
        //     passwordSalt:user.passwordSalt,
        //     role:user.role,
        //     phoneNumber:user.phoneNumber,
            
        // };
        try{
            await axios.put(`https://localhost:7159/api/v1/User/${user.userId}`,user);
            console.log("chuyển trạng thái thành công");
                // Hiển thị thông báo thành công
      this.$toasted.show('Cập nhật  thành công !', {
        duration: 2000, // Thời gian hiển thị thông báo (ms)
        position: 'top-center', // Vị trí hiển thị
        type: 'success' // Kiểu thông báo (success, info, error)

        });
    }
        catch(error){
            console.log("lỗi khi sửa");
            // Hiển thị thông báo thành công
      this.$toasted.show('Cập nhật thất bại !', {
        duration: 2000, // Thời gian hiển thị thông báo (ms)
        position: 'top-center', // Vị trí hiển thị
        type: 'error' // Kiểu thông báo (success, info, error)

        });
        }
        }
    },
    data(){
        return {
            items:[],
        }
    }
}
</script>
<style>
@import url("../../../..//assets_ad/css_ad/layout/content.css");
@import url('../../../../assets_ad/css_ad/page/employ.css');
@import url('../../../../assets_ad/css_ad/component/page.css');
.m-btn-option{
    width:70px;
}
</style>