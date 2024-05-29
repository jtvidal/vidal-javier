<script>
import { post } from "@/services/posts";
import CommentForm from "./CommentForm.vue";
export default {
  name: "PostCard",
  props: { postObject: Object, inPost: String },
  components: { CommentForm },
  data() {
    return {
      postCard: { ...post },
      close: true,
    };
  },
  async mounted() {
    await this.loadPostCard(this.$props.postObject);
    console.log("PostCard: ", this.$props.postObject);
  },
  methods: {
    /**
     *
     * @param {}
     */
    async loadPostCard(p) {
      this.postCard = { ...p };
    },

    /**
     * Sends object postcard to comments view CommentsView.vue.
     */
    seeComents() {
      this.$router.push(`comments/${this.postCard.postId}`);
    },
    closeForm(x) {
      x ? (this.close = true) : (this.close = false);
    },
  },
};
</script>
<template>
  <div
    id="post-card"
    class="w-full xsm:w-2/3 sm:w-2/5 lg:w-1/4 shadow-md shadow-zinc-400 flex flex-col items-center border-2 border-primary rounded-lg"
  >
    <div class="flex items-center border-b-2 text-xs w-full justify-around p-3">
      <!-- avatar -->
      <img :src="postCard.avatar" alt="Avatar of post owner" class="w-11" />
      <!-- to comments view -->
      <div>
        <button @click="seeComents" class="hover:text-primary">
          See comments
        </button>
      </div>
    </div>
    <!-- header -->
    <h3 class="font-semibold pt-4">{{ postCard.title }}</h3>
    <!-- content -->
    <div class="p-1">
      <p class="w-10/12 p-3 mx-auto">{{ postCard.content }}</p>
    </div>
    <!-- buttons -->
    <div class="flex w-full justify-center">
      <div class="w-1/2">
        <button
          class="w-full p-1 bg-primary hover:bg-opacity-80 hover:text-zinc-100"
        >
          Like
        </button>
      </div>
      <div class="w-1/2">
        <button
          @click="close = false"
          class="w-full p-1 bg-primary hover:bg-opacity-80 hover:text-zinc-100"
        >
          Comment
        </button>
      </div>
    </div>
  </div>

  <comment-form
    v-if="close == false"
    :in-post="postCard.postId"
    @close-form="closeForm"
  ></comment-form>
</template>
