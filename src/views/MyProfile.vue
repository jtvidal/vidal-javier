<script>
import AvatarViewer from "@/components/AvatarViewer.vue";

export default {
  name: "MyProfile",
  components: { AvatarViewer },
  data() {
    return {
      edit: true,
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
      <avatar-viewer v-if="edit == true"></avatar-viewer>
  </div>
</template>
