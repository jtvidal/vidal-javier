<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  name: 'App',
  data(){
    return{
      avatarList:[]
    }
  }
};
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="p-4 flex gap-2 justify-end border-b-2 border-zinc-700">
         <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>
  <main class="p-4">
    <RouterView />
  </main>
</template>

<style scoped></style>
