<script>

export default {
  name: "PostsView",
  data() {
    return {
      userId: this.$route.params.id,
      publications: [],
    };
  },
  async mounted() {
    console.log("User id: ", this.userId);
  },
  methods: {},
};
</script>
<template>
  <div class="flex flex-col items-center">
    <h2 class="text-center uppercase text-slate-400 font-bold">
      Your Posts
    </h2>
    <div v-if="publications.length <= 0">
      <p class="font-semibold text-sm p-4">¡You haven't published anything yet!</p>
      <div class="flex justify-center">
        <button @click="$router.push('/posts-form')" class="w-2/5 bg-primary p-2 rounded-lg text-zinc-100 hover:bg-opacity-70">Post</button>
      </div>
    </div>
    <div v-else>
        <p>POSTS</p>
    </div>
  </div>
</template>
