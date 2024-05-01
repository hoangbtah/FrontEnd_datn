import axios from "axios";
const commentModules={
    state:{
        comments:[],
       
    },
    getters:{
        comments:state=> state.comments,
        
    },
    actions:{
        async getComments({commit},productId){
            try {
                console.log("productId");
              const respone=await  axios.get(`https://localhost:7159/api/Comment/comment/${productId}`)
              console.log("lấy bình luận")
              console.log(respone.data);
                commit('SET_COMMENTS',respone.data);
                 // Lưu comment vào Local Storage
                 localStorage.setItem('commentsProduct', JSON.stringify(respone.data));
            } catch (error) {
                console.log(error)
            }
        },
         // thêm mới bình luận
    async addComment({ commit }, data) {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            this.$router.push("/login");
          }
  
          // Gọi API để thêm bình luân
          const respone = await axios.post(
            "https://localhost:7159/api/Comment", data,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          commit('ADD_COMMENT',data);
          console.log(respone.data);
          console.log("Thêm bình luận thành công");
        } catch (error) {
         // alert(error.response.data);
          console.error("Lỗi khi thêm bình luận:", error);
          throw error;
        }
      },
      
    },
    mutations:{
        SET_COMMENTS(state,comments){
            state.comments=comments
        },
        ADD_COMMENT(state,newComment) {
            const formData={
                UserId : newComment.userId,
                PostDate:newComment.postDate,
                ProductId:newComment.productId,
                CommentContent:newComment.commentContent,
                Rating:newComment.rating
            }
            state.comments.unshift(formData);
           },
      
        
    }
}
export default commentModules