<script>
import { getCommentsByPostId } from "@/services/comment";
import CommentCard from "@/components/CommentCard.vue";
import LoaderModel from "@/components/LoaderModel.vue";
export default {
  name: "CommentsView",
  components: { CommentCard, LoaderModel },
  props: { commentObject: Object },
  data() {
    return {
      postCommented: Boolean,
      commentsList: [],
      loading: true,
    };
  },
  async mounted() {
    await this.getPostComments();
  },
  methods: {
    /**
     * Gets post comments into data() property: commentsList[].
     */
    async getPostComments() {
      try {
        this.commentsList = await getCommentsByPostId(this.$route.params.id);
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
  <h2>Comments for: {{ $route.params.title }}</h2>
  <div v-if="loading" class="flex justify-center p-6">
    <loader-model></loader-model>
  </div>
  <div v-else-if="postCommented == true">
    <div v-for="comment in commentsList">
      <comment-card :comment-object="comment"></comment-card>
    </div>
    <!-- TODO: renderize CommentCard components -->
  </div>
  <div v-else>
    <p class="text-center">This post has no comments yet</p>
  </div>
</template>
