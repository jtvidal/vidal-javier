<script>
import { post, getPostById } from "@/services/posts";
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
    await this.loadPostCard();
    await this.getPostComments();
  },
  methods: {
    async loadPostCard() {
      const post = await getPostById(this.$route.params.id);
      this.postCard = post;
      this.postCard.date = this.formatDate(this.postCard.date);
      // this.postCard.date = new Intl.DateTimeFormat(
      //   "es",
      //   this.postCard.date
      // ).format(this.postCard.date);
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
  <!-- post -->
  <div class="flex flex-col gap-4">
    <div class="flex justify-end text-sm text-slate-400 font-nunito p-4">
      <button @click="$router.back" class="hover:text-primary hover:underline">
        Back
      </button>
    </div>
    <h2
      class="font-poppins uppercase font-bold text-slate-400 text-center pb-2"
    >
      Comments for:
    </h2>
    <div
      class="flex flex-col border-zinc-300 text-zinc-600 border-4 p-4 w-10/12 mx-auto rounded-lg"
    >
      <div class="self-center p-4">
        <h3 class="font-semibold">
          {{ postCard.title }}
        </h3>
        <p class="pt-3">{{ postCard.content }}</p>
      </div>
      <ul class="flex justify-end gap-4 text-xs w-full p-2">
        <li>By: {{ postCard.username }}</li>
        <li>On: {{ postCard.date }}</li>
      </ul>
    </div>
    <div v-if="loading" class="flex justify-center p-6">
      <loader-model></loader-model>
    </div>
    <div
      v-else-if="postCommented == true"
      class="flex flex-col mx-auto bg-zinc-200 gap-2 rounded-lg p-2"
    >
      <comment-card
        v-for="comment in commentsList"
        :comment-object="comment"
      ></comment-card>
      <!-- TODO: renderize CommentCard components -->
    </div>
    <div
      v-else
      class="flex border-primary border-4 justify-center rounded-lg drop-shadow-lg p-6 mx-auto w-10/12"
    >
      <p class="text-center">This post has no comments yet</p>
    </div>
  </div>
</template>
