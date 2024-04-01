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
            <!-- dialog thêm mới 1 nhân viên -->
            <div id="dialogadd" class="m-dialog">
                
                    <div class="m-dialog-content">
                        <div class="m-dialog-header">
                            <div class="m-dialog-title">
                                Thông tin nhân viên
                            </div>
                            <div class="m-dialog-khachhang">
                                <input type="checkbox"/>
                                <label for="">Là khách hàng</label>
                            </div>
                            <div class="m-dialog-ncc">
                                <input type="checkbox"/>
                                <label for="">Là nhà cung cấp</label>
                            </div>
                            <button id="dialog-close" class="m-dialog-close m-icon-cancel">
                                    
                            </button>
                        </div>
                        <div class="m-dialog-body">
                            <div class="m-row-1">
                               <div class="m-row-1-left">
                                <div class="m-dialog-employcode">
                                    <div><label for="">Mã</label><i class="required">*</i></div>
                                    <div><input class="m-input" id="txtEmployeeCode" type="input" required></div>
                                </div>
                                <div class="m-dialog-employee-name">
                                    <div><label for="">Tên<i class="required">*</i></label></div>
                                    <div><input id="txtEmployeeName" class="m-input loaddel"  type="input" required></div>
                                </div>
                               </div>
                               <div class="m-row-1-right">
                                <div class="m-dialog-employee-dob">
                                    <div><label for="">Ngày sinh</label></div>
                                    <div><input class="m-input"  type="date" id="txtDateOfBrith"></div>
                                </div>
                                <div class="m-dialog-employee-gender">
                                    <div><label for="">Giới tính</label></div>
                                    <div style="display: flex; height: 40px;justify-content: center;align-items: center;">
                                        <input class="gender" type="radio" value="1" id="txtMale" name="gender"><label for="">Nam</label> 
                                        <input class="gender" type="radio" value="0" id="txtFemale" name="gender"><label for="">Nữ</label>
                                        <input class="gender" type="radio" value="2" id="txtOther" name="gender"><label for="">Khác</label>
                                    </div>
                                </div>
                               </div>
                            </div>
                            <div class="m-row-2">
                                <div class="m-dialog-donvi">
                                    <div><label for="">Đơn vị <i class="required">*</i></label></div>
                                    <div>
                                       
                                    <select id="department" name="department"></select>
                                </div>
                                </div>
                                <div class="m-dialog-cmnd">
                                    <div><label for="">Số CMND</label></div>
                                    <div><input class="m-input loaddel"  type="text" id="txtIdentityCode"></div>
                                </div>
                                <div class="m-dialog-ngay-cap">
                                    <div><label for="">Ngày cấp</label></div>
                                    <div><input class="m-input loaddel"  type="date" name="" id="txtIdentityDate"></div>
                                </div>
                            </div>
                            <div class="m-row-3">
                                <div class="m-dialog-chuc-danh">
                                    <div><label for="">Chức danh</label></div>
                                    <div><input  class="m-input loaddel" type="text" id="txtPosition"></div>
                                </div>
                                <div class="m-dialog-noi-cap">
                                    <div><label for="">Nơi cấp</label></div>
                                    <div><input class="m-input loaddel"  type="text" id="txtIdentityPlace"></div>
                                </div>
                            </div>
                            <div class="m-row-4">
                                <div class="m-dialog-address">
                                    <div><label for="">Địa chỉ</label></div>
                                    <div><input class="m-input loaddel"  type="text" id="txtAddress"></div>
                                </div>
                            </div>
                            <div class="m-row-5">
                                <div class="m-dialog-phone-number">
                                    <div><label for="">Điện thoại di đông</label></div>
                                    <div><input class="m-input loaddel"  type="text" id="txtPhoneNumber"></div>
                                </div>
                                <div class="m-dialog-phone">
                                    <div><label for="">Điện thoại cố định</label></div>
                                    <div><input class="m-input loaddel"  type="text" id="txtPhone"></div>
                                </div>
                                <div class="m-dialog-email">
                                    <div><label for="">Email</label></div>
                                    <div><input class="m-input loaddel"  type="text" id="txtEmail"></div>
                                </div>
                            </div>
                            <div class="m-row-6">
                                <div class="m-dialog-phone-account-bank">
                                    <div><label for="">Tài khoản ngân hàng</label></div>
                                    <div><input class="m-input loaddel"  type="text" id="txtAccountBank"></div>
                                </div>
                                <div class="m-dialog-bank-name">
                                    <div><label for="">Tên ngân hàng</label></div>
                                    <div><input class="m-input loaddel"  type="text" id="txtBankName"></div>
                                </div>
                                <div class="m-dialog-chi-nhanh">
                                    <div><label for="">Chi nhánh</label></div>
                                    <div><input class="m-input loaddel"  type="text" id="txtBranch"></div>
                                </div>
                            </div>
                        </div>
                        <div class="m-dialog-footer">
                           <div class="m-dialog-footer-left"> <button id="m-btn-add-cancle" class="m-btn m-btn-nocolor ">Hủy</button></div>
                            <div class="m-dialog-footer-right">
                                <button id="btnSave" class="m-btn m-btn-nocolor m-btn-cat">Cất</button>
                                <button id="btnSaveAndAdd" class="m-btn">Cất và thêm</button>
                            </div>
                        </div>
                    </div>
              
            </div>
        </div>
</template>
<script>
export default {
    
}
</script>
<style>
@import url("../../../..//assets_ad/css_ad/layout/content.css");
@import url('../../../../assets_ad/css_ad/page/employ.css');
@import url('../../../../assets_ad/css_ad/component/page.css');
</style>