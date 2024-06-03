<script>
import { RouterLink, RouterView } from "vue-router";
import { logout, subscribeToAuth } from "./services/auth";
import { resetUserCredentials } from "./services/user";

export default {
  name: "App",
  data() {
    return {
      userCredentials: {
        id: null,
        email: null,
        avatar: null,
        username: null,
      },
      userLogged: false,
    };
  },
  async mounted() {
    const user = null;
    await subscribeToAuth((appUpdater) => {
      if (this.userCredentials.id !== appUpdater.uid) {
        this.userCredentials = appUpdater;
      }
      this.userCredentials.id !== null
        ? (this.userLogged = true)
        : (this.userLogged = false);
    });
  },

  methods: {
    userLogout() {
      logout();
      this.userLogged = false;
      resetUserCredentials(this.userCredentials);
      this.$router.push("/login-register");
    },
  },
};
</script>

<template>
  <header
    class="w-full font-poppins flex border-b-2 bg-zinc-50 border-primary justify-center p-4"
  >
    <h1
      class="font-nunito font-bold text-primary border-primary border-2 flex self-center drop-shadow-lg bg-zinc-100 p-4 rounded-lg ms-4"
    >
      PostApp
    </h1>
    <nav
      class="w-full justify-between sm:justify-end px-8 py-4 flex gap-10 text-sm items-center"
    >
      <!-- Home -->

      <router-link
        to="/"
        class="hover:text-primary ease-in-out duration-300"
        :class="{
          'text-primary font-medium animate-jump': $route.path == '/',
        }"
        >Home</router-link
      >
      <!-- logout -->
      <div v-if="userLogged">
        <form action="#" method="post" @submit.prevent="userLogout">
          <input
            type="submit"
            value="Logout"
            class="hover:text-primary cursor-pointer ease-in-out duration-200 hover:animate-fade_to_br"
          />
        </form>
      </div>
      <!-- login/register -->
      <router-link
        v-else
        to="/login-register"
        class="hover:text-primary ease-in-out duration-200"
        :class="{
          'text-primary animate-jump': $route.path == '/login-register',
        }"
        >Login/Register</router-link
      >
    </nav>
  </header>
  <main
    class="font-poppins h-full md:h-screen  w-full relative"
    :class="$route.path == '/login-register' ? 'bg-primary' : 'bg-zinc-100'"
  >
    <!-- My Profile -->
    <div v-if="userLogged" class="flex px-4 justify-between md:justify-around">
      <div class="flex justify-end text-sm text-slate-400 font-nunito p-4">
        <button
          @click="$router.back"
          class="hover:text-yellow-500 ease-in-out duration-200"
        >
          Back
        </button>
      </div>
      <router-link
        to="/profile"
        class="hover:text-primary flex items-center gap-2 p-4"
        :class="{
          'text-primary': $route.path == '/profile',
        }"
      >
        <img
          class="w-[40px] hover:drop-shadow-lg ease-in duration-100"
          :src="userCredentials.avatar"
          alt="User Avatar profile link"
        />
        <p
          class="text-xs hover:text-primary ease-in-out duration-200"
          :class="{
            ' animate-jump': $route.path == '/profile',
          }"
        >
          {{ userCredentials.username }}
        </p>
      </router-link>
    </div>
    <!-- main is relative so modals can be extended as absolute through main's height and width. -->
    <RouterView />
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
