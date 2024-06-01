<!-- TODO: view for a generic User in db accessible from other users -->
<script>
import { dbUser, getUserById } from "@/services/user";

export default {
  name: "UserProfile",
  data() {
    return {
      userData: { ...dbUser },
    };
  },
  async mounted() {
    this.userData = await this.getUserProfile();
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
  <h2>{{ userData.credentials.username }}'s Profile</h2>
  <div></div>
</template>
