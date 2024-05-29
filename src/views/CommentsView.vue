<script>
import { post } from "@/services/posts";
import { getCommentsByPostId } from "@/services/comment";
import CommentCard from "@/components/CommentCard.vue";
import LoaderModel from "@/components/LoaderModel.vue";
export default {
  name: "CommentsView",
  components: { CommentCard, LoaderModel },
  props: { commentObject: Object },
  data() {
    return {
      postCard: { ...post },
      postCommented: Boolean,
      commentsList: [],
      loading: true,
    };
  },
  async mounted() {
    this.postCard = await JSON.parse(localStorage.getItem("post"));
    console.log(this.postCard);
    await this.getPostComments();
  },
  methods: {
    /**
     * Gets post comments into data() property: commentsList[].
     */
    async getPostComments() {
      try {
        this.commentsList = await getCommentsByPostId(this.postCard.postId);
        if (this.commentsList.length == 0) {
          this.postCommented = false;
          throw new Error("No comments in post");
        } else {
          console.log("Comments in this post: ", this.commentsList);
          this.postCommented = true;
        }
        return true;
      } catch (error) {
        console.error("Error getting comments: ", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <h2 class="font-poppins uppercase font-bold text-slate-400 text-center p-6">
    Comments for: {{ postCard.title }}
  </h2>
  <div v-if="loading" class="flex justify-center p-6">
    <loader-model></loader-model>
  </div>
  <div v-else-if="postCommented == true">
    <div v-for="comment in commentsList">
      <comment-card :comment-object="comment"></comment-card>
    </div>
    <!-- TODO: renderize CommentCard components -->
  </div>
  <div
    v-else
    class="flex border-primary border-4 justify-center rounded-lg drop-shadow-lg p-6 mx-auto w-10/12"
  >
    <p class="text-center">This post has no comments yet</p>
  </div>
</template>
