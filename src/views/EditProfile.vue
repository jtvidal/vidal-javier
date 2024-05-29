<script>
import { dbUser, editUserById, getUserById } from "@/services/user";

// import AvatarViewer from "@/components/AvatarViewer.vue";

export default {
  name: "EditProfile",
  // components: { AvatarViewer },
  data() {
    return {
      user: {
        ...dbUser,
      },
    };
  },
  async mounted() {
    const userDoc = await getUserById(this.$route.params.id);
    this.user = { ...userDoc };
    console.log("EditProfile user.id: ", this.user.credentials.id);
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.user.credentials.username !== "") {
          console.log("entro al if");
          const updateData = {
            "credentials.username": this.user.credentials.username,
            first: this.user.first,
            last: this.user.last,
          };
          await editUserById(this.user.credentials.id, updateData);
        } else {
          console.log("entro en else");
          throw new Error("Error editing profile");
        }
      } catch (error) {
        console.error("Profile not updated: ", error);
      }
    },
  },
};
</script>

<template>
  <div class="flex justify-end text-sm text-slate-400 font-nunito">
    <button @click="$router.back" class="hover:text-primary hover:underline">
      Back
    </button>
  </div>
  <h2 class="text-slate-400 uppercase font-poppins font-bold text-center">
    Edit Profile
  </h2>
  <!-- <div>
    <avatar-viewer></avatar-viewer>
  </div> -->
  <div class="w-full">
    <form
      @submit.prevent="handleSubmit"
      action="#"
      method="post"
      enctype="multipart/form-data"
      class="w-10/12 mx-auto p-2"
    >
      <ul class="flex flex-col gap-4">
        <li class="flex flex-col">
          <label for="username">Username</label>
          <input
            class="ps-2"
            type="text"
            name="username"
            id="username"
            v-model="user.credentials.username"
          />
        </li>
        <li class="flex flex-col">
          <label for="first">First Name</label>
          <input
            class="ps-2"
            type="text"
            name="first"
            id="first"
            v-model="user.first"
          />
        </li>
        <li class="flex flex-col">
          <label for="last">Last Name</label>
          <input
            class="ps-2"
            type="text"
            name="last"
            id="last"
            v-model="user.last"
          />
        </li>
      </ul>
      <div class="flex justify-center p-4">
        <input
          class="bg-primary text-zinc-100 p-2 rounded-md w-2/4 mt-2 cursor-pointer hover:bg-opacity-70"
          type="submit"
          value="Edit Profile"
        />
      </div>
    </form>
  </div>
</template>
