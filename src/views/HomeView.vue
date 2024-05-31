<script>
import LoaderModel from "@/components/LoaderModel.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import PostCard from "@/components/PostCard.vue";
import { subscribeToAuth } from "@/services/auth";
import { getPosts } from "@/services/posts";

export default {
  name: "HomeView",
  props: { postObject: Object },
  components: { PostCard, LoaderModel, HeaderTwo },
  data() {
    return {
      posts: [],
      authUser: {
        id: null,
        username: null,
        email: null,
        avatar: null,
      },
      loading: true,
      unsuscribeFromAuth: () => {},
    };
  },
  async mounted() {
    this.unsuscribeFromAuth = await subscribeToAuth((homeUpdater) => {
      this.authUser = homeUpdater;
    });
    if (this.authUser.id !== null) {
      await this.loadPosts();
      this.loading = false;
    } else {
      this.loading = false;
    }
    this.userFromLocal();
  },
  beforeUnmount() {
    this.posts = [];
    this.unsuscribeFromAuth();
  },
  methods: {
    userFromLocal() {
      localStorage.getItem("user")
        ? (this.authUser = JSON.parse(localStorage.getItem("user")))
        : (this.authUser.id = null);
      console.log("Auth user in HomeView: ", this.authUser);
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
  <header-two> ¡welcome to postapp! </header-two>

  <div class="flex justify-center uppercase font-bold"></div>
  <!-- TODO: ...loader not showing? -->
  <div v-if="loading" class="flex justify-center mx-auto">
    <loader-model></loader-model>
  </div>
  <div v-else-if="(loading = false && posts.length <= 0)">
    <p>¡NO POSTS YET BITCHES!</p>
  </div>
  <div v-else class="p-2">
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
  </div>
</template>
