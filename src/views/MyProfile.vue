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
      },
      userData: { ...dbUser },
    };
  },
  async mounted() {
    await subscribeToAuth((profileUpdater) => (this.userAuth = profileUpdater));
    this.userData = { ...(await this.currentUserData()) };
    console.log("usuario en perfil: ", this.userData);
    this.userData.credentials.id !== null
      ? (this.loading = false)
      : this.loading == true;
  },
  methods: {
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
    <div class="flex justify-end text-sm text-slate-400 font-nunito">
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
    <div class="flex justify-center">
      <div>
        <img src="" alt="" />
      </div>
      <p>
        ¡Welcome
        <span class="font-bold">{{ userData.credentials.username }}</span
        >!
      </p>
    </div>
  </div>
</template>
