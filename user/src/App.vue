<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a class="navbar-brand" style="margin-left: 1em" href="/">EXchange</a>
    <div class="navbar-nav" style="width: 100%">
      <router-link to="/" class="nav-link">Trade</router-link>
      <router-link to="/about" class="nav-link" v-if="userStore.state.super">Admin</router-link>
      <router-link to="/page" class="nav-link">{{userStore.state.userName}}</router-link>
    </div>
  </nav>
  <router-view />
</template>

<script>
import userStore from "@/Store/store";

export default {
  name: 'App',
  data() {
    return {
      userStore: userStore
    }
  },
};
</script>
<style>
  #app{
    font-family: "Times New Roman", source-code-pro, 'Courier New', monospace;
    font-size: 1.3em;
    margin: 10px;
  }
  nav{
    border-radius: 15px;
  }
</style>