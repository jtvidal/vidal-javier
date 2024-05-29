<script>
import { comment } from "@/services/comment";
export default {
  name: "CommentCard",
  props: { commentObject: Object },
  data() {
    return {
      comment: {
        ...comment,
      },
    };
  },
  mounted() {
    this.loadComment();
  },
  methods: {
    async loadComment() {
      this.comment = this.$props.commentObject;
    },
  },
};
</script>
<template>
  <div>
    <p>{{comment.content}}</p>
  </div>
</template>
