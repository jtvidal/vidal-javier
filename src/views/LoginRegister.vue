<script>
import { register, login } from "@/services/auth";
export default {
  name: "LoginRegister",
  data() {
    return {
      email: null,
      password: null,
      login: false,
      register: false,
    };
  },
  methods: {
    async loginRegister() {
      this.register == true ? await register(this.email, this.password) : "";
      this.register = false;
      this.login == true ? await login(this.email, this.password) : "";
      this.login = false
      this.$router.push('/profile');
    },
  },
};
</script>
<template>
  <h2 class="font-bold text-zinc-900 text-center uppercase p-2">
    Login / Register
  </h2>
  <div class="p-4 w-10/12 sm:w-8/12 lg:w-1/4 flex justify-center mx-auto">
    <form
      @submit.prevent="loginRegister"
      class="flex flex-col w-full p-2 gap-2"
      action="#"
      method="get"
      enctype="multipart/form-data"
    >
      <div class="flex flex-col">
        <label for="mail" class="cursor-pointer">Email</label>
        <input
          class="bg-zinc-200 ps-2"
          type="email"
          name="mail"
          id="mail"
          v-model="email"
        />
      </div>
      <div class="flex flex-col">
        <label for="pass" class="cursor-pointer">Password</label>
        <input
          class="bg-zinc-200 ps-2"
          type="password"
          name="pass"
          id="pass"
          v-model="password"
        />
      </div>
      <div class="flex gap-2 justify-center">
        <input
          @click="this.login = true"
          type="submit"
          value="Login"
          class="hover:text-zinc-50 cursor-pointer p-2 border-2 border-zinc-50 mt-4 w-2/5 self-center rounded-lg"
        />
        <input
          @click="this.register = true"
          type="submit"
          value="Register"
          class="hover:text-zinc-50 cursor-pointer p-2 border-2 border-zinc-50 mt-4 w-2/5 self-center rounded-lg"
        />
      </div>
    </form>
  </div>
</template>
