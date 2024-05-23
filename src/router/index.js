import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginRegister from "@/views/LoginRegister.vue";
import MyProfile from "@/views/MyProfile.vue";
import EditProfile from "@/views/EditProfile.vue";
import PublicationsView from "@/views/PublicationsView.vue";
import PublicationForm from "@/views/PublicationForm.vue"
import { subscribeToAuth } from "@/services/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login-register",
    name: "login-register",
    component: LoginRegister,
  },
  {
    path: "/profile",
    name: "profile",
    component: MyProfile,
  },
  {
    path: "/edit-profile/:id",
    name: "edit-profile",
    component: EditProfile,
  },
  {
    path: "/my-publications/:id",
    name: "my-publications",
    component: PublicationsView,
  },
  {
    path: "/publication-form",
    name: "publication-form",
    component: PublicationForm,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

let authUser = {
  id: null,
  email: null,
};

await subscribeToAuth((routerUpdater) => (authUser = routerUpdater));

router.beforeEach((to, from) => {
  if (authUser.id === null && to.path == "/profile") {
    console.log('No podes ir a perfil');
    return { path: "/" };
  }
});
export default router;
