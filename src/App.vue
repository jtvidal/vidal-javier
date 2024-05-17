<script>
import { RouterLink, RouterView } from "vue-router";
import { logout, subscribeToAuth } from "./services/auth";

export default {
  name: "App",
  data() {
    return {
      userAuth: {
        id: null,
        email: null,
      },
    };
  },
  mounted() {
    subscribeToAuth((userData) => (this.userAuth = userData));
  },
  methods: {
    userLogout() {
      logout();
      this.$router.push("/login-register");
    },
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
      <!-- Log in / Register -->
      <router-link to="/login-register" class="hover:text-primary"
        >Login/Register</router-link
      >
      <!-- Log out -->
      <form
        action="#"
        @submit.prevent="userLogout"
        method="get"
        enctype="multipart/form-data"
      >
        <input
          type="submit"
          value="Logout"
          class="hover:text-primary cursor-pointer"
        />
      </form>
    </nav>
  </header>
  <main
    class="p-4 font-poppins mt-4 h-screen"
    :class="$route.path == '/login-register' ? 'bg-primary' : ''"
  >
    <RouterView />
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
