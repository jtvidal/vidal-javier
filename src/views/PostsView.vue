<script>
import { getPostsById } from "@/services/posts";
import PostForm from "@/components/PostsForm.vue";
import { subscribeToAuth } from "@/services/auth";
export default {
  name: "PostsView",
  components: { PostForm },
  data() {
    return {
      userAuth: {
        id: null,
        username: null,
        email: null,
        avatar: null,
      },
      close: true,
      unsuscribeFormAuth: () => {},
    };
  },
  async mounted() {
    this.unsuscribeFormAuth = await subscribeToAuth(
      (postViewUpdater) => (this.userAuth = postViewUpdater)
    );
    console.log("User id in PostView: ", this.userAuth.id);
    await getPostsById(this.userAuth.id);
  },
  unmounted() {
    this.unsuscribeFormAuth();
  },
  methods: {
    closeForm(x) {
      x ? (this.close = true) : (this.close = false);
    },
  },
};
</script>
<template>
  <div>
    <h2 class="text-center uppercase text-slate-400 font-bold p-6">
      Your Posts
    </h2>
    <div class="flex flex-col relative h-full gap-4 w-full p-4 items-center">
      <p class="font-semibold text-xl text-zinc-900 p-4">
        ¡You haven't published anything yet!
      </p>
      <div class="flex w-full">
        <button
          @click="close = false"
          class="mx-auto w-full xxsm:w-1/2 lg:w-1/6 bg-primary p-2 rounded-lg text-zinc-100 hover:bg-opacity-70"
        >
          Post
        </button>
      </div>
    </div>
    <post-form @close-form="closeForm" v-if="!close"></post-form>
  </div>
</template>
