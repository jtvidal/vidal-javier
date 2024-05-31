<script>
export default {
  name: "LoaderModel",
};
</script>
<template>
    <div class="loader"></div>
</template>
<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  aspect-ratio: 1;
  --_c: no-repeat radial-gradient(farthest-side, #41b57e 92%, #0000);
  background: var(--_c) top, var(--_c) left, var(--_c) right, var(--_c) bottom;
  background-size: 15px 15px;
  animation: l7 1s infinite;
}
@keyframes l7 {
  to {
    transform: rotate(0.5turn);
  }
}
</style>
