<script>
import { subscribeToAuth } from "@/services/auth";
import { getUserById, dbUser } from "@/services/user";
import Loader from "@/components/Loader.vue";

export default {
  name: "MyProfile",
  components: { Loader },
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
    };
  },
  async mounted() {
    await subscribeToAuth((profileUpdater) => (this.userAuth = profileUpdater));
    console.log("usuario en perfil: ", this.userData);
    this.userAuth.id !== null ? await this.loadData() : (this.loading = true);
  },
  methods: {
    async loadData() {
      const user = await this.currentUserData();
      this.userData.credentials = await this.loadCredentials(user);
      this.loading = this.userData.credentials.id === null;
    },

    async loadCredentials(user) {
      const credentials = await user.credentials;
      return credentials;
    },
    /**
     *Gets user data of the current Authenticated User from db.
     */
    async currentUserData() {
      const user = await getUserById(this.userAuth.id);
      return user;
    },
  },
};
</script>
<template>
  <h2 class="font-poppins uppercase font-bold text-slate-400 text-center p-2">
    My profile
  </h2>
  <loader v-if="loading == true" class="mx-auto p-2 mt-4"></loader>
  <div v-else>
    <div class="flex justify-end text-sm text-slate-400 font-nunito p-2 mt-2">
      <button
        @click="
          $router.push(
            `/edit-profile/${this.userAuth.id}/${this.userAuth.username}`
          )
        "
        class="hover:text-primary hover:underline"
      >
        Edit Profile
      </button>
    </div>
    <div class="flex flex-col items-center p-2 mt-2 gap-4">
        <img
          class="w-2/5"
          :src="userData.credentials.avatar"
          alt="Profile Avatar"
        />
      <p>
        ¡Welcome
        <span class="font-bold">{{ userData.credentials.username }}</span
        >!
      </p>
    </div>
  </div>
</template>
