import Vue from "vue";
import VueRouter from "vue-router";

// PC端
import Layout from "../views/pc/common/layout.vue";
import Index from "../views/pc/page/index.vue";
import Login from "../views/pc/page/login.vue";
import Register from "../views/pc/page/register.vue";
import Rank from "../views/pc/page/rank.vue";
import Dashboard from "../views/pc/page/dashboard.vue";
import News from "../views/pc/page/news.vue";
import Award from "../views/pc/page/award.vue";
import Dynamic from "../views/pc/page/dynamic.vue";

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
        component: Index
      },
      {
        path: 'register',
        name: 'register',
        component: Register
      },
      {
        path: 'rank',
        name: 'rank',
        component: Rank
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: 'news',
        name: 'news',
        component: News
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
        component: Dynamic
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
