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
      userLogged: false,
    };
  },
  async mounted() {
    //¿Por qué la asignación de true o false a userLogged debe ser dentro
    //de la suscripción? Sucede que si lo hago fuera, al recargar la página,
    //userAuth trae valores null (como en su inicialización). Pero dentro de
    //la suscripción adquiere los actualizados.
    console.log("App mounted, before suscription: ", this.userAuth);
    await subscribeToAuth((appUpdater) => {
      if (this.userAuth.id !== appUpdater.uid) {
        this.userAuth = appUpdater;
        console.log("App mounted, suscription: ", this.userAuth);
      }
      this.userAuth.id !== null
        ? (this.userLogged = true)
        : (this.userLogged = false);
      console.log("App mounted, after suscription:", this.userAuth);
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
    class="font-poppins flex border-b-2 bg-zinc-50 border-primary justify-center"
  >
    <nav class="p-4 flex gap-4 text-sm">
      <router-link to="/" class="hover:text-primary">Home</router-link>
      <router-link v-if="userLogged" to="/profile" class="hover:text-primary"
        >Your Profile</router-link
      >
      <!-- Log in / Register -->
      <router-link v-else to="/login-register" class="hover:text-primary"
        >Login/Register</router-link
      >
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
    class="p-4 font-poppins h-screen"
    :class="$route.path == '/login-register' ? 'bg-primary' : 'bg-zinc-100'"
  >
    <RouterView />
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
