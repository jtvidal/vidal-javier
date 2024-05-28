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
      makeComment: false,
    };
  },
  async mounted() {
    console.log("PostCard: ", this.$props.postObject);
    await this.loadPostCard(this.$props.postObject);
  },
  methods: {
    /**
     *
     * @param {}
     */
    async loadPostCard(p) {
      this.postCard = { ...p };
    },
    closeForm(x) {
      x ? (this.makeComment = false) : (this.makeComment = true);
    },
  },
};
</script>
<template>
  <div
    id="post-card"
    class="w-full xsm:w-2/3 sm:w-2/5 lg:w-1/4 shadow-md shadow-zinc-400 pt-4 flex flex-col items-center border-2 border-primary rounded-lg"
  >
    <h3>{{ postCard.title }}</h3>
    <div class="p-4">
      <p>{{ postCard.content }}</p>
    </div>
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
          @click="makeComment = true"
          class="w-full p-1 bg-primary hover:bg-opacity-80 hover:text-zinc-100"
        >
          Comment
        </button>
      </div>
    </div>
  </div>

  <comment-form
    v-if="makeComment == true"
    :in-post="postCard.postId"
    @close-form="closeForm"
  ></comment-form>
</template>
