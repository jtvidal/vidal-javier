<script>
export default {
  name: "AvatarViewer",
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
      results.forEach((user) => this.namesList.push(user.name));
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
    goNext() {
      this.slider.currentSlide++;
      console.log(this.slider.currentSlide);
    },
    goBack() {
      this.slider.currentSlide--;
    },
  },
};
</script>

<template>
  <!-- SLIDER -->
  <div id="slider" class="flex">
    <!-- Button prev -->
    <div class="flex self-center">
      <button
        @click="goBack"
        class="hover:text-zinc-600 disabled:text-zinc-300"
        :disabled="this.slider.currentSlide == this.slider.min"
      >
        prev
      </button>
    </div>
    <!-- SLIDE -->
    <div
      id="slide"
      class="w-1/2 p-2 border-[0.5px] border-zinc-400 rounded-lg mx-auto"
    >
      <img :src="avatarList[slider.currentSlide]" alt="Random profile avatar" />
    </div>
    <!-- Button next -->
    <div class="flex self-center">
      <button
        @click="goNext"
        class="hover:text-zinc-600 disabled:text-zinc-300"
        :disabled="this.slider.currentSlide == this.slider.max - 1"
      >
        next
      </button>
    </div>
  </div>
</template>
