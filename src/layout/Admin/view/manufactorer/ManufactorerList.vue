<template >
    <div class="page-content">
           <div class="m-page-header">
               <div class="m-page-title">Quản lý hãng sản xuất</div>
               <div class="m-page-button">
                   <button id="btn-add" class="m-btn" @click="btnAddClick()">Thêm mới</button>
               </div>
           </div>
           <div class="m-page-toolbar">
               <!-- <div class="m-toolbar-left">
                   <input id="txtSearch" class="m-input m-btn-icon-right m-icon-search" v-model="searchKey" placeholder="Tìm theo tên" style="width: 200px;"/>
               </div>
               <div class="m-toolbar-right">
                   <button @click="getSearchProduct(searchKey)" class="m-icon-refresh"></button>
               </div> -->
           </div>
           <div class="m-page-grid">
                   <div class="m-grid">
                       <table id="tblEmployee" class="m-table">
                           <thead>
                            <tr>
                             <th>STT</th>
                              
                                <th class="m-employee-name">TÊN THƯƠNG HIỆU</th>
                                <!-- <th class="m-gender">GIÁ BÁN</th>
                                <th class="m-gender">SỐ LƯỢNG</th>
                                <th class="m-position">LOẠI SẢN PHẨM</th>
                                <th class="m-department-name">HÃNG SẢN XUẤT</th>
                                <th class="m-account">HÌNH ẢNH</th> -->
                                <th class="m-option">CHỨC NĂNG</th>
                            </tr>       
                           </thead>     
                           <tbody>
                               <tr v-for="(manufactorer,index) in manufactorers" :key="manufactorer.manufactorerId">
                                   <td>{{ index+1 }}</td>
                                   <td>{{ manufactorer.manufactorerName }}</td>
                                   <!-- <td>{{ formatCurrency(productad.Price) }} đ</td>
                                   <td>{{ productad.Quantity }}</td>
                                   <td>{{ productad.CatagoryName }}</td>
                                   <td>{{ productad.ManufactorerName }}</td>
                                   <td> <img class="" style="width:80px;height:80px" :src="productad.Image" alt=""></td>
                                    -->
                                   <!-- <td></td> -->
                                   <td>
                                      <div class="m-option">
                                       <button class="m-btn-option m-btn-de btn-info"  @click="btnDetailClick(manufactorer.manufactorerId)">Chi tiết</button>
                                       <button class="m-btn-option m-btn-ud btn-warning" @click="btnUpdateClick(manufactorer.manufactorerId)">Sửa</button>
                                       <button class="m-btn-option m-btn-ud  btn-danger" @click="btnDelete(manufactorer.manufactorerId)">Xóa</button>
                                       
                                      </div>
                                   </td>
                               </tr>
                           </tbody>
                           </table>
                   </div>
                  
                   <div class="m-page-paging">
                       <div class="m-page-left">
                           <label>Tổng số : {{manufactorers.length}} thương hiệu</label>
                       </div>
                       <div class="m-page-right">
                           <div class="m-number-page">
                             
                           </div>
                         
                          
                       </div>
                   </div>   
           </div>
          <ManufactorerDetail :forMode="forModeManufactorer"/>
          <DialogDeleteManufactorer/>
    </div>
                   
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// import axios from "axios";
import ManufactorerDetail from './ManufactorerDetail';
import DialogDeleteManufactorer from "../../../../components/DialogDeleteManufactorer";
export default {
  name: "ManufactorerList",
  components: {ManufactorerDetail,DialogDeleteManufactorer},

  computed: {
    ...mapGetters(["manufactorers","isShowManufactorer","manufactorer"])
  },
  watch:{
    manufactorer(){
    this.getManufactorers();
    },
    manufactorers(){
    this.getManufactorers();
    },
  },
  created() {
    this.getManufactorers();
  },

  methods: {
    ...mapActions(["getManufactorers","getManufactorer"]),

    // thêm mới thương hiệu
    btnAddClick() {
        this.forModeManufactorer=1;
      this.$store.commit("SET_MANUFACTORER", []);
      this.$store.commit("TOGGLE_ISSHOWMANUFACTORER");
    },
    // xem chi tiết thương hiệu
    btnDetailClick(manufactorerId) {
        this.forModeManufactorer=0;
      this.$store.commit("TOGGLE_ISSHOWMANUFACTORER");
      this.getManufactorer(manufactorerId);
      console.log("thương hiệu",this.manufactorer);
    },
    //xóa thương hiệu
    async btnDelete(manufactorerId) {   
      this.$store.commit("TOGGLE_ISSHOW_DELETE_MANUFACTORER");
      // lấy sản phẩm cần xóa
      await this.getManufactorer(manufactorerId);
    },
    // sửa thương hiệu
    btnUpdateClick(manufactorerId) {
        this.forModeManufactorer=0;
      this.$store.commit("TOGGLE_ISSHOWMANUFACTORER");
      this.getManufactorer(manufactorerId);
      console.log("thương hiệu",this.manufactorer);
    }
  },
  data() {
    return {
        forModeManufactorer:0
    };
  }
};
</script>
<style>
@import url("../../../../assets_ad/css_ad/layout/content.css");
@import url("../../../../assets_ad/css_ad/page/employ.css");
@import url("../../../../assets_ad/css_ad/component/page.css");
</style>