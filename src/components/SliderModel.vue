<script>
import "animate.css";
export default {
  name: "SliderModel",
  //TODO: SliderModel debe recibir una cantidad de objetos determinada por su
  //Componente padre. Debe poder mostrar un slide por objeto, o mas slides si el padre
  //así lo quiere.
  props: { sliderOptions: { max: null, min: null, currentSlide: null } },
  data() {
    return {
      animation: null,
      max: this.$props.sliderOptions.max,
      min: this.$props.sliderOptions.min,
      currentSlide: this.$props.sliderOptions.currentSlide,
      selectedSlide: null,
    };
  },
  async mounted() {
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
    <div ref="slide" class="w-full p-2 mx-auto order-2 flex">
      <slot></slot>
      <!-- TODO: manejar slides el slider recibe el array y muestra de a uno -->
    </div>
    <!-- Buttons -->
    <button
      @click="goBack"
      class="text-zinc-900 hover:text-primary font-nunito font-semibold disabled:text-zinc-300 order-1"
      :disabled="currentSlide == this.min"
    >
      prev
    </button>
    <button
      @click="goNext"
      class="text-zinc-900 hover:text-primary font-nunito font-semibold disabled:text-zinc-300 order-3"
      :disabled="currentSlide == this.max - 1"
    >
      next
    </button>
  </div>
</template>
