<script>
import { getCommentsByPostId } from "@/services/comment";
import CommentCard from "@/components/CommentCard.vue";
export default {
  name: "CommentsView",
  components: { CommentCard },
  props: { commentObject: Object },
  data() {
    return {
      postCommented: false,
      commentsList: [],
    };
  },
  async mounted() {
    await this.getPostComments();
  },
  methods: {
    async getPostComments() {
      try {
        this.commentsList = await getCommentsByPostId(this.$route.params.id);
        if (this.commentsList.length == 0) {
          throw new Error("No comments in post");
        } else {
          console.log("Comments in this post: ", this.commentsList);
          this.postCommented = true;
        }
      } catch (error) {
        console.error("Error getting comments: ", error);
      }
    },
  },
};
</script>

<template>
  <div v-if="postCommented == true">
    <div v-for="comment in commentsList">
      <comment-card :comment-object="comment"></comment-card>
    </div>
    <!-- TODO: renderize CommentCard components -->
  </div>
  <div v-else>
    <p class="text-center">This post has no comments yet</p>
  </div>
</template>
