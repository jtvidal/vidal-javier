<script>
export default {
  name: "TabMenu",
  props: { credentials: Object },
  data() {
    return {
      routes: [],
      userCredentials: this.$props.credentials,
    };
  },
};
</script>
<template>
  <div class="flex px-4 justify-between md:justify-around">
    <div class="flex justify-end text-sm text-slate-400 font-nunito p-4">
      <button
        v-if="$route.path !== '/'"
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
</template>
