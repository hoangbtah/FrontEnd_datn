<template >
    <div class="page-content">
           <div class="m-page-header">
               <div class="m-page-title">Quản lý danh mục</div>
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
                              
                                <th class="m-employee-name">TÊN DANH MỤC</th>
                              
                                <th class="m-option">CHỨC NĂNG</th>
                            </tr>       
                           </thead>     
                           <tbody>
                               <tr v-for="(catagory,index) in catagorys" :key="catagory.catagoryId">
                                   <td>{{ index+1 }}</td>
                                   <td>{{ catagory.catagoryName }}</td>
                                  
                                   <td>
                                      <div class="m-option">
                                       <button class="m-btn-option m-btn-de btn-info"  @click="btnDetailClick(catagory.catagoryId)">Chi tiết</button>
                                       <button class="m-btn-option m-btn-ud btn-warning" @click="btnUpdateClick(catagory.catagoryId)">Sửa</button>
                                       <button class="m-btn-option m-btn-ud  btn-danger" @click="btnDelete(catagory.catagoryId)">Xóa</button>
                                       
                                      </div>
                                   </td>
                               </tr>
                           </tbody>
                           </table>
                   </div>
                  
                   <div class="m-page-paging">
                       <div class="m-page-left">
                           <label>Tổng số :{{catagorys.length}} danh mục</label>
                       </div>
                       <div class="m-page-right">
                           <div class="m-number-page">
                             
                           </div>
                         
                        
                       </div>
                   </div>   
           </div>
         <CatagoryDetail :forCatagory="forModeCatagory"/>
         <DialogDeleteCatagory />
    </div>
                   
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// import axios from "axios";
import CatagoryDetail from "./CatagoryDetail";
import DialogDeleteCatagory from "../../../../components/DialogDeleteCatagory";

export default {
  name: "CatagoryList",
  components: {CatagoryDetail,DialogDeleteCatagory},

  computed: {
    ...mapGetters(["catagorys","isShowCatagory","catagory"])
  },

  created() {
    this.getCatagorys();
  },

  methods: {
    ...mapActions(["getCatagorys","getCatagory"]),
    // thêm mới thương hiệu
    btnAddClick() {
      this.forModeCatagory=1;
      this.$store.commit("TOGGLE_ISSHOWCATAGORY");
      this.$store.commit("SET_CATAGORY",[]);
      // console.log("trang thái",this.forModeCatagory);
    },
    // xem chi tiết thương hiệu
  async  btnDetailClick(catagoryId) {
    this.forModeCatagory=0;
      this.$store.commit("TOGGLE_ISSHOWCATAGORY");
      // lấy thương hiệu đã chọn
    await this.getCatagory(catagoryId);
    console.log("thương hiệu",this.catagory)

    },
    //xóa thương hiệu
    async btnDelete(catagoryId) {
      //hiển thi dialog
     this.$store.commit("TOGGLE_ISSHOW_DIALOG_DELETE_CATAGORY");
    await this.getCatagory(catagoryId);   
    },
    // sửa thương hiệu
   async btnUpdateClick(catagoryId) {
    this.forModeCatagory=0;
      this.$store.commit("TOGGLE_ISSHOWCATAGORY");
      // lấy thương hiệu đã chọn
    await this.getCatagory(catagoryId);
    console.log("thương hiệu",this.catagory)
    }
  },
  watch :{
    catagory(){
      this.getCatagorys();
    },
    catagorys(){
      this.getCatagorys();
    }
  },
  data() {
    return {
      forModeCatagory:0
    };
  }
};
</script>
<style>
@import url("../../../../assets_ad/css_ad/layout/content.css");
@import url("../../../../assets_ad/css_ad/page/employ.css");
@import url("../../../../assets_ad/css_ad/component/page.css");
</style>