import Vue from "vue";
import VueRouter from "vue-router";
import HotelPrepareView from "../views/HotelPrepareView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HotelPrepareView,
  },
  {
    path: "/detail",
    name: "detail",
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/HotelDetailView.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () =>
      import(/* webpackChunkName: "checkout" */ "../views/CheckoutView.vue"),
  },
  {
    path: "/reservation",
    name: "reservation",
    component: () =>
      import(/* webpackChunkName: "checkout" */ "../views/ReservationView.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFoundView.vue"),
    name: "NotFound",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
