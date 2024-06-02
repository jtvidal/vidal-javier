<script>
import { dbUser, getUserById } from "@/services/user";
import { getPostsByUserId } from "@/services/posts";
import LoaderModel from "@/components/LoaderModel.vue";
import SliderModel from "@/components/SliderModel.vue";

export default {
  name: "UserProfile",
  components: { LoaderModel, SliderModel },
  props: { sliderOptions: { max: null, min: null, currentSlide: null } },
  data() {
    return {
      userData: { ...dbUser },
      userPosts: [],
      slider: {
        max: null,
        min: 0,
        currentSlide: 0,
      },
      loading: true,
      postsAvailable: false,
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
    this.slider.max = this.userPosts.length;
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
    /**
     * Gets currentSlide from child slider component
     * @param current {Number}
     */
    getCurrent(current) {
      this.slider.currentSlide = current;
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
    <div class="flex flex-col items-center gap-4 border-2 p-2 my-2 w-full">
      <div class="w-full">
        <h3 class="text-center pb-2">Description</h3>
        <p
          class="text-center"
          :class="userData.description == 'Not Added' ? 'text-zinc-400' : ''"
        >
          {{ userData.description }}
        </p>
      </div>
      <div class="w-full">
        <h3 class="text-center pb-2">Posts</h3>
        <!-- Slider -->
        <slider-model
          v-if="userPosts.length > 0 ? (postsAvailable = true) : ''"
          v-show="postsAvailable"
          :slider-options="slider"
          @sending-current="getCurrent"
        >
          <!-- TODO: create template that renders a mini post card -->
          <div class="bg-zinc-200 p-4 mx-auto rounded-lg border-2 border-primary order-2 w-full">
            <h4>{{ userPosts[slider.currentSlide].title }}</h4>
            <p>{{ userPosts[slider.currentSlide].content }}</p>
          </div>
        </slider-model>
        <loader-model v-else class="mx-auto"></loader-model>
      </div>
    </div>
  </div>
</template>
