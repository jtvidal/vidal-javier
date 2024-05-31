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
      this.comment.date = this.formatDate(this.comment.date);
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
  <div
    class="flex flex-col p-2 w-full gap-2 border-2 border-primary rounded-lg"
  >
    <p>
      <router-link
        class="font-semibold hover:text-primary ease-in-out duration-200"
        >{{ comment.username }}</router-link
      >
      commented:
    </p>
    <p class="self-end pe-2">{{ comment.content }}</p>
    <p class="text-xs">On: {{ comment.date }}</p>
  </div>
</template>
