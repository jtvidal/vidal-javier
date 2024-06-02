<script>
import HeaderTwo from "@/components/HeaderTwo.vue";
import LoaderSmall from "@/components/LoaderSmall.vue";
import { dbUser, editUserById, getUserById } from "@/services/user";

// import AvatarViewer from "@/components/AvatarViewer.vue";

export default {
  name: "EditProfile",
  components: { HeaderTwo, LoaderSmall },
  // components: { AvatarViewer },
  data() {
    return {
      user: {
        ...dbUser,
      },
      edit: Boolean,
    };
  },
  async mounted() {
    const userDoc = await getUserById(this.$route.params.id);
    this.user = { ...userDoc };
    console.log("EditProfile user.id: ", this.user.credentials.id);
  },
  methods: {
    async handleSubmit() {
      this.edit = false
      try {
        if (this.user.credentials.username !== "") {
          console.log("entro al if");
          const updateData = {
            "credentials.username": this.user.credentials.username,
            first: this.user.first,
            last: this.user.last,
            description: this.user.description,
          };
          this.edit = await editUserById(
            this.user.credentials.id,
            updateData
          );
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
  <header-two> Edit Profile </header-two>
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
            required
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
        <li>
          <div>
            <label for="description">A description about yourself!</label>
            <textarea
              class="w-full text-sm p-1"
              name="description"
              id="description"
              rows="5"
              maxlength="200"
              placeholder="About you in 200 characters"
              v-model="user.description"
            ></textarea>
          </div>
        </li>
      </ul>
      <div class="flex justify-center p-4">
        <button
          type="submit"
          class="bg-primary text-zinc-100 p-2 rounded-md w-2/4 mt-2 cursor-pointer hover:bg-opacity-70"
        >
          <loader-small v-if="!edit" class="mx-auto"></loader-small>
          <p v-else>Edit Profile</p>
        </button>
      </div>
    </form>
  </div>
</template>
