import Vue from "vue";
import VueRouter from "vue-router";

// PC端
import Layout from "../views/pc/common/layout.vue";
import Login from "../views/pc/login.vue";
import Award from "../views/pc/award.vue";

// 移动端
import MobileHome from "../views/phone/index.vue";
import MobileRegister from "../views/phone/register.vue";
import MobileRank from "../views/phone/rank.vue";
import MobileUpdate from "../views/phone/update.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/cgds",
    name: "Home",
    component: Layout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: 'index',
        name: 'index',
        component: Award
      },
      {
        path: 'rank',
        name: 'rank',
        component: Award
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Award
      },
      {
        path: 'news',
        name: 'news',
        component: Award
      },
      {
        path: 'intro',
        name: 'intro',
        component: Award
      },
      {
        path: 'award',
        name: 'award',
        component: Award
      },
      {
        path: 'dynamic',
        name: 'dynamic',
        component: Award
      }
    ]
  },
  {
    path: "/cgds/mobile",
    name: "MobileHome",
    component: MobileHome
  },
  {
    path: "/cgds/mobile/register",
    name: "MobileRegister",
    component: MobileRegister
  },
  {
    path: "/cgds/mobile/rank",
    name: "MobileRank",
    component: MobileRank
  },
  {
    path: "/cgds/mobile/update",
    name: "MobileUpdate",
    component: MobileUpdate
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
