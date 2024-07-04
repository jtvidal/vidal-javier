<script>
import { subscribeToAuth } from "@/services/auth";
import { saveComment, comment } from "@/services/comment";
import { userAuth } from "@/services/user";
import { Timestamp } from "firebase/firestore";
import LoaderSmall from "./LoaderSmall.vue";

export default {
  name: "CommentForm",
  // Recieves postId: id from the component PostCar (parent component).
  props: { inPost: String },
  components: { LoaderSmall },
  data() {
    return {
      commentByUser: { ...userAuth },
      comment: {
        ...comment,
        inPost: this.inPost,
      },
      commenting: false,
      close: true,
      unsuscribeFromAuth: () => {},
    };
  },
  async mounted() {
    this.unsuscribeFromAuth = await subscribeToAuth(
      (commentByUpdater) => (this.commentByUser = commentByUpdater)
    );
    await this.commentBy(this.commentByUser);
    // console.log("comment in commentForm: ", this.comment);
  },
  methods: {
    /**
     *Sets comment data
     * @param u {Promise<userAuth>} Authenticated user
     */
    async commentBy(u) {
      this.comment.by = (await u).id;
      this.comment.avatar = (await u).avatar;
      this.comment.username = (await u).username;
    },

    async handleSubmit() {
      try {
        this.commenting = true;
        this.comment.date = Timestamp.now();
        if (!this.comment.content) {
          throw new Error("Error in handleSubmit: no content added to comment");
        } else {
          this.close = await saveComment(this.comment);
          if (this.close == true) {
            this.commenting = false;
            this.handleClose();
          } else {
            throw new Error("Comment could not be saved");
          }
        }
      } catch (error) {
        console.error("Error in handleSubmit: ", error);
      } finally {
        this.commenting = false;
      }
    },
    /**
     * Emits order to close modal
     */
    async handleClose() {
      this.$emit("close-form", this.close);
    },
  },
};
</script>
<template>
  <div
    class="flex flex-col justify-center p-4 bg-zinc-950 bg-opacity-75 fixed top-0 bottom-0 left-0 right-0"
  >
    <div class="flex justify-center p-2">
      <button class="text-zinc-100 hover:text-primary" @click="handleClose">
        Close
      </button>
    </div>
    <form
      @submit.prevent="handleSubmit"
      action="#"
      method="get"
      enctype="multipart/form-data"
      class="bg-zinc-100 h-1/4 rounded-lg w-full xsm:w-9/12 sm:w-7/12 md:w-5/12 self-center flex flex-col justify-center border-2 border-primary p-2 gap-2"
    >
      <label for="content">Comment here:</label>
      <textarea
        class="border-2 rounded-sm focus:outline-primary"
        name="content"
        id="content"
        v-model="comment.content"
        maxlength="200"
      >
      </textarea>
      <div>
        <button
          type="submit"
          value="Comment"
          class="bg-primary w-full text-center rounded-md hover:bg-opacity-75 hover:text-zinc-100 cursor-pointer p-2"
        >
          <span v-if="!commenting">Comment</span>
          <loader-small v-else class="mx-auto"></loader-small>
        </button>
      </div>
    </form>
  </div>
</template>
