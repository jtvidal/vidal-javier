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
    this.sliderItems = await this.$props.itemList;
    console.log("Items in SliderModel (UserView): ", this.sliderItems);
    this.max = await this.$props.sliderOptions.max;
    this.min = await this.$props.sliderOptions.min;
    this.currentSlide = await this.$props.sliderOptions.currentSlide;
  },
  methods: {
    goNext() {
      this.animation = "animate__animated animate__fadeInRight";
      this.currentSlide++;
      this.sendCurrent();
      this.$refs.slide.addEventListener("animationend", this.clearAnimation);
    },
    goBack() {
      this.animation = "animate__animated animate__fadeInLeft";
      this.currentSlide--;
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
    sendCurrent() {
      this.$emit("sending-current", this.currentSlide);
    },
  },
};
</script>
<template>
  <div id="slider" class="flex gap-2 p-4 w-full">
    <!-- SLIDE -->
    <div ref="slide" class="w-1/2 p-2 mx-auto order-2 flex">
      <!-- TODO: manejar slides el slider recibe el array y muestra de a uno -->
      <slot></slot>
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
