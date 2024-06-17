<script>
import ErrorModal from "@/components/ErrorModal.vue";
import LoaderSmall from "@/components/LoaderSmall.vue";
import router from "@/router";
import { register, login } from "@/services/auth";
export default {
  name: "LoginRegister",
  props: { errorDescription: String },
  components: { ErrorModal, LoaderSmall },
  data() {
    return {
      email: null,
      password: null,
      success: Boolean,
      errorMessage: "",
      modalClose: true,
      loading: false,
    };
  },
  methods: {
    async closeMessage(x) {
      x ? (this.modalClose = true) : (this.modalClose = false);
    },
    async handleLogin() {
      this.loading = true;
      try {
        this.success = await login(this.email, this.password);
        if (this.success) {
          await router.push("/");
        } else {
          throw new Error("Failed to login");
        }
      } catch (error) {
        this.modalClose = false;
        this.errorMessage = error.code.split("/", 2)[1].split("-").join(" ");
      } finally {
        this.loading = false;
      }
    },
    async handleRegister() {
      this.loading = true;
      try {
        this.success = await register(this.email, this.password);
        if (this.success) {
          await router.push("/");
        } else {
          throw new Error("Failed to register");
        }
      } catch (error) {
        this.modalClose = false;
        this.errorMessage = error.code.split("/", 2)[1].split("-").join(" ");
      } finally {
        this.loading = false;
      }
    },
    // async loginRegister() {
    //   try {
    //     if (this.register == true) {
    //       this.success = await register(this.email, this.password);
    //       this.register = false;
    //     }
    //     if (this.login == true) {
    //       this.success = await login(this.email.this.password);
    //       this.login = false;
    //     }
    //     if (this.success) {
    //       router.push("/");
    //     } else {
    //       if (login) throw new Error("Log in failed");
    //       throw new Error("Registration failed");
    //     }
    //   } catch (error) {
    //     console.error("Error in loginRegister: ", error);
    //     this.errorMessage = error.message;
    //   }
    //   this.errorMessage = "";
    // },
  },
};
</script>
<template>
  <h2 class="font-bold text-zinc-900 text-center uppercase p-2">
    Login / Register
  </h2>
  <div
    class="p-4 w-10/12 sm:w-8/12 lg:w-1/4 flex justify-center mx-auto h-screen"
  >
    <form
      class="flex flex-col w-full p-2 gap-2"
      action="#"
      method="get"
      enctype="multipart/form-data"
    >
      <div class="flex flex-col">
        <label for="mail" class="cursor-pointer">Email</label>
        <input
          class="bg-zinc-200 ps-2"
          type="email"
          name="mail"
          id="mail"
          v-model="email"
          required
        />
      </div>
      <div class="flex flex-col">
        <label for="pass" class="cursor-pointer">Password</label>
        <input
          class="bg-zinc-200 ps-2"
          type="password"
          name="pass"
          id="pass"
          v-model="password"
          required
        />
      </div>
      <div class="flex gap-2 justify-center">
        <div class="border-2 border-zinc-50 mt-4 w-2/5 self-center rounded-lg">
          <div v-if="loading" class="p-2 w-full">
            <loader-small class="mx-auto"></loader-small>
          </div>
          <div v-else>
            <input
              @click.prevent="handleLogin"
              type="button"
              value="Login"
              class="p-2 w-full hover:text-zinc-50 cursor-pointer ease-in-out duration-200"
            />
          </div>
        </div>
        <div class="border-2 border-zinc-50 mt-4 w-2/5 self-center rounded-lg">
          <div v-if="loading" class="p-2 w-full">
            <loader-small class="mx-auto"></loader-small>
          </div>
          <div v-else>
            <input
              @click.prevent="handleRegister"
              type="button"
              value="Register"
              class="p-2 w-full hover:text-zinc-50 cursor-pointer ease-in-out duration-200"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
  <error-modal
    v-if="modalClose == false"
    @close-modal="closeMessage"
    :error-description="errorMessage"
  ></error-modal>
</template>
