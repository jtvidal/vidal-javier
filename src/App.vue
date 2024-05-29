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
        avatar: null,
        username: null,
      },
      userLogged: false,
    };
  },
  async mounted() {
    //¿Por qué la asignación de true o false a userLogged debe ser dentro
    //de la suscripción? Sucede que si lo hago fuera, al recargar la página,
    //userAuth trae valores null (como en su inicialización). Pero dentro de
    //la suscripción adquiere los actualizados.
    // console.log("App mounted, before suscription: ", this.userAuth);
    await subscribeToAuth((appUpdater) => {
      if (this.userAuth.id !== appUpdater.uid) {
        this.userAuth = appUpdater;
        // console.log("App mounted, suscription: ", this.userAuth);
      }
      this.userAuth.id !== null
        ? (this.userLogged = true)
        : (this.userLogged = false);
      // console.log("App mounted, after suscription:", this.userAuth);
    });
  },
  methods: {
    userLogout() {
      logout();
      this.userLogged = false;
      this.$router.push("/login-register");
    },
  },
};
</script>

<template>
  <header
    class="w-full font-poppins flex border-b-2 bg-zinc-50 border-primary justify-center"
  >
    <h1
      class="font-nunito font-bold text-primary border-primary border-2 flex self-center drop-shadow-lg bg-zinc-100 p-4 rounded-lg ms-4"
    >
      PostApp
    </h1>
    <nav
      class="w-full md:w-10/12 justify-between px-8 py-4 flex gap-4 text-sm items-center"
    >
      <router-link
        v-if="userLogged"
        to="/profile"
        class="hover:text-primary flex items-center gap-2 uppercase"
        ><img
          class="w-[50px] hover:drop-shadow-lg"
          :src="userAuth.avatar"
          alt="User Avatar profile link"
        />
        <p>{{ userAuth.username }}</p>
      </router-link>
      <!-- Log in / Register -->
      <router-link v-else to="/login-register" class="hover:text-primary"
        >Login/Register</router-link
      >
      <router-link to="/" class="hover:text-primary">Home</router-link>
      <!-- Log out -->
      <form
        v-if="userLogged"
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
    class="font-poppins h-screen w-full relative p-2"
    :class="$route.path == '/login-register' ? 'bg-primary' : 'bg-zinc-100'"
  >
    <!-- main is relative so modals can be extended as absolute through main's height and width. -->
    <RouterView />
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
