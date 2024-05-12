<script>
export default {
  name: "AvatarViewer",
  data() {
    return {
      avatarList: [],
      slider: {
        active: false,
        inactive:false,
        max: 10,
        slides: 2,
      },
      namesList: [],
      namesUrl: "https://randomuser.me/api/?results=",
      avatarUrl: "https://api.multiavatar.com/",
    };
  },
  async mounted() {
    await this.getNames(this.namesUrl + this.slider.slides);
    console.log("users: ", this.namesList);
    await this.getAvatars();
    console.log(this.avatarList);
  },
  methods: {
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

    goBack() {},
  },
};
</script>

<template>
  <!-- SLIDER -->
  <div id="slider" class="flex">
    <div class="flex self-center">
      <button class="hover:text-zinc-600">prev</button>
    </div>
    <div
      id="slide"
      class="w-1/2 p-2 border-[0.5px] border-zinc-400 rounded-lg mx-auto"
      v-for="avatar in avatarList"
    >
      <img :src="avatar" alt="Random profile avatar" />
    </div>
    <div class="flex self-center">
      <button class="hover:text-zinc-600">next</button>
    </div>
  </div>
</template>
