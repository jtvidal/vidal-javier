<script>
import { subscribeToAuth } from "@/services/auth";

export default {
  name: "MyProfile",
  data() {
    return {
      userAuth: {
        id: null,
        email: null,
        username: null,
      },
    };
  },
  async mounted() {
    await subscribeToAuth((profileUpdater) => (this.userAuth = profileUpdater));
  },
};
</script>

<template>
  <div class="flex justify-end text-sm text-slate-400 font-nunito">
    <button
      @click="$router.push(`/edit-profile/${this.userAuth.id}/${this.userAuth.username}`)"
      class="hover:text-primary hover:underline"
    >
      Edit Profile
    </button>
  </div>
  <h2 class="font-poppins uppercase font-bold text-slate-400 text-center p-2">
    My profile
  </h2>
  <div class="flex justify-center">
    <div>
      <img src="" alt="" />
    </div>
    <p>
      ¡Welcome <span class="font-bold">{{ userAuth.username }}</span
      >!
    </p>
  </div>
</template>
