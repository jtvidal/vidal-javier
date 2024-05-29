<script>
import { getCommentsByPostId } from "@/services/comment";
export default {
  name: "CommentsView",
  data() {
    return {
      postCommented: false,
      commentsList: [],
    };
  },
  async mounted() {
    console.log("postId in CommentsView: ", this.$route.params.id);
    this.commentsList = await getCommentsByPostId(this.$route.params.id);
    console.log("Comments in post: ", this.commentsList);
  },
  methods: {
    async getPostComments() {
      try {
        this.commentsList = await getCommentsByPostId(this.$route.params.id);
      } catch (error) {}
    },
  },
};
</script>

<template>
  <div v-if="postCommented == true"></div>
  <div v-else>
    <p>This post has no comments yet</p>
  </div>
</template>
