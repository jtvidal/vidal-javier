<script>
import { dbUser, getUserById } from "@/services/user";
import { getPostsByUserId } from "@/services/posts";
import LoaderModel from "@/components/LoaderModel.vue";
import SliderModel from "@/components/SliderModel.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import TabMenu from "@/components/TabMenu.vue";

export default {
  name: "UserProfile",
  components: { LoaderModel, SliderModel, HeaderTwo, TabMenu },
  props: {
    sliderOptions: { max: null, min: null, currentSlide: null },
    credentials: Object,
  },
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
  <div v-if="loading" class="flex justify-center p-4">
    <loader-model></loader-model>
  </div>
  <div v-else class="w-full flex flex-col justify-center border-primary">
    <tab-menu
      :credentials="userData.credentials"
      v-if="userData && userData.credentials"
    ></tab-menu>
    <div class="flex flex-col bg-primary">
      <header-two class="text-zinc-50"
        >{{ userData.credentials.username }}'s Profile</header-two
      >
      <!-- avatar -->
      <div class="w-1/4 self-center mb-6">
        <img
          :src="userData.credentials.avatar"
          alt="User's avatar"
          class="w-full drop-shadow-lg"
        />
      </div>
    </div>
    <div class="flex flex-col items-center gap-4 w-full h-full">
      <div class="w-full flex flex-col">
        <h3
          class="text-center text-sm text-zinc-100 p-2 font-semibold bg-zinc-500"
        >
          About:
        </h3>
        <p class="p-4 text-center">
          {{ userData.description }}
        </p>
      </div>
      <div class="w-full">
        <h3
          class="text-center text-sm text-zinc-100 bg-zinc-500 p-2 font-semibold"
        >
          Posts
        </h3>
        <!-- Slider -->
        <!-- TODO: show message if no posts are loaded -->
        <div v-if="userPosts.length > 0" class="p-6">
          <slider-model
            v-if="postSearch"
            :slider-options="slider"
            @sending-current="getCurrent"
          >
            <div
              class="bg-zinc-200 p-4 mx-auto flex flex-col rounded-lg border-2 border-primary w-full xsm:w-9/12 sm:w-7/12 lg:w-1/2 xl:w-1/3 h-full"
            >
              <span
                class="self-end text-sm font-bold text-violet-500 bg-zinc-50 rounded-s-full rounded p-2"
                >{{
                  userPosts.indexOf(userPosts[slider.currentSlide]) + 1
                }}</span
              >
              <h4 class="font-semibold">
                {{ userPosts[slider.currentSlide].title }}
              </h4>
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
