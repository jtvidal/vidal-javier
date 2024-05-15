<script>
import AvatarViewer from "@/components/AvatarViewer.vue";

export default {
  name: "MyProfile",
  components: { AvatarViewer },
  data() {
    return {
      username: null,
      mail: null,
      first: null,
      last: null,
      avatar: null,
      description: null,
    };
  },
};
</script>

<template>
  <div>
      <avatar-viewer></avatar-viewer>
  </div>
</template>
