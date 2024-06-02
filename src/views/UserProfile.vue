<script>
import { dbUser, getUserById } from "@/services/user";
import { getPostsByUserId } from "@/services/posts";
import LoaderModel from "@/components/LoaderModel.vue";

export default {
  name: "UserProfile",
  components: { LoaderModel },
  data() {
    return {
      userData: { ...dbUser },
      userPosts: [],
      loading: true,
      errorMessage: null,
      //TODO: set errorMessage and display modal showing it.
    };
  },
  async mounted() {
    this.userData = await this.getUserProfile();
    this.userData ? (this.loading = false) : "";
    this.userData.description === null
      ? (this.userData.description = "Not Added")
      : null;
    this.userPosts = await getPostsByUserId(this.$route.params.id);
    console.log("userPosts in UserProfile: ", this.userPosts);
  },
  unmounted() {
    //TODO: investigar método que nulifique el objeto userData sin
    //necesidad de resetear cada propiedad y el objeto interno.
  },

  methods: {
    /**
     * Gets user profile by id.
     * @returns {dbUser}
     */
    async getUserProfile() {
      try {
        const user = await getUserById(this.$route.params.id);
        if (user) {
          return user;
        } else {
          this.loading = false;
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
  <div v-if="loading" class="flex justify-center">
    <loader-model></loader-model>
  </div>
  <!-- TODO: continue width user profile view -->
  <div v-else class="w-full flex flex-col justify-center">
    <h2>{{ userData.credentials.username }}'s Profile</h2>
    <div>
      <img
        :src="userData.credentials.avatar"
        alt="User's avatar"
        class="w-1/2"
      />
    </div>
    <h3>Description</h3>

    <div>
      <p :class="userData.description == 'Not Added' ? 'text-zinc-400' : ''">
        {{ userData.description }}
      </p>
    </div>
    <div>
      <h3>Posts</h3>
    </div>
  </div>
</template>
