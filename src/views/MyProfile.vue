<script>
export default {
  name: "MyProfile",
  data() {
    return {
      userAuth: {
        id: null,
        email: null,
      },
    };
  },
};
</script>

<template>
  <h2 class="font-nunito font-bold text-slate-400 text-center p-2">
    My profile
  </h2>
  <div class="flex">
    <div>
      <img src="" alt="" />
    </div>
    <p>Name</p>
  </div>
</template>
