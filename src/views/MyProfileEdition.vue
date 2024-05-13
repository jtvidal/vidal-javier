<script>
import AvatarViewer from '@/components/AvatarViewer.vue';

export default {
  name: "MyProfileEdition",
  components:{AvatarViewer},
  data() {
    return {
      username: null,
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
