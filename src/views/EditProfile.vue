<script>
import ErrorModal from "@/components/ErrorModal.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import LoaderModel from "@/components/LoaderModel.vue";
import LoaderSmall from "@/components/LoaderSmall.vue";
import TabMenu from "@/components/TabMenu.vue";
import { subscribeToAuth, updateAuthUser } from "@/services/auth";
import { dbUser, editUserById, getUserById } from "@/services/user";

// import AvatarViewer from "@/components/AvatarViewer.vue";

export default {
  name: "EditProfile",
  components: { HeaderTwo, LoaderSmall, TabMenu, LoaderModel, ErrorModal },
  // components: { AvatarViewer },
  data() {
    return {
      authUser: {
        id: null,
        username: null,
        email: null,
        avatar: null,
      },
      user: {
        ...dbUser,
      },
      editing: false,
      loading: true,
      success: Boolean,
      previewImg: null,
      unsuscribeFromAuth: () => {},
    };
  },

  async mounted() {
    this.unsuscribeFromAuth = await subscribeToAuth(
      (editProfileUpdater) => (this.authUser = editProfileUpdater)
    );
    this.user = await getUserById(this.authUser.id);
    this.user.credentials ? (this.loading = false) : "";
    console.log("EditProfile user.id: ", this.user.credentials.id);
  },
  unmounted() {
    this.unsuscribeFromAuth();
  },
  methods: {
    async handleSubmit() {
      this.editing = true;
      try {
        if (this.user.credentials.username !== "") {
          await updateAuthUser(this.user.credentials);
          const updateData = {
            //TODO: agregar avatar
            "credentials.username": this.user.credentials.username,
            first: this.user.first,
            last: this.user.last,
            description: this.user.description,
          };
          this.success = editUserById(this.user.credentials.id, updateData);
        } else {
          console.log("entro en else");
          throw new Error("Error editing profile");
        }
      } catch (error) {
        console.error("Profile not updated: ", error);
      } finally {
        this.editing = false;
      }
    },
  },
};
</script>

<template>
  <header-two> Edit Profile </header-two>
  <div v-if="loading || editing">
    <loader-model class="mx-auto"></loader-model>
  </div>
  <div v-else>
    <tab-menu :credentials="authUser" v-if="authUser.id !== null"></tab-menu>
    <!-- <div>
    <avatar-viewer></avatar-viewer>
  </div> -->
    <div class="w-full md:w-7/12 xl:w-1/2 mx-auto">
      <form
        @submit.prevent="handleSubmit"
        action="#"
        method="post"
        enctype="multipart/form-data"
        class="w-10/12 mx-auto p-2"
      >
        <div>
          <p>Current Avatar:</p>
          <div class="w-8/12 my-4 mx-auto">
            <img
              v-if="previewImg != null"
              :src="previewImg"
              alt="Preview Profile Picture"
            />
            <img v-else :src="authUser.avatar" alt="Profile Picture" />
            <div class="flex w-full">
              <label for="avatar">change avatar: </label>
              <input type="file" name="avatar" id="avatar" />
            </div>
          </div>
        </div>
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
            <p>Edit Profile</p>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
