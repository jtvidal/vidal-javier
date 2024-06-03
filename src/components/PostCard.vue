<script>
import { post } from "@/services/posts";
import CommentForm from "./CommentForm.vue";
export default {
  name: "PostCard",
  props: { postObject: Object, inPost: String },
  components: { CommentForm },
  data() {
    return {
      postCard: { ...post },
      close: true,
    };
  },
  async mounted() {
    await this.loadPostCard(this.$props.postObject);
  },
  methods: {
    /**
     *
     * @param {}
     */
    async loadPostCard(p) {
      this.postCard = { ...p };
      this.postCard.date = this.postCard.date.toDate();
      this.postCard.date = this.formatDate(this.postCard.date);
    },

    /**
     * Sends object postcard to comments view CommentsView.vue.
     */
    seeComents() {
      this.$router.push(`comments/${this.postCard.postId}`);
    },
    closeForm(x) {
      x ? (this.close = true) : (this.close = false);
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
  },
};
</script>
<template>
  <div
    id="post-card"
    class="w-full xsm:w-2/3 sm:w-2/5 lg:w-1/4 shadow-md shadow-zinc-400 flex flex-col items-center justify-between border-2 border-primary rounded-lg"
  >
    <div class="flex items-center border-b-2 text-xs w-full justify-around p-3">
      <router-link :to="`/user-profile/${postCard.by}`">
        <!-- avatar -->
        <img :src="postCard.avatar" alt="Avatar of post owner" class="w-11" />
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
    <p class="text-xs text-zinc-400 self-end pt-1 pe-2">{{ postCard.date }}</p>
    <!-- header -->
    <!-- title & content -->
    <div class="flex flex-col gap-3 w-full p-6">
      <h3 class="w-full font-semibold">
        {{ postCard.title }}
      </h3>
      <div class="w-full">
        <p class="w-10/12">{{ postCard.content }}</p>
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
          @click="close = false"
          class="w-full p-1 bg-primary hover:bg-opacity-80 hover:text-zinc-100 ease-in-out duration-200"
        >
          Comment
        </button>
      </div>
    </div>
  </div>

  <comment-form
    v-if="close == false"
    :in-post="postCard.postId"
    @close-form="closeForm"
  ></comment-form>
</template>
