<script>
import SliderModel from "./SliderModel.vue";
export default {
  name: "AvatarViewer",
  components: { SliderModel },
  props: { sliderOptions: null, itemList: null },
  data() {
    return {
      slider: {
        max: 10,
        min: 0,
        currentSlide: 5,
      },
      namesList: [],
      avatarList: [],
      namesUrl: "https://randomuser.me/api/?results=",
      avatarUrl: "https://api.multiavatar.com/",
    };
  },
  async mounted() {
    await this.getNames(this.namesUrl + this.slider.max);
    console.log("users: ", this.namesList);
    await this.getAvatars();
    console.log(this.avatarList);
  },
  methods: {
    /**
     *
     * @param url the url to fetch data
     */
    async getNames(url) {
      const raw = await fetch(url);
      const data = await raw.json();
      const results = await data.results;
      results.forEach(async (user) => this.namesList.push(await user.name));
    },
    /**
     * Creates a new url using a random user name from nameList[]
     * as an endpoint to the base (avatarUrl) of Multiavatar API
     */
    async getAvatars() {
      this.namesList.forEach(async (name) => {
        this.avatarList.push(`${this.avatarUrl + (await name.first)}.svg`);
      });
    },

    /**
     * This function must be used in parent component of a SliderModel component.
     * Recieves the currentSlide form component SliderModel
     */
    getCurrent(current){
      this.slider.currentSlide = current;
      console.log('current slide: ',this.slider.currentSlide);
    }
  },
};
</script>

<template>
  <!-- SLIDER COMPONENT -->
  <div class="mx-auto flex flex-col gap-2 sm:w-10/12 md:w-8/12">
    <div class="bg-zinc-100 border-[1px] border-zinc-700 p-2 rounded-xl">
      <h3 class="text-center text-zinc-950">Select your <span class="font-semibold">avatar</span>!</h3>
      <slider-model
        :item-list="avatarList"
        :slider-options="slider"
        @sending-current="getCurrent"
      ></slider-model>
    </div>
    <form
      action="#"
      method="get"
      enctype="multipart/form-data"
      class="flex flex-col"
    >
      <input
        @submit.prevent=""
        type="submit"
        value="Select"
        class="w-full bg-primary hover:bg-opacity-80 cursor-pointer p-3 text-gray-100 hover:text-gray-50 uppercase font-semibold rounded-xl"
      />
    </form>
  </div>
</template>
