<script>
import { getPostsByUserId, suscribeToPosts } from "@/services/posts";
import PostForm from "@/components/PostsForm.vue";
import PostCard from "@/components/PostCard.vue";
import { subscribeToAuth } from "@/services/auth";
import LoaderModel from "@/components/LoaderModel.vue";
import { resetUserCredentials } from "@/services/user";
import TabMenu from "@/components/TabMenu.vue";
export default {
  name: "PostsView",
  components: { PostForm, LoaderModel, PostCard, TabMenu },
  props: { postObject: null, userObject: null },
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
      close: true,
      unsuscribeFromAuth: () => {},
      unLoadPosts: () => {},
    };
  },
  async mounted() {
    await suscribeToPosts()
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
  },

  methods: {
    async loadPosts(id) {
      try {
        if (id !== null) {
          this.loading = true;
          const postSnap = await getPostsByUserId(id);
          postSnap.forEach((post) => {
            this.posts.push(post);
          });
          // console.log("User posts: ", this.posts);
          this.loading = false;
        } else {
          throw new Error("No user Logged");
        }
      } catch (error) {
        console.error("Error in loadPosts(): ", error);
        this.postViewErrors.loadPosts = error.message;
      }
    },

    /**
     * Recieves a Promise: true or false from child component PostForm.vue
     * if true closes PostForm and reloads PostView (TODO: fix to be reactive, add suscription)
     * @param {Promise<Boolean>} x
     */
    closeForm(x) {
      if (x) {
        this.close = true;
      } else {
        this.close = false;
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
        @click="close = false"
        class="mx-auto w-full xxsm:w-1/2 lg:w-1/6 text-primary hover:font-semibold ease-in-out duration-100"
      >
        ¡Make a Post!
      </button>
    </div>
    <div
      v-if="posts.length <= 0"
      class="flex flex-col relative h-full gap-4 w-full p-4 items-center"
    >
      <p class="font-semibold text-xl text-zinc-900 p-4">
        ¡You haven't published anything yet!
      </p>
    </div>
    <div v-else class="w-full flex flex-wrap justify-center gap-4">
      <post-card v-for="post in posts" :post-object="post"></post-card>
    </div>
    <!-- PostForm -->
    <post-form @close-form="closeForm" v-if="!close"></post-form>
  </div>
</template>
