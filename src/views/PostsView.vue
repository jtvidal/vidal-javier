<script>
import { getPostsByUserId } from "@/services/posts";
import PostForm from "@/components/PostsForm.vue";
import PostCard from "@/components/PostCard.vue";
import { subscribeToAuth } from "@/services/auth";
import LoaderModel from "@/components/LoaderModel.vue";
import { resetUserCredentials } from "@/services/user";
export default {
  name: "PostsView",
  components: { PostForm, LoaderModel, PostCard },
  props: { postObject: null, userObject: null },
  data() {
    return {
      userAuth: {
        id: null,
        username: null,
        email: null,
        avatar: null,
      },
      loading: true,
      posts: [],
      close: true,
      unsuscribeFormAuth: () => {},
    };
  },
  async mounted() {
    this.unsuscribeFormAuth = await subscribeToAuth(
      (postViewUpdater) => (this.userAuth = postViewUpdater)
    );
    this.userAuth.id !== null
      ? await this.loadPosts(this.userAuth.id)
      : (this.loading = true);
    console.log("User id in PostView: ", this.userAuth.id);
  },
  beforeUnmount(){
    this.posts = [];
    resetUserCredentials(this.userAuth);
  },
  unmounted() {
    this.unsuscribeFormAuth();
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
        console.error("Error loading posts: ", error);
      }
    },

    closeForm(x) {
      if (x) {
        (this.close = true), location.reload();
      } else {
        this.close = false;
      }
    },
  },
};
</script>

<template>
  <h2 class="text-center uppercase text-slate-400 font-bold">Your Posts</h2>
  <!-- LOADER -->
  <div v-if="loading" class="flex justify-center p-4">
    <loader-model></loader-model>
  </div>
  <!-- POSTS -->
  <div v-else>
    <!-- BUTTON POST -->
    <div class="flex w-full p-4 ">
      <button
        @click="close = false"
        class="mx-auto w-full xxsm:w-1/2 lg:w-1/6  text-primary hover:font-semibold ease-in-out duration-100"
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
    <post-card v-for="post in posts"  :post-object="post"></post-card>
  </div>
    <post-form @close-form="closeForm" v-if="!close"></post-form>
  </div>
</template>
