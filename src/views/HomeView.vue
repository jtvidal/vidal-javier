<script>
import LoaderModel from "@/components/LoaderModel.vue";
import PostCard from "@/components/PostCard.vue";
import { subscribeToAuth } from "@/services/auth";
import { getPosts } from "@/services/posts";

export default {
  name: "HomeView",
  props: { postObject: Object },
  components: { PostCard, LoaderModel },
  data() {
    return {
      posts: [],
      authUser: {
        id: null,
        username: null,
        email: null,
        avatar: null,
      },
      unsuscribeFromAuth: () => {},
    };
  },
  async mounted() {
    this.unsuscribeFromAuth = subscribeToAuth((homeUpdater) => {
      this.authUser = homeUpdater;
    });
    this.authUser.id !== null ? await this.loadPosts() : "";
    this.userFromLocal();
  },
  methods: {
    userFromLocal() {
      localStorage.getItem("user")
        ? (this.authUser = JSON.parse(localStorage.getItem("user")))
        : (this.authUser.id = null);
        console.log(this.authUser);
    },
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

  <div class="flex justify-center uppercase font-bold">
    aquí les vengo a bailar
  </div>
  <div v-if="authUser.id !== null" class="p-2 flex">
    <div
      v-if="posts"
      id="home-wall"
      class="w-full justify-center flex flex-wrap gap-2"
    >
      <post-card v-for="post in posts" :post-object="post"></post-card>
      <!-- TODO: show all posts in date order max 10 posts 
      (maybe use SliderModel component)
      -->
    </div>
    <!-- TODO: ...loader not showing? -->
    <div v-else class="flex justify-center mx-auto">
      <loader-model></loader-model>
    </div>
  </div>
</template>
