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
      this.sendCurrent();
      this.$refs.slide.addEventListener("animationend", this.clearAnimation);
    },
    goBack() {
      this.animation = "animate__animated animate__fadeInLeft";
      this.currentSlide--;
      console.log("Avatar #", this.currentSlide);
      this.sendCurrent();
      this.$refs.slide.addEventListener("animationend", this.clearAnimation);
    },
    /**
     * Takes animation away from an element with $refs.slide
     */
    clearAnimation() {
      this.animation = null;
      this.$refs.slide.removeEventListener("animationend", this.clearAnimation);
    },
    /**
     * Emits currentSlide to its parent
     */
    sendCurrent(){
      this.$emit('sending-current', this.currentSlide);
    }
  },
};
</script>
<template>
  <div id="slider" class="flex gap-2 p-4 w-full">
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
      class="text-zinc-900 hover:text-primary font-nunito font-semibold disabled:text-zinc-300 order-1"
      :disabled="this.currentSlide == this.min"
    >
      prev
    </button>
    <button
      @click="goNext"
      class="text-zinc-900 hover:text-primary font-nunito font-semibold disabled:text-zinc-300 order-3"
      :disabled="this.currentSlide == this.max - 1"
    >
      next
    </button>
  </div>
</template>
