<script>
import { post } from "@/services/posts";
export default {
  name: "PostsForm",
  data() {
    return {
      postData: {
        ...post,
      },
    };
  },
};
</script>
<template>
  <div class="flex justify-center p-4">
    <form
      class="flex flex-col gap-2"
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
