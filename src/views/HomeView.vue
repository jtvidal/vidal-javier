<script>
import LoaderModel from "@/components/LoaderModel.vue";
import PostCard from "@/components/PostCard.vue";
import { getPosts } from "@/services/posts";

export default {
  name: "HomeView",
  props: { postObject: Object },
  components: { PostCard, LoaderModel },
  data() {
    return {
      posts: [],
    };
  },
  async mounted() {
    await this.loadPosts();
  },
  methods: {
    /**
     * Loads posts from db
     */
    async loadPosts() {
      this.posts = await getPosts();
      console.log("posts in HomeView: ", this.posts);
    },
  },
};
</script>
<template>
  <h2 class="font-bold text-slate-400 text-center uppercase p-6">home</h2>
  <div class="p-2 flex">
    <div
      id="home-wall"
      v-if="posts.length > 0"
      class="w-full justify-center flex flex-wrap gap-2"
    >
      <post-card v-for="post in posts" :post-object="post"></post-card>

      <!-- TODO: show all posts in date order max 10 posts -->
    </div>
    <div v-else class="flex justify-center">
      <loader-model></loader-model>
    </div>
  </div>
</template>
