<template>
     <div class="page-content">
            <div class="m-page-header">
                <div class="m-page-title">Nhân viên</div>
                <div class="m-page-button">
                    <button id="btn-add" class="m-btn ">Thêm mới nhân viên</button>
                </div>
            </div>
            <div class="m-page-toolbar">
                <div class="m-toolbar-left">
                    <input id="txtSearch" class="m-input m-btn-icon-right m-icon-search" placeholder="Tìm theo mã,tên nhân viên" style="width: 200px;"/>
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
                                <th><input type="checkbox" class="m-select-row"></th>
                                 <th class="m-employee-code">MÃ NHÂN VIÊN</th>
                                 <th class="m-employee-name">TÊN NHÂN VIÊN</th>
                                 <th class="m-gender">GIỚI TÍNH</th>
                                 <th class="m-dateOfbrith">NGÀY SINH</th>
                                 <th class="m-identityCode">SỐ CMND</th>
                                 <th class="m-position">CHỨC DANH</th>
                                 <th class="m-department-name">TÊN ĐƠN VỊ</th>
                                 <th class="m-account">SỐ TÀI KHOẢN</th>
                                 <th class="m-bank-name">TÊN NGÂN HÀNG</th>
                                 <th class="m-branch">CHI NHÁNH TK NGÂN HÀNG</th>
                                 <th class="m-option">CHỨC NĂNG</th>
                             </tr>       
                            </thead>     
                            <tbody>
                            </tbody>
                            </table>
                    </div>
                   
                    <div class="m-page-paging">
                        <div class="m-page-left">
                            <label for="" id="employeeNumber"></label>
                        </div>
                        <div class="m-page-right">
                            <div class="m-number-page">
                                <select name="" id="">
                                    <option>10 bản ghi trên 1 trang</option>
                                    <option>20 bản ghi trên 1 trang</option>
                                    <option>30 bản ghi trên 1 trang</option>
                                    <option>50 bản ghi trên 1 trang</option>
                                    <option>100 bản ghi trên 1 trang</option>
                                </select>
                            </div>
                            <div class="m-number">
                                <button >Trước</button>
                                <button class="m-page-selected">1</button>
                            <button >2</button>
                            <button >3</button>
                            <button >4</button>
                            <button >Sau</button>
                            </div>
                           
                        </div>
                    </div>   
            </div>
         
              
          
        </div>
</template>
<script>
import { mapActions ,mapGetters} from 'vuex';
export default {
    name:'EmployeeList',
    computed:{...mapGetters(['product','comments','products'])},
    created() {
        this.getProduct()    
    },
    methods:{
        ...mapActions(['getProduct','getProducts','getComments']),
    //     goToShoppingCart() {
    // console.log("get");
    //     // this.$router.push('/productdetail');
    //     // Cuộn đến đầu trang sau khi trang được tải hoàn toàn
    //     this.$nextTick(() => {
    //         window.scrollTo(0, 0);
    //     });
    // },
    // handleProductClick(productId) {
    //     this.getProduct(productId);
    //     this.getComments(productId);
    //     this.goToShoppingCart();
    // }
    },
}
</script>
<style>
@import url("../../../..//assets_ad/css_ad/layout/content.css");
@import url('../../../../assets_ad/css_ad/page/employ.css');
@import url('../../../../assets_ad/css_ad/component/page.css');
</style>