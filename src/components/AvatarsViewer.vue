<script>
export default {
  name: "AvatarsViewer",
  data() {
    return {
      avatarList: [],
      namesList: [],
      fetchUrl: "https://randomuser.me/api/?results=5",
    };
  },
  async mounted() {
    await this.getNames(this.fetchUrl);
    console.log('users: ', this.avatarList);
  },
  methods: {
    async getNames(url) {
      const raw = await fetch(url);
      const data = await raw.json();
      const results = await data.results;
      results.forEach((user) => this.avatarList.push(user.name));
    },
  },
};
</script>

<template>
  <div>
    <p></p>
  </div>
</template>
