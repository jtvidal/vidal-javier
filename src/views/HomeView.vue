<script>
import LoaderModel from "@/components/LoaderModel.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import PostCard from "@/components/PostCard.vue";
import { subscribeToAuth } from "@/services/auth";
import { suscribeToPosts } from "@/services/posts";
import TabMenu from "@/components/TabMenu.vue";

export default {
  name: "HomeView",
  props: { postObject: Object, credentials: Object },
  components: { PostCard, LoaderModel, HeaderTwo, TabMenu },
  data() {
    return {
      posts: [],
      authUser: {
        id: null,
        username: null,
        email: null,
        avatar: null,
      },
      loadingPosts: true,
      unsuscribeFromAuth: () => {},
      unsuscribeFromPosts: () => {},
    };
  },
  async mounted() {
    this.unsuscribeFromAuth = await subscribeToAuth(async (homeUpdater) => {
      this.authUser = await homeUpdater;
    });
    this.userFromLocal();
    if (this.authUser.id !== null) {
      await this.loadPosts();
    } else {
      this.loadingPosts = false;
    }
  },
  beforeUnmount() {
    this.posts = [];
    this.unsuscribeFromAuth();
    this.unsuscribeFromPosts();
  },
  methods: {
    userFromLocal() {
      localStorage.getItem("user")
        ? (this.authUser = JSON.parse(localStorage.getItem("user")))
        : (this.authUser.id = null);
      console.log("Auth user in HomeView: ", this.authUser);
    },
    /**
     * Updates posts from db into view
     * @returns {Promise<Boolean>}
     */
    async loadPosts() {
      this.unsuscribeFromPosts = await suscribeToPosts(
        async (homePostsUpdater) => {
          this.posts = await homePostsUpdater;
          this.posts.length >= 0 ? (this.loadingPosts = false) : "";
        }
      );
    },
  },
};
</script>
<template>
  <header-two> ¡welcome to postapp! </header-two>
  <tab-menu :credentials="authUser" v-if="authUser.id !== null"></tab-menu>
  <div v-if="loadingPosts" class="flex justify-center mx-auto">
    <loader-model></loader-model>
  </div>
  <div v-else-if="authUser.id !== null && posts.length === 0">
    <p class="text-center">¡NO POSTS YET BITCHES!</p>
  </div>
  <div v-else class="p-2">
    <div id="home-wall" class="w-full justify-center flex flex-wrap gap-2">
      <post-card v-for="post in posts" :post-object="post"></post-card>
      <!-- TODO: show all posts in date order max 10 posts 
      (maybe use SliderModel component)
      -->
    </div>
  </div>
</template>
