import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginRegister from "@/views/LoginRegister.vue";
import MyProfile from "@/views/MyProfile.vue";
import EditProfile from "@/views/EditProfile.vue";
import PostsView from "@/views/PostsView.vue";
import CommentsView from "@/views/CommentsView.vue";
import { subscribeToAuth } from "@/services/auth";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/login-register", name: "login-register", component: LoginRegister },
  {
    path: "/profile",
    name: "profile",
    component: MyProfile,
    meta: { protected: true },
  },
  {
    path: "/edit-profile/:id",
    name: "edit-profile",
    component: EditProfile,
    meta: { protected: true },
  },
  {
    path: "/my-posts",
    name: "my-posts",
    component: PostsView,
    meta: { protected: true },
  },
  {
    path: "/comments",
    name: "comments",
    component: CommentsView,
    meta: { protected: true },
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
    console.log("Access not granted");
    return { path: "/" };
  }
});
export default router;
