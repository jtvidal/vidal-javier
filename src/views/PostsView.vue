<script>
import { getPostsById } from "@/services/posts";
import PostForm from "@/components/PostsForm.vue";
import PostCard from "@/components/PostsCard.vue";
import { subscribeToAuth } from "@/services/auth";
import LoaderModel from "@/components/LoaderModel.vue";
export default {
  name: "PostsView",
  components: { PostForm, LoaderModel, PostCard },
  props: { postObject: null },
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
  unmounted() {
    this.unsuscribeFormAuth();
  },

  methods: {
    async loadPosts(id) {
      try {
        if (id !== null) {
          this.loading = true;
          const postSnap = await getPostsById(id);
          postSnap.forEach((post) => {
            this.posts.push(post.data());
          });
          console.log("User posts: ", this.posts);
          this.loading = false;
        } else {
          throw new Error("No user Logged");
        }
      } catch (error) {
        console.error("Error loading posts: ", error);
      }
    },

    closeForm(x) {
      x ? (this.close = true) : (this.close = false);
    },
  },
};
</script>

<template>
  <h2 class="text-center uppercase text-slate-400 font-bold p-6">Your Posts</h2>

  <div v-if="loading" class="flex justify-center p-4">
    <loader-model></loader-model>
  </div>

  <div v-else>
    <div
      v-if="posts.length <= 0"
      class="flex flex-col relative h-full gap-4 w-full p-4 items-center"
    >
      <p class="font-semibold text-xl text-zinc-900 p-4">
        ¡You haven't published anything yet!
      </p>
    </div>
    <div v-else v-for="post in posts" class="p-4">
      <post-card :post-object="post"></post-card>
    </div>
    <div class="flex w-full p-2">
      <button
        @click="close = false"
        class="mx-auto w-full xxsm:w-1/2 lg:w-1/6 bg-primary p-2 rounded-lg text-zinc-100 hover:bg-opacity-70"
      >
        Post
      </button>
    </div>
    <post-form @close-form="closeForm" v-if="!close"></post-form>
  </div>
</template>
