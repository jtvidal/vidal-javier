<script>
import AvatarViewer from "@/components/AvatarViewer.vue";

export default {
  name: "EditProfile",
  components: { AvatarViewer },
  data() {
    return {
      user: {
        id: null,
        username: null,
        mail: null,
        first: null,
        last: null,
        avatar: null,
        description: null,
      },
    };
  },
  mounted() {
    this.user.id = this.$route.params.id;
    console.log("EditProfile user.id: ", this.user.id);
  },
};
</script>

<template>
  <div>
    <avatar-viewer></avatar-viewer>
  </div>
  <div>
    <p>User ID: {{ user.id }}</p>
  </div>
</template>
