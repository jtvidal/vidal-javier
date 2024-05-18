import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginRegister from "@/views/LoginRegister.vue";
import MyProfile from "@/views/MyProfile.vue";
import EditProfile from "@/views/EditProfile.vue";
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
    path: "/edit-profile",
    name: "edit-profile",
    component: EditProfile,
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

subscribeToAuth((routerUpdater) => (authUser = routerUpdater));

router.beforeEach((to, from) => {
  if (authUser.id === null && to.path == "/profile") {
    console.log('No podes ir a perfil');
    return { path: "/login-register" };
  }
});
export default router;
