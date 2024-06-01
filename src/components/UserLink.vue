<script>
export default {
  name: "UserLink",
  props: { userId: String },
  data() {
    return {
      by: this.$props.userId,
    };
  },
};
</script>

<template>
  <router-link
    :to="`/user-profile/${by}`"
    class="hover:text-yellow-500 ease-in-out duration-100"
    ><slot></slot
  ></router-link>
</template>
