<script>
import { subscribeToAuth } from "@/services/auth";
import { saveComment, comment } from "@/services/comment";
import { userAuth } from "@/services/user";
import { Timestamp } from "firebase/firestore";

export default {
  name: "CommentForm",
  // Recieves postId: id from the component PostCar (parent component).
  props: { inPost: String },
  data() {
    return {
      commentBy: { ...userAuth },
      comment: {
        ...comment,
        inPost: this.inPost,
      },
      close: true,
      unsuscribeFromAuth: () => {},
    };
  },
  async mounted() {
    this.unsuscribeFromAuth = await subscribeToAuth(
      (commentUpdater) => (this.commentBy = commentUpdater)
    );
    await this.setComment(this.commentBy);
    console.log("comment in commentForm: ", this.comment);
  },
  methods: {
    /**
     *Sets comment data
     * @param u {Promise<userAuth>} Authenticated user
     */
    async setComment(u) {
      this.comment.date = Timestamp.now();
      this.comment.by = (await u).id;
      this.comment.avatar = (await u).avatar;
    },

    /**
     *
     * @param c {Promise<comment>}
     */
    async handleSubmit(c) {
      this.closeForm = await saveComment(c);
      this.handleClose();
    },
    async handleClose() {
      this.$emit("close-form", this.close);
    },
  },
};
</script>
<template>
  <div
    class="flex flex-col justify-center p-4 bg-zinc-950 bg-opacity-75 absolute top-0 bottom-0 left-0 right-0"
  >
    <div class="flex justify-end p-2">
      <button class="text-zinc-100 hover:text-primary" @click="handleClose">
        Cerrar
      </button>
    </div>
    <form
      @submit.prevent="() => {}"
      action="#"
      method="get"
      enctype="multipart/form-data"
      class="bg-zinc-100 h-1/4 rounded-lg w-full flex flex-col justify-center border-2 border-primary p-2 gap-2"
    >
      <label for="content">Comenta aquí:</label>
      <textarea
        class="border-2 rounded-sm focus:outline-primary"
        name="content"
        id="content"
        v-model="comment.content"
        maxlength="200"
      >
      </textarea>
      <div>
        <input
          type="submit"
          value="Comment"
          class="bg-primary w-full text-center rounded-md hover:bg-opacity-75 hover:text-zinc-100 cursor-pointer"
        />
      </div>
    </form>
  </div>
</template>
