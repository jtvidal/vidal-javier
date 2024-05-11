<script>
import AvatarsViewer from '@/components/AvatarsViewer.vue';

export default {
  name: "HomeView",
  components: {AvatarsViewer}
};
</script>
<template>
  <div>
    <p class="font-bold text-slate-400 text-center">HOME</p>
    <avatars-viewer></avatars-viewer>
  </div>
</template>
