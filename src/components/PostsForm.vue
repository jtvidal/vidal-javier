<script>
import { setPost, savePost, post } from "../services/posts";
export default {
  name: "PostsForm",
  params: {},
  data() {
    return {
      postData: {
        ...post,
      },
      closeForm: true,
    };
  },
  methods: {
    /**
     * Saves post into db
     */
    async handleSubmit() {
      const post = await setPost(this.postData);
      await savePost(post);
    },
    async handleClose() {
      this.$emit("closeForm", this.closeForm);
    },
  },
};
</script>
<template>
  <div
    class="p-4 text-zinc-950 flex flex-col justify-center items-center bg-zinc-950 bg-opacity-75 absolute top-0 bottom-0 right-0 left-0"
  >
    <div class="text-zinc-100 flex p-4">
      <button @click="handleClose" class="hover:text-primary">Close</button>
    </div>
    <form
      @submit.prevent="handleSubmit"
      class="h-1/2 w-full xxsm:w-2/3 xsm:w-1/2 md:w-1/3 xl:w-1/8 p-6 rounded-lg flex flex-col gap-2 bg-zinc-100"
      action="#"
      method="post"
      enctype="multipart/form-data"
    >
      <div class="flex flex-col">
        <label for="title">Title</label>
        <input
          class="ps-1 border-2 border-opacity-50 border-primary rounded-md focus:outline-primary focus:outline-2"
          type="text"
          id="title"
          name="title"
          v-model="postData.title"
        />
      </div>
      <div class="flex flex-col">
        <label for="content">Content:</label>
        <textarea
          maxlength="200"
          class="min-h-32 ps-1 border-2 border-opacity-50 border-primary rounded-md focus:outline-primary focus:outline-2"
          type="text"
          id="content"
          name="content"
          v-model="postData.content"
        ></textarea>
      </div>
      <input
        type="submit"
        value="Post"
        class="bg-primary text-zinc-100 p-2 rounded-md w-2/4 self-center mt-2 cursor-pointer hover:bg-opacity-70"
      />
    </form>
  </div>
</template>
