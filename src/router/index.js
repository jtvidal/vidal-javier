import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'
import LoginRegister from "@/views/LoginRegister.vue";
import MyProfile from "@/views/MyProfile.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path:'/',
      name:'home',
      component: HomeView
    },
    {
      path:'/login-register',
      name:'login-register',
      component: LoginRegister
    },
    {
      path:'/profile',
      name:'profile',
      component: MyProfile
    }
  ],
});

export default router;
