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
      this.postCard.date = new Intl.DateTimeFormat(
        "es",
        this.postCard.date
      ).format(this.postCard.date);
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
    <h2
      class="font-poppins uppercase font-bold text-slate-400 text-center p-6 pb-2"
    >
      Comments for:
    </h2>
    <div
      class="flex flex-col border-zinc-300 text-zinc-600 border-4 p-4 w-10/12 mx-auto rounded-lg"
    >
      <div class="self-center p-4">
        <h3>
          {{ postCard.title }}
        </h3>
        <p>{{ postCard.content }}</p>
      </div>
      <ul class="flex gap-4 text-sm w-full">
        <li>By: {{ postCard.username }}</li>
        <li>On: {{ postCard.date }}</li>
      </ul>
    </div>
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
  </div>
</template>
