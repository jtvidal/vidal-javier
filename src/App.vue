<script>
import { RouterLink, RouterView } from "vue-router";

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
  <header>
    <div class="wrapper">
      <nav class="p-4 flex gap-4 justify-end border-b-2 border-zinc-700">
        <router-link to="/" class="hover:underline">Home</router-link>
        <router-link to="/profile" class="hover:underline"
          >My Profile</router-link
        >
        <router-link to="/login" class="hover:underline">Login</router-link>
      </nav>
    </div>
  </header>
  <main class="p-4">
    <RouterView />
  </main>
</template>
