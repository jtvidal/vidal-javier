<script>
import { setPost, savePost, post, editPost } from "../services/posts";
import { subscribeToAuth } from "@/services/auth";
import LoaderSmall from "./LoaderSmall.vue";
import { serverTimestamp, updateDoc } from "firebase/firestore";
import { getFile, uploadFile } from "@/services/storage";
import { userAuth } from "@/services/user";
export default {
  name: "PostsForm",
  components: { LoaderSmall },
  emits: ["closeForm"],
  data() {
    return {
      authUser: {
        id: null,
        avatar: null,
        email: null,
        username: null,
      },
      postData: {
        ...post,
      },
      savedImg: null,
      previewImg: null,
      closeForm: {
        success: Boolean,
        postSavedId: String,
      },
      loading: false,
      unsuscribeFromAuth: () => {},
    };
  },

  async mounted() {
    if (this.postId) {
      console.log("postId en PostForm: ", this.postId);
    }
    this.unsuscribeFromAuth = await subscribeToAuth(
      (postsUpdater) => (this.authUser = postsUpdater)
    );
    this.postedBy(
      this.authUser.id,
      this.authUser.username,
      this.authUser.avatar
    );
    console.log("User in Posts:", this.authUser);
  },
  unmounted() {
    this.unsuscribeFromAuth();
  },

  methods: {
    /**
     *Sets user credentials into post data
     * @param id {Promise<String>}
     * @param username {Promise<String>}
     */
    async postedBy(id, username, avatar) {
      this.postData.by = await id;
      this.postData.username = await username;
      this.postData.avatar = await avatar;
    },

    /**
     * Saves post into db
     */
    async handleSubmit() {
      try {
        this.loading = true;
        this.postData.date = serverTimestamp();
        if (this.postData.date !== null) {
          let post = await setPost(this.postData);
          console.log("post in PostForm (handleSubmit): ", post);
          this.closeForm = await savePost(post);
          console.log("closeForm in handleSubmit (PostForm): ", this.closeForm);
          await uploadFile(
            `posts/${this.closeForm.postSavedId}/post-img.jpg`,
            this.savedImg
          );
          let routeImg = await getFile(
            `posts/${this.closeForm.postSavedId}/post-img.jpg`
          );
          console.log("routeImg in handleSubmit (PostForm): ", routeImg);
          await editPost(this.closeForm.postSavedId, { img: routeImg });

          if (this.closeForm.success === true) {
            this.loading = false;
            this.handleClose();
          } else {
            this.loading = false;
            throw new Error("Post could not be saved");
          }
        }
      } catch (error) {
        console.error("Error in handleSubmit: ", error);
      } finally {
        this.loading = false;
      }
    },

    /**
     *
     */
    async handleClose() {
      this.$emit("closeForm", this.closeForm);
    },

    /**
     * Gets input file value
     * @param fileEvent
     */
    getImg(fileEvent) {
      // console.log("files in getImg (PostForm): ", fileEvent.target.files);
      this.savedImg = fileEvent.target.files[0];
      // console.log("file selected: ", this.postData.img);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.previewImg = reader.result;
        // console.log("file content in getImg (PostForm): ", reader.result);
      });
      reader.readAsDataURL(this.savedImg);
    },
  },
};
</script>
<template>
  <div
    class="text-zinc-950 flex flex-col justify-center items-center bg-zinc-950 bg-opacity-75 fixed top-0 bottom-0 right-0 left-0"
  >
    <div class="text-zinc-100 flex p-4">
      <button @click="handleClose" class="hover:text-primary font-semibold">
        Close
      </button>
    </div>
    <form
      @submit.prevent="handleSubmit"
      class="shadow-zinc-950 shadow-lg w-full xsm:w-2/3 lg:w-1/3 p-6 rounded-lg flex flex-col gap-2 bg-zinc-100"
      action="#"
      method="post"
      enctype="multipart/form-data"
    >
      <!-- image -->
      <div class="flex flex-col justify-center gap-2">
        <!-- preview -->
        <div
          v-if="this.previewImg !== null"
          class="max-h-96 max-w-96 self-center"
        >
          <img :src="previewImg" alt="Preview image" class="w-8/12 m-auto" />
        </div>
        <div class="self-center flex justify-center w-10/12">
          <input type="file" id="image" @change="getImg" class="text-sm" />
        </div>
      </div>
      <!-- title -->
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
      <!-- content -->
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
        <p v-else>Post</p>
      </button>
    </form>
  </div>
</template>
