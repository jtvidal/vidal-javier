<script>
import { RouterLink, RouterView } from "vue-router";
import router from "./router";

export default {
  name: "App",
  data() {
    return {
      avatarList: [],
    };
  },
};
</script>

<template>
  <header class="font-poppins flex border-b-2 border-primary justify-center">
    <nav class="p-4 flex gap-4 text-sm">
      <router-link to="/" class="hover:text-primary">Home</router-link>
      <router-link to="/profile" class="hover:text-primary"
        >My Profile</router-link
      >
      <router-link to="/login" class="hover:text-primary">Login/Register</router-link>
    </nav>
  </header>
  <main class="p-4 font-poppins mt-4 h-screen" :class="$route.path == '/login' ? 'bg-primary' : ''">
    <RouterView />
  </main>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
