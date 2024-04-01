<template lang="">
   <div class="login">
    <div class="login-container">
        <h1>E SHOPPER</h1>
    <form class="login-form" action="#" method="POST">
      <h5>Đăng nhập</h5>
      <div class="input-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
      </div>
      <button  type="submit">Đăng nhập</button>
    </form>
  </div>
   </div>
</template>
<script>
export default {
    name:'TheLogin'
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

</style>