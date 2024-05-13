<script>
import SliderModel from "./SliderModel.vue";
export default {
  name: "AvatarViewer",
  components: { SliderModel },
  props: { sliderOptions: null, itemList: null },
  data() {
    return {
      avatarList: [],
      slider: {
        max: 10,
        min: 0,
        currentSlide: 0,
      },
      namesList: [],
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
      results.forEach(async(user) => this.namesList.push(await user.name));
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
  },
};
</script>

<template>
  <!-- SLIDER COMPONENT -->
  <slider-model :item-list="avatarList" :slider-options="slider"></slider-model>
</template>
