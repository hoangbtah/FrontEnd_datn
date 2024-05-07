import axios from "axios";
const catagoryModules={
    state:{
        catagorys:[],
        isShowCatagory:false,
        catagory:{},
        isShowDialogDeleteCatagory:false
    },
    getters:{
        catagorys:state=> state.catagorys,
        isShowCatagory:state=> state.isShowCatagory,
        catagory:state=> state.catagory,
        isShowDialogDeleteCatagory:state=> state.isShowDialogDeleteCatagory,
    },
    actions:{
        async getCatagorys({commit}){
            try {
              const respone=await  axios.get('https://localhost:7159/api/v1/Catagory')
                commit('SET_CATAGORYS',respone.data)
            } catch (error) {
                console.log(error)
            }
           
        },
        async getCatagory({commit},catagoryId){
            try {
              const respone=await  axios.get(`https://localhost:7159/api/v1/Catagory/${catagoryId}`)
                commit('SET_CATAGORY',respone.data)
            } catch (error) {
                console.log(error)
            }
           
        }
    },
    mutations:{
        SET_CATAGORYS(state,catagorys){
            state.catagorys=catagorys
        },
        SET_CATAGORY(state,catagory){
            state.catagory=catagory
        },
        ADD_CATAGORY(state,newCatagory)
        {
            state.catagorys.unshift(newCatagory);
        },
        TOGGLE_ISSHOWCATAGORY(state)
        {
            state.isShowCatagory=!state.isShowCatagory;
        },
        TOGGLE_ISSHOW_DIALOG_DELETE_CATAGORY(state)
        {
            state.isShowDialogDeleteCatagory=!state.isShowDialogDeleteCatagory;
        },
        DELETE_CATAGORY(state, catagoryId) {
            state.catagorys = state.catagorys.filter(catagory => catagory.catagoryId !== catagoryId)
        },
    }
}
export default catagoryModules