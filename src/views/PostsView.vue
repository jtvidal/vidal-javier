<script>
import { suscribeToPosts } from "@/services/posts";
import PostForm from "@/components/PostsForm.vue";
import PostCard from "@/components/PostCard.vue";
import { subscribeToAuth } from "@/services/auth";
import LoaderModel from "@/components/LoaderModel.vue";
import { resetUserCredentials } from "@/services/user";
import TabMenu from "@/components/TabMenu.vue";
export default {
  name: "PostsView",
  components: { PostForm, LoaderModel, PostCard, TabMenu },
  //TODO: userObject??? se usa en otro lado??
  props: { postObject: null, userObject: null, authId: null },
  data() {
    return {
      postViewErrors: {
        loadPosts: null,
      },
      userAuth: {
        id: null,
        username: null,
        email: null,
        avatar: null,
      },
      loading: true,
      posts: [],
      openForm: false,
      unsuscribeFromAuth: () => {},
      unsuscribeFromPosts: () => {},
    };
  },
  async mounted() {
    this.unsuscribeFromAuth = await subscribeToAuth(
      (postViewUpdater) => (this.userAuth = postViewUpdater)
    );
    this.userAuth.id !== null
      ? await this.loadPosts(this.userAuth.id)
      : (this.loading = true);
    console.log("User id in PostView: ", this.userAuth.id);
  },
  beforeUnmount() {
    this.posts = [];
    resetUserCredentials(this.userAuth);
  },
  unmounted() {
    this.unsuscribeFromAuth();
    this.unsuscribeFromPosts();
  },

  methods: {
    /**
     *
     * @param {String} id
     */
    async loadPosts(id) {
      try {
        this.unsuscribeFromPosts = await suscribeToPosts(
          async (postsViewUpdater) => {
            this.posts = await postsViewUpdater;
            this.posts.length >= 0 ? (this.loading = false) : "";
            console.log("id in loadPosts (PostsView: ): ", id);
            console.log("posts in loadPosts (PostsView): ", this.posts);
          },
          id
        );
      } catch (error) {
        console.error("Error in loadPosts(), PostsView: ", error);
      }
    },

    /**
     * 
     * @param x 
     */
    openPostForm(x){
      x ? this.openForm = true : this.openForm = false;
    },

    /**
     * Recieves a Promise: true or false from child component PostForm.vue
     * if true closes PostForm and reloads PostView
     * @param {Promise<Boolean>} x
     */
    closeForm(x) {
      if (x) {
        this.openForm = false;
      } else {
        this.openForm = true;
      }
    },
  },
};
</script>

<template>
  <h2 class="text-center uppercase text-slate-400 font-bold p-6">Your Posts</h2>
  <!-- Loader -->
  <div v-if="loading" class="flex justify-center p-4">
    <loader-model></loader-model>
  </div>
  <!-- Posts -->
  <div v-else class="px-2">
    <tab-menu :credentials="userAuth" v-if="userAuth.id !== null"></tab-menu>
    <!-- Post CTA -->
    <div class="flex w-full p-4">
      <button
        @click="openForm = true"
        class="mx-auto w-full xxsm:w-1/2 lg:w-1/6 text-primary hover:font-semibold ease-in-out duration-100"
      >
        ¡Make a Post!
      </button>
    </div>
    <div
      v-if="posts.length === 0"
      class="flex flex-col relative h-full gap-4 w-full p-4 items-center"
    >
      <p class="font-semibold text-xl text-zinc-900 p-4">
        ¡You haven't published anything yet!
      </p>
    </div>
    <div v-else class="w-full flex flex-wrap justify-center gap-4">
      <!-- PostCard -->
      <post-card
        v-for="post in posts"
        :post-object="post"
        :key="post.postId"
        :auth-id="post.by"
        @post-form="openPostForm"
      ></post-card>
    </div>
    <!-- PostForm -->
    <post-form @close-form="closeForm" v-if="openForm"></post-form>
  </div>
</template>
