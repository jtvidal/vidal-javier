<script>
import { subscribeToAuth } from "@/services/auth";
import { getUserById, dbUser } from "@/services/user";
import LoaderModel from "@/components/LoaderModel.vue";

export default {
  name: "MyProfile",
  components: { LoaderModel },
  data() {
    return {
      loading: true,
      // userAuth: {
      //   id: null,
      //   email: null,
      //   username: null,
      //   avatar: null,
      // },
      yourPosts: false,
      userData: { ...dbUser },
      unsuscribeFromAuth: () => {},
    };
  },
  async mounted() {
    this.unsuscribeFromAuth = await subscribeToAuth(
      (profileUpdater) => (this.userData.credentials = profileUpdater)
    );
    this.userData.credentials.id !== null ? await this.loadData() : (this.loading = true);
    console.log("usuario en perfil: ", this.userData);
  },
  unmounted() {
    this.unsuscribeFromAuth();
  },
  methods: {
    /**
     *Loads Authenticated user data form db.
     */
    async loadData() {
      try {
        const user = await getUserById(this.userData.credentials.id);
        this.userData = user;
        this.loading = this.userData.credentials.id === null;
      } catch (error) {
        console.error("User could not be loaded: ", error);
      }
    },

    seePosts() {
      this.yourPosts = !this.yourPosts;
    },
  },
};
</script>
<template>
  <!-- header -->
  <h2 class="font-poppins uppercase font-bold text-slate-400 text-center p-6">
    ¡Welcome {{ userData.credentials.username }}!
  </h2>
  <!-- loader -->
  <loader-model v-if="loading == true" class="mx-auto p-2 mt-4"></loader-model>

  <!-- profile viewer -->
  <div
    v-else
    class="border-2 flex flex-col p-4 gap-2 transition-flex"
  >
    <!-- top buttons -->
    <div
      class="flex justify-center gap-4 text-sm text-slate-400 font-nunito p-2 mt-2 border-2"
    >
      <!-- <button
        @click="$router.push('/my-posts')"
        class="hover:text-primary ease-in-out duration-200 border-2"
      >
        Your Posts
      </button> -->
      <button
        @click="$router.push('my-posts')"
        class="hover:text-primary ease-in-out duration-200 border-2"
      >
        Your Posts
      </button>
      <button
        @click="$router.push(`/edit-profile/${userData.credentials.id}`)"
        class="hover:text-primary ease-in-out duration-200 border-2"
      >
        Edit Profile
      </button>
    </div>
    <!-- user avatar -->
    <div class="flex flex-col justify-center p-2 mt-2 gap-4 border-2">
      <div class="w-2/5 lg:w-1/4 self-center border-2">
        <img
          class="w-full"
          :src="userData.credentials.avatar"
          alt="Profile Avatar"
        />
      </div>
    </div>
  </div>
</template>


