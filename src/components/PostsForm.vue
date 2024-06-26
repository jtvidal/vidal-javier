<script>
import { setPost, savePost, post } from "../services/posts";
import { subscribeToAuth } from "@/services/auth";
import LoaderSmall from "./LoaderSmall.vue";
import { serverTimestamp } from "firebase/firestore";
export default {
  name: "PostsForm",
  components: { LoaderSmall },
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
      closeForm: true,
      loading: false,
      unsuscribeFromAuth: () => {},
    };
  },
  async mounted() {
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
          //TODO: closeForm es true o false ahora. Si es false debiera
          //saber que no se pudo guardar el post. Entonces deberia
          //condicionar que se aplique alguna clase (border rojo etc)
          //a algun elemento del form que haya sido erroneo o al menos
          //un mensaje tipo <p> en el form que indique que no se pudo
          //guardar el post y quede abierto el post para completarlo o
          //cerrarlo con su botón correspondiente
          if (this.closeForm === true) {
            this.loading = false;
            this.handleClose();
          } else {
            this.loading = false;
            throw new Error("Post could not be saved");
          }
        }
      } catch (error) {
        console.error("Error in handleSubmit: ", error);
      }
    },
    async handleClose() {
      this.$emit("closeForm", this.closeForm);
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
        <p v-else>Post</p>
      </button>
    </form>
  </div>
</template>
