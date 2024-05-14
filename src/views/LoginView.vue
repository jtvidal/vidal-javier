<script>
export default {
  name: "LoginView",
};
</script>
<template>
  <h2 class="font-bold text-slate-400 text-center uppercase p-2">Login</h2>
  <div class="border-[1px] p-4 rounded-lg">
    <form
      class="flex flex-col"
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
      <input
        type="submit"
        value="Login"
        class="cursor-pointer p-2 border-2 border-zinc-400 mt-4 w-2/4 self-center rounded-lg"
      />
    </form>
  </div>
</template>
