<template >
    <div class="page-content">
           <div class="m-page-header">
               <div class="m-page-title">Quản lý đánh giá sản phẩm</div>
               <div class="m-page-button">
                   <!-- <button id="btn-add" class="m-btn" @click="btnAddClick()">Thêm mới</button> -->
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
                              
                                <th class="m-employee-name">NỘI DUNG</th>
                              
                                <th class="m-gender">ĐÁNH GIÁ</th>
                                <th class="m-option">CHỨC NĂNG</th>
                            </tr>       
                           </thead>     
                           <tbody>
                               <tr v-for="(comment,index) in comments" :key="comment.CommentId">
                                   <td>{{ index+1 }}</td>
                                   <td>{{ comment.CommentContent}}</td>
                                <td >{{ comment.Rating }}</td>

                                   <td>
                                      <div class="m-option">
                                      
                                       <button class="m-btn-option m-btn-ud  btn-danger" @click="btnDelete(comment.CommentId)">Xóa</button>
                                       
                                      </div>
                                   </td>
                               </tr>
                           </tbody>
                           </table>
                   </div>
                  
                   <div class="m-page-paging">
                       <div class="m-page-left">
                           <label>Tổng số :{{comments.length}} bình luận và đánh giá</label>
                       </div>
                       <div class="m-page-right">
                           <div class="m-number-page">
                             
                           </div>
                         
                        
                       </div>
                   </div>   
           </div>
        
    </div>
                   
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// Import Vue và VueToasted
import Vue from "vue";
import Toasted from "vue-toasted";
Vue.use(Toasted);
// import axios from "axios";
export default {
  name: "CommentList",
  components: {},

  computed: {
    ...mapGetters(["comments","product"])
  },

  created() {
    // this.getCatagorys();
  },

  methods: {
    ...mapActions(["deleteComment"]),
  async  btnDelete(commentId){
     await   this.deleteComment(commentId);
    //   await  this.$store.commit("DELETE_COMMENT",commentId);
         // Hiển thị thông báo thành công
      this.$toasted.show("Xóa  thành công!", {
        duration: 2000, // Thời gian hiển thị thông báo (ms)
        position: "top-center", // Vị trí hiển thị
        type: "success" // Kiểu thông báo (success, info, error)
      });
    }
  },
  watch :{
    // comments(){
    //     this.getComments(this.product.ProductId);
    // }
  },
  data() {
    return {
     
    };
  }
};
</script>
<style>
@import url("../../../../assets_ad/css_ad/layout/content.css");
@import url("../../../../assets_ad/css_ad/page/employ.css");
@import url("../../../../assets_ad/css_ad/component/page.css");
</style>