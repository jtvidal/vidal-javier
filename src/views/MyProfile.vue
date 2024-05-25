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
      userAuth: {
        id: null,
        email: null,
        username: null,
        avatar: null,
      },
      userData: { ...dbUser },
      unsuscribeFromAuth: () => {},
    };
  },
  async mounted() {
    this.unsuscribeFromAuth = await subscribeToAuth(
      (profileUpdater) => (this.userAuth = profileUpdater)
    );
    this.userAuth.id !== null ? await this.loadData() : (this.loading = true);
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
        const user = await getUserById(this.userAuth.id);
        this.userData = user;
        this.loading = this.userData.credentials.id === null;
      } catch (error) {
        console.error("User could not be loaded: ", error);
      }
    },
  },
};
</script>
<template>
  <h2 class="font-poppins uppercase font-bold text-slate-400 text-center p-2">
    ¡Welcome {{ userData.credentials.username }}!
  </h2>
  <loader-model v-if="loading == true" class="mx-auto p-2 mt-4"></loader-model>
  <div v-else>
    <div
      class="flex justify-center gap-4 text-sm text-slate-400 font-nunito p-2 mt-2"
    >
      <button
        @click="$router.push(`/my-posts/${this.userAuth.id}`)"
        class="hover:text-primary hover:underline"
      >
        Your Posts
      </button>
      <button
        @click="$router.push(`/edit-profile/${this.userAuth.id}`)"
        class="hover:text-primary hover:underline"
      >
        Edit Profile
      </button>
    </div>
    <div class="flex flex-col justify-center p-2 mt-2 gap-4">
      <div class="w-2/5 self-center">
        <img
          class="w-full"
          :src="userData.credentials.avatar"
          alt="Profile Avatar"
        />
      </div>
    </div>
  </div>
</template>
