<script>
import "animate.css";
export default {
  name: "SliderModel",
  props: { itemList: null, sliderOptions: null },
  data() {
    return {
      sliderItems: [],
      animation: null,
      max: null,
      min: null,
      currentSlide: null,
    };
  },
  async mounted() {
    this.sliderItems = await this.itemList;
    console.log("Avatar #", this.currentSlide);
    this.max = this.sliderOptions.max;
    this.min = this.sliderOptions.min;
    this.currentSlide = this.sliderOptions.currentSlide;
  },
  methods: {
    goNext() {
      this.animation = "animate__animated animate__fadeInRight";
      this.currentSlide++;
      console.log("Avatar #", this.currentSlide);
      this.$refs.slide.addEventListener("animationend", this.clearAnimation);
    },
    goBack() {
      this.animation = "animate__animated animate__fadeInLeft";
      this.currentSlide--;
      console.log("Avatar #", this.currentSlide);
      this.$refs.slide.addEventListener("animationend", this.clearAnimation);
    },
    clearAnimation() {
      this.animation = null;
      this.$refs.slidel.removeEventListener(
        "animationend",
        this.clearAnimation
      );
    },
  },
};
</script>
<template>
  <div id="slider" class="flex flex-col gap-2">
    <!-- SLIDE -->
    <div ref="slide" class="w-1/2 p-2 mx-auto">
      <!-- Image -->
      <img
        :src="itemList[currentSlide]"
        alt="Random profile avatar"
        :class="animation"
      />
    </div>
    <!-- Buttons -->
    <div class="flex self-center gap-4">
      <button
        @click="goBack"
        class="hover:text-zinc-600 disabled:text-zinc-300"
        :disabled="this.currentSlide == this.min"
      >
        prev
      </button>
      <button
        @click="goNext"
        class="hover:text-zinc-600 disabled:text-zinc-300"
        :disabled="this.currentSlide == this.max - 1"
      >
        next
      </button>
    </div>
  </div>
</template>
