import Vue from "vue";
import VueRouter from "vue-router";

// PC端
import Layout from "../views/pc/common/layout.vue";
import Index from "../views/pc/page/index.vue";
import Login from "../views/pc/page/login.vue";
import Register from "../views/pc/page/register.vue";
import Forget from "../views/pc/page/forget.vue";
import Rank from "../views/pc/page/rank.vue";
import Dashboard from "../views/pc/page/dashboard.vue";
import Follower from "../views/pc/page/follower.vue";
import Fans from "../views/pc/page/fans.vue";
import News from "../views/pc/page/news.vue";
import NewsDetail from "../views/pc/page/newsDetail.vue";
import Intro from "../views/pc/page/intro.vue";
import Award from "../views/pc/page/award.vue";
import Winner from "../views/pc/page/winner.vue";
import Dynamic from "../views/pc/page/dynamic.vue";
import DynamicDetail from "../views/pc/page/dynamicDetail.vue";

// 移动端
import MobileHome from "../views/phone/index.vue";
import MobileRegister from "../views/phone/register.vue";
import MobileRank from "../views/phone/rank.vue";
import MobileUpdate from "../views/phone/update.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/cgds"
  },
  {
    path: "/cgds",
    redirect: "/cgds/index"
  },
  {
    path: "/cgds/login",
    name: "login",
    component: Login,
  },
  {
    path: "/cgds/register",
    name: "register",
    component: Register,
  },
  {
    path: "/cgds/forget",
    name: "forget",
    component: Forget,
  },
  {
    path: "/cgds",
    name: "Home",
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: Index
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
        path: 'follower',
        name: 'follower',
        component: Follower
      },
      {
        path: 'fans',
        name: 'fans',
        component: Fans
      },
      {
        path: 'news',
        name: 'news',
        component: News
      },
      {
        path: 'news/detail/:id',
        name: 'newsDetail',
        component: NewsDetail
      },
      {
        path: 'intro',
        name: 'intro',
        component: Intro
      },
      {
        path: 'award',
        name: 'award',
        component: Award
      },
      {
        path: 'winner',
        name: 'winner',
        component: Winner
      },
      {
        path: 'dynamic',
        name: 'dynamic',
        component: Dynamic
      },
      {
        path: 'dynamic/detail/:date',
        name: 'dynamicDetail',
        component: DynamicDetail
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
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
