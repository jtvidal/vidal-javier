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
      selectedSlide: null,
    };
  },
  async mounted() {
    this.sliderItems = await this.itemList;
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
    /**
     * Takes animation away from an element with $refs.slide
     */
    clearAnimation() {
      this.animation = null;
      this.$refs.slide.removeEventListener("animationend", this.clearAnimation);
    },
  },
};
</script>
<template>
  <div id="slider" class="flex gap-2 bg-gray-200 m-2 p-4">
    <!-- SLIDE -->
    <div ref="slide" class="w-1/2 p-2 mx-auto order-2">
      <!-- Image -->
      <img
        :src="itemList[currentSlide]"
        alt="Random profile avatar"
        :class="animation"
      />
    </div>
    <!-- Buttons -->
    <button
      @click="goBack"
      class="hover:text-zinc-600 disabled:text-zinc-300 order-1"
      :disabled="this.currentSlide == this.min"
    >
      prev
    </button>
    <button
      @click="goNext"
      class="hover:text-zinc-600 disabled:text-zinc-300 order-3"
      :disabled="this.currentSlide == this.max - 1"
    >
      next
    </button>
  </div>
</template>
