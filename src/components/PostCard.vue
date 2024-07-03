<script>
import { post } from "@/services/posts";
import CommentForm from "./CommentForm.vue";
import { getUserById } from "@/services/user";
export default {
  name: "PostCard",
  props: { postObject: Object, inPost: String, authId: null },
  components: { CommentForm },
  emits: ["editPost"],
  data() {
    return {
      idAuth: this.$props.authId,
      postCard: this.postObject,
      postUser: null,
      commentForm: true,
      editable: false,
      edit: true,
    };
  },
  watch: {
    postObject: {
      immediate: true,
      handler(post) {
        this.loadPostCard(post);
      },
    },
  },
  async mounted() {
    await this.loadPostCard(this.$props.postObject);
    this.postUser = await getUserById(this.postCard.by);
    this.postCard.username = this.postUser.credentials.username;
    this.postCard.avatar = this.postUser.credentials.avatar;
    this.postCard.by === this.$props.authId ? (this.editable = true) : false;
  },
  methods: {
    /**
     *
     * @param {}
     */
    async loadPostCard(p) {
      this.postCard = { ...p };
      if (this.postCard.date) {
        try {
          this.postCard.date = this.postCard.date.toDate();
          this.postCard.date = this.formatDate(this.postCard.date);
          this.postCard.username = this.aut;
        } catch (error) {
          console.error("Error in loadPostCard (PostCard): ", error);
          this.postCard.date = "Invalid date";
        }
      } else {
        this.postCard.date = "No date available";
      }
    },

    /**
     *
     */
    postEdition() {
      this.$emit("editPost", { open: this.edit, dataId: this.postCard.postId });
    },
    /**
     * Sends object postcard to comments view CommentsView.vue.
     */
    seeComents() {
      this.$router.push(`comments/${this.postCard.postId}`);
    },
    closeCommentForm(x) {
      x ? (this.commentForm = true) : (this.commentForm = false);
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
        return "Invalid date";
      }
    },
  },
};
</script>
<template>
  <div
    id="post-card"
    class="w-full sm:w-3/5 lg:w-6/12 xl:w-5/12 shadow-md shadow-zinc-400 flex flex-col items-center justify-between border-2 border-primary rounded-lg"
  >
    <div class="flex items-center border-b-2 text-xs w-full justify-around p-3">
      <router-link :to="`/user-profile/${postCard.by}`" class="flex gap-1">
        <!-- avatar -->
        <img :src="postCard.avatar" alt="Avatar of post owner" class="w-11" />
        <span class="self-center">{{ postCard.username }}</span>
      </router-link>
      <!-- to comments view -->
      <div>
        <button
          @click="seeComents"
          class="hover:text-yellow-500 text-opacity-85 ease-in-out duration-150"
        >
          See comments
        </button>
      </div>
    </div>
    <p
      v-if="postCard.date != null"
      class="text-xs text-zinc-400 self-end pt-1 pe-2"
    >
      {{ postCard.date }}
    </p>
    <!-- title & content -->
    <div class="flex flex-col sm:flex-row items-center gap-2 w-10/12">
      <!-- image -->
      <div class="w-2/3 p-1">
        <img :src="postCard.img" alt="Post Image" class="w-full" />
      </div>
      <div class="flex flex-col gap-3 w-full p-4 border-2 rounded-lg my-4">
        <div class="flex">
          <h3 class="w-full font-semibold">
            {{ postCard.title }}
          </h3>
          <!-- Button edit -->
          <button
            v-if="editable"
            @click="postEdition"
            class="font-light text-sm hover:text-yellow-500 ease-in-out duration-150"
          >
            edit
          </button>
        </div>
        <div class="w-full">
          <p class="w-full">{{ postCard.content }}</p>
        </div>
      </div>
    </div>
    <!-- buttons -->
    <div class="flex w-full justify-center">
      <div class="w-1/2">
        <button
          class="w-full p-1 bg-primary hover:bg-opacity-80 hover:text-zinc-100 ease-in-out duration-200"
        >
          Like
        </button>
      </div>
      <div class="w-1/2">
        <button
          @click="commentForm = false"
          class="w-full p-1 bg-primary hover:bg-opacity-80 hover:text-zinc-100 ease-in-out duration-200"
        >
          Comment
        </button>
      </div>
    </div>
  </div>

  <comment-form
    v-if="commentForm == false"
    :in-post="postCard.postId"
    @close-form="closeCommentForm"
  ></comment-form>
</template>
<style scoped></style>
