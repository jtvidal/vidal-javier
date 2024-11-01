<script>
import LoaderModel from "@/components/LoaderModel.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import PostCard from "@/components/PostCard.vue";
import { subscribeToAuth } from "@/services/auth";
import { suscribeToPosts } from "@/services/posts";
import TabMenu from "@/components/TabMenu.vue";
import EditPost from "@/components/EditPost.vue";

export default {
  name: "HomeView",
  props: { postObject: Object, credentials: Object },
  components: { PostCard, LoaderModel, HeaderTwo, TabMenu, EditPost },
  data() {
    return {
      posts: [],
      authUser: {
        id: null,
        username: null,
        email: null,
        avatar: null,
      },
      editPostOptions: {
        open: false,
        dataId: null,
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

    /**
     *
     * @param options {{open: Boolean, dataId: String}}
     */
    openEditForm(options) {
      options.open
        ? (this.editPostOptions.open = true)
        : (this.editPostOptions.open = false);
      if (options.postId !== null) {
        this.editPostOptions.dataId = options.dataId;
      }
    },

    /**
     *
     * @param {{open:boolean, success:boolean}} options
     */
    async closeEditForm(options) {
      !options.open
        ? (this.editPostOptions.open = false)
        : (this.editPostOptions.open = true);
      if (options.success) {
        console.log("success in closeEditForm (PostsView): ", options.success);
        await this.loadPosts(this.authUser.id);
      }
    },
  },
};
</script>
<template>
  <header-two> welcome to postapp! </header-two>
  <div v-if="authUser.id === null" class="">
    <p class="font-bold text-center p-8">LOG IN TO SEE USERS POSTS!</p>
  </div>
  <tab-menu :credentials="authUser" v-if="authUser.id !== null"></tab-menu>
  <div v-if="loadingPosts" class="flex justify-center mx-auto">
    <loader-model></loader-model>
  </div>
  <div
    v-else-if="authUser.id !== null && posts.length === 0"
    class="border-[10px] border-zinc-600 rounded-tr-md rounded-bl-md w-10/12 mx-auto p-8"
  >
    <p class="text-center">BE THE FIRST ONE TO POST!</p>
  </div>
  <div v-else class="p-2 w-full">
    <div id="home-wall" class="w-full justify-center flex flex-wrap gap-4">
      <post-card
        v-for="post in posts"
        :post-object="post"
        :auth-id="authUser.id"
        @edit-post="openEditForm"
      ></post-card>
    </div>
    <!-- EditPost -->
    <edit-post
      :id-post="editPostOptions.dataId"
      @close-form="closeEditForm"
      v-if="editPostOptions.open"
    ></edit-post>
  </div>
</template>
