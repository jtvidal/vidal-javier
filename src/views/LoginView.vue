<script>
export default {
  name: "LoginView",
};
</script>
<template>
  <h2 class="font-bold text-zinc-900 text-center uppercase p-2">Login / Register</h2>
  <div class="p-1 flex justify-center">
    <form
      class="flex flex-col w-full p-2 gap-2"
      action="#"
      method="get"
      enctype="multipart/form-data"
    >
      <div class="flex flex-col">
        <label for="username">User</label>
        <input
          class="bg-zinc-200 ps-2"
          type="text"
          name="username"
          id="username"
        />
      </div>
      <div class="flex flex-col">
        <label for="password">Password</label>
        <input
          class="bg-zinc-200 ps-2"
          type="text"
          name="password"
          id="password"
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
