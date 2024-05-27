<script>
export default {
  name: "PostCard",
  props: { postObject: Object },
  data() {
    return {
      postCard: this.postObject,
    };
  },
  async mounted() {
    console.log("PostCard: ", this.$props.postObject);
    await this.loadPostCard(this.$props.postObject);
  },
  methods: {
    async loadPostCard(post) {
      this.postCard = await post;
    },
  },
};
</script>
<template>
  <div
  id="post-card"
    class="w-full xsm:w-2/3 sm:w-2/5 lg:w-1/4 shadow-md shadow-zinc-400 pt-4 flex flex-col items-center border-2 border-primary rounded-lg"
  >
    <h3>{{ postCard.title }}</h3>
    <div class="p-4">
      <p>{{ postCard.content }}</p>
    </div>
    <div class="flex w-full justify-center">
      <div class="w-1/2">
        <button
          class="w-full p-1 bg-primary hover:bg-opacity-80 hover:text-zinc-100"
        >
          Like
        </button>
      </div>
      <div class="w-1/2">
        <button
          class="w-full p-1 bg-primary hover:bg-opacity-80 hover:text-zinc-100"
        >
          Comment
        </button>
      </div>
    </div>
  </div>
</template>
