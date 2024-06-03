<script>
import { dbUser, getUserById } from "@/services/user";
import { getPostsByUserId } from "@/services/posts";
import LoaderModel from "@/components/LoaderModel.vue";
import SliderModel from "@/components/SliderModel.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";

export default {
  name: "UserProfile",
  components: { LoaderModel, SliderModel, HeaderTwo },
  props: { sliderOptions: { max: null, min: null, currentSlide: null } },
  data() {
    return {
      userData: null,
      userPosts: [],
      slider: {
        max: null,
        min: 0,
        currentSlide: 0,
      },
      loading: true,
      postSearch: false,
      errorMessage: null,
      //TODO: set errorMessage and display modal showing it.
    };
  },
  async mounted() {
    this.userData = { ...dbUser };
    this.userData = await this.getUserProfile();
    this.userData ? (this.loading = false) : "";
    this.userData.description === null
      ? (this.userData.description = "Not Added")
      : null;
    this.userPosts = await getPostsByUserId(this.$route.params.id);
    this.slider.max = this.userPosts.length;
    this.postSearch = true;
    console.log("userPosts in UserProfile: ", this.userPosts);
  },
  unmounted() {
    //TODO: investigar método que nulifique el objeto userData sin
    //necesidad de resetear cada propiedad y el objeto interno.
    this.userData = null;
    console.log(this.userData);
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
  <div v-else class="w-full flex flex-col justify-center">
    <header-two>{{ userData.credentials.username }}'s Profile</header-two>
    <!-- avatar -->
    <div class="w-1/4 self-center">
      <img
        :src="userData.credentials.avatar"
        alt="User's avatar"
        class="w-full"
      />
    </div>
    <div class="flex flex-col items-center gap-4 p-2 my-2 w-full h-full">
      <div class="w-full">
        <h3 class="text-start text-sm text-zinc-600 pb-2 font-semibold">
          About:
        </h3>
        <p
          class="p-4 text-start"
          :class="userData.description == 'Not Added' ? 'text-zinc-400' : ''"
        >
          {{ userData.description }}
        </p>
      </div>
      <div class="w-full">
        <h3 class="text-start text-sm text-zinc-600 pb-2 font-semibold">
          Posts
        </h3>
        <!-- Slider -->
        <!-- TODO: show message if no posts are loaded -->
        <div v-if="userPosts.length > 0">
          <slider-model
            v-if="postSearch"
            :slider-options="slider"
            @sending-current="getCurrent"
          >
            <div
              class="bg-zinc-200 p-4 mx-auto rounded-lg border-2 border-primary order-2 w-full h-full"
            >
              <h4>{{ userPosts[slider.currentSlide].title }}</h4>
              <p>{{ userPosts[slider.currentSlide].content }}</p>
            </div>
          </slider-model>
        </div>
        <div v-else-if="postSearch">
          <p class="text-center">User has no post</p>
        </div>
        <loader-model v-else class="mx-auto"></loader-model>
      </div>
    </div>
  </div>
</template>
