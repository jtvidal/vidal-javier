import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginRegister from "@/views/LoginRegister.vue";
import MyProfile from "@/views/MyProfile.vue";
import EditProfile from "@/views/EditProfile.vue";
import PostsView from "@/views/PostsView.vue";
import PostsForm from "@/views/PostsForm.vue";
import { subscribeToAuth } from "@/services/auth";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/login-register", name: "login-register", component: LoginRegister },
  { path: "/profile", name: "profile", component: MyProfile },
  { path: "/edit-profile/:id", name: "edit-profile", component: EditProfile },
  { path: "/my-posts/:id", name: "my-posts", component: PostsView },
  { path: "/posts-form", name: "posts-form", component: PostsForm },
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
    console.log("Access to Your Profile not granted");
    return { path: "/" };
  }
});
export default router;
