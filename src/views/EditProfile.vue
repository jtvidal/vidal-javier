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
    this.user.username = this.$route.params.username;
    console.log("EditProfile user.id: ", this.user.id);
    console.log("EditProfile user.username: ", this.user.username);
  },
};
</script>

<template>
  <div class="flex justify-end text-sm text-slate-400 font-nunito">
    <button @click="$router.back" class="hover:text-primary hover:underline">Back</button>
  </div>
  <h2 class="text-slate-400 uppercase font-poppins font-bold text-center">
    Edit Profile
  </h2>
  <div>
    <avatar-viewer></avatar-viewer>
  </div>
  <div>
    <p>User ID: {{ user.id }}</p>
  </div>
</template>
