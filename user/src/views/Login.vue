<template>
  <div class="card login-card bg-dark text-white ">
    <div class="card-header">
      Авторизация
    </div>
    <div class="card-body">
      <form >
        <div class="form-group">
          <div v-if="isWrong" class="alert alert-danger" role="alert">
            Неверно введён логин или пароль!
          </div>
          <label for="exampleInputEmail1">Логин</label>
          <input id="loginInput" type="text" v-model="login" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Пароль</label>
          <input id="passwordInput"  type="password" v-model="password" class="form-control" placeholder="Password">
        </div>
        <div class="text-center">
          <button id="entryBtn" class="btn btn-outline-light" @click="submit">Войти</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: 'LoginComponent',
  data() {
    return{
      login: "",
      password: "",
      isWrong: false
    }
  },
  methods: {
    submit() {
      fetch('http://localhost:4000/login',{
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: this.login,
          password: this.password
        })
      }).then((response) => response.json())
        .then((result) => {
          console.log('Success:', result);
          if (result.status){
            this.isWrong = false;
            localStorage.setItem("user", this.login);
            router.push({name: 'Home'});
          }
          else {
            this.isWrong = true;
          }
        })
    }
  }
}
</script>

<style>
  .login-card {
    width: 50%;
    margin: 10% auto;
  }
  .login-card button{
    margin: auto;
  }
  .login-card form div {
    margin-top: 10px;
  }
</style>