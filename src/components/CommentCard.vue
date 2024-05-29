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
      this.comment.date = this.formatDate(this.comment.date)
    },

    /**
     *Transforms date into enUs date form
     * @param date {Timestamp}
     */
    formatDate(date) {
      try {
        const newDate = new Intl.DateTimeFormat("en-Us", date).format(date);
        return newDate;
      } catch (error) {
        console.error("error in formatDate: ", error);
      }
    },
  },
};
</script>
<template>
  <div class="flex flex-col p-4 w-full border-[0.5px] border-primary rounded-lg">
    <p>
      <span class="font-medium text-primary">{{ comment.username }}</span> commented:
    </p>
    <p>{{ comment.content }}</p>
    <p class="text-xs">On: {{ comment.date }}</p>
  </div>
</template>
