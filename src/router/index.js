import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import MyProfile from "@/views/MyProfile.vue";
import MyProfileEdition from "@/views/MyProfileEdition.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path:'/',
      name:'home',
      component: HomeView
    },
    {
      path:'/login',
      name:'login',
      component: LoginView
    },
    {
      path:'/profile',
      name:'profile',
      component: MyProfile
    },
    {
      path:'/profile-edition',
      name:'profile-edition',
      component: MyProfileEdition
    }
  ],
});

export default router;
