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
      <nav>
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
      </nav>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
