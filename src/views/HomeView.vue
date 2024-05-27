<script>
import LoaderModel from "@/components/LoaderModel.vue";
import PostsCard from "@/components/PostsCard.vue";
import { getPosts } from "@/services/posts";

export default {
  name: "HomeView",
  props: { postObject: Object },
  components: { PostsCard, LoaderModel },
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
  <div>
    <h2 class="font-bold text-slate-400 text-center uppercase p-6">home</h2>

    <div v-if="posts.length > 0">
      <div v-for="post in posts">
        <posts-card :post-object="post"></posts-card>
      </div>
      <!-- TODO: show all posts in date order max 10 posts -->
    </div>
    <div v-else class="flex justify-center">
      <loader-model></loader-model>
    </div>
  </div>
</template>
