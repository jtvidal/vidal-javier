<script>
import { post, getPostById } from "@/services/posts";
import { getCommentsByPostId } from "@/services/comment";
import CommentCard from "@/components/CommentCard.vue";
import LoaderModel from "@/components/LoaderModel.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import TabMenu from "@/components/TabMenu.vue";
import { subscribeToAuth } from "@/services/auth";
export default {
  name: "CommentsView",
  components: { CommentCard, LoaderModel, HeaderTwo, TabMenu },
  props: { userId: String },
  data() {
    return {
      authUser: null,
      postCard: { ...post },
      postCommented: Boolean,
      commentsList: [],
      loading: true,
      commentsLoading: true,
      unsuscribeFromAuth: () => {},
    };
  },
  async mounted() {
    this.unsuscribeFromAuth = await subscribeToAuth(
      (commentsViewUpdater) => (this.authUser = commentsViewUpdater)
    );
    this.authUser ? (this.loading = false) : "";
    await this.loadPostCard();
    await this.getPostComments();
  },
  unmounted() {
    this.unsuscribeFromAuth();
    this.authUser = null;
  },
  methods: {
    async loadPostCard() {
      const post = await getPostById(this.$route.params.id);
      this.postCard = post;
      console.log("CommentsView postCard.by: ", this.postCard.by);
      this.postCard.date = this.postCard.date.toDate();
      this.postCard.date = this.formatDate(this.postCard.date);
    },
    /**
     *Transforms date into enUs date form
     * @param date {Timestamp}
     */
    formatDate(date) {
      try {
        const newDate = new Intl.DateTimeFormat("en-Us", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(date);
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
        this.commentsLoading = false;
      }
    },
  },
};
</script>

<template>
  <!-- post -->
  <div v-if="loading">
    <loader-model></loader-model>
  </div>
  <div v-else>
    <div class="flex flex-col gap-4">
      <tab-menu :credentials="authUser" v-if="authUser"></tab-menu>
      <header-two class="font-poppins uppercase font-bold text-center pb-2">
        Comments for:
      </header-two>
      <div
        class="flex flex-col border-zinc-300 text-zinc-600 border-4 p-4 w-10/12 mx-auto rounded-lg"
      >
        <div class="p-2">
          <h3 class="font-semibold">
            {{ postCard.title }}
          </h3>
          <p class="pt-3">{{ postCard.content }}</p>
        </div>
        <ul class="flex justify-between items-center gap-4 text-xs w-full p-2">
          <li class="text-sm">
            By:
            <router-link
              :to="`/user-profile/${postCard.by}`"
              class="text-yellow-600 hover:text-yellow-500 text-opacity-85 ease-in-out duration-150"
            >
              {{ postCard.username }}</router-link
            >
          </li>
          <li class="text-zinc-400">On: {{ postCard.date }}</li>
        </ul>
      </div>
      <div v-if="commentsLoading" class="flex justify-center p-6">
        <loader-model></loader-model>
      </div>
      <div
        v-else-if="postCommented == true"
        class="flex flex-col mx-auto bg-zinc-200 gap-2 rounded-lg p-2 w-10/12"
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
  </div>
</template>
