<!-- TODO: view for a generic User in db accessible from other users -->
<script>
import { dbUser, getUserById } from "@/services/user";
import LoaderModel from "@/components/LoaderModel.vue";

export default {
  name: "UserProfile",
  components: { LoaderModel },
  data() {
    return {
      userData: { ...dbUser },
      loading: true,
    };
  },
  async mounted() {
    this.userData = await this.getUserProfile();
    this.userData ? (this.loading = false) : "";
  },
  methods: {
    async getUserProfile() {
      try {
        const user = await getUserById(this.$route.params.id);
        if (user) {
          return user;
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        console.error("Error in getUserProfile:", error);
      }
    },
  },
};
</script>

<template>
  <div class="flex justify-center">
    <loader-model v-if="loading"></loader-model>
  </div>
<!-- TODO: continue width user profile view -->
  <div class="w-full flex justify-center">
    <h2>{{ userData.credentials.username }}'s Profile</h2>
  </div>

</template>
