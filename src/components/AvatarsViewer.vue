<script>
export default {
  name: "AvatarsViewer",
  data() {
    return {
      avatarList: [],
      namesList: [],
      namesUrl: "https://randomuser.me/api/?results=5",
      avatarsUrl: "https://api.multiavatar.com/",
    };
  },
  async mounted() {
    await this.getNames(this.namesUrl);
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
    async getAvatars() {
      this.namesList.forEach(async (name) => {
        this.avatarList.push(`${this.avatarsUrl + (await name.first)}.svg`);
      });
    },
  },
};
</script>

<template>
  <div
    class="w-1/2 p-2 border-[0.5px] border-zinc-400 rounded-lg mx-auto"
    v-for="avatar in avatarList"
  >
    <img :src="avatar" alt="Random profile avatar" />
  </div>
</template>
