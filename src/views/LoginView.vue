<script>
import { register } from "@/services/auth";
export default {
  name: "LoginView",
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async userRegister() {
      await register(this.email, this.password);
    },
  },
};
</script>
<template>
  <h2 class="font-bold text-zinc-900 text-center uppercase p-2">
    Login / Register
  </h2>
  <div class="p-1 flex justify-center">
    <form
      @submit.prevent="userRegister"
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
          type="submit"
          value="Login"
          class="hover:text-zinc-50 cursor-pointer p-2 border-2 border-zinc-50 mt-4 w-2/5 self-center rounded-lg"
        />
        <input
          type="submit"
          value="Register"
          class="hover:text-zinc-50 cursor-pointer p-2 border-2 border-zinc-50 mt-4 w-2/5 self-center rounded-lg"
        />
      </div>
    </form>
  </div>
</template>
