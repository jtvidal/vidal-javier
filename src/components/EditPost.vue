<script>
import { post } from "@/services/posts";
import LoaderSmall from "./LoaderSmall.vue";
export default {
  name: "EditPost",
  props: { idPost: String },
  emits: ["closeForm"],
  components:{LoaderSmall},
  data() {
    return {
      postData: { ...post },
      formOptions: {
        open: false,
        dataId: this.$props.idPost,
      },
      loading: false,
    };
  },
  mounted() {
    console.log("postId id EditPost: ", this.formOptions.dataId);
  },
  methods: {
    async handleSubmit() {
      console.log("handleSubmit in EditPost");
    },
    async handleClose() {
      this.formOptions.open = false;
      this.$emit("closeForm", this.formOptions.open);
    },
  },
};
</script>

<template>
  <div
    class="p-4 text-zinc-950 flex flex-col justify-center items-center bg-zinc-950 bg-opacity-75 fixed top-0 bottom-0 right-0 left-0"
  >
    <div class="text-zinc-100 flex p-4">
      <button @click="handleClose" class="hover:text-primary font-semibold">
        Close
      </button>
    </div>
    <form
      @submit.prevent="handleSubmit"
      class="shadow-zinc-950 shadow-lg w-full xxsm:w-2/3 md:w-1/3 xl:w-1/8 p-6 rounded-lg flex flex-col gap-2 bg-zinc-100"
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
      <button
        type="submit"
        class="bg-primary text-zinc-100 p-2 rounded-md w-2/4 self-center mt-2 cursor-pointer hover:bg-opacity-70 flex justify-center"
      >
        <loader-small v-if="loading" class="bg-zinc-100"></loader-small>
        <p v-else>Edit Post</p>
      </button>
    </form>
  </div>
</template>
