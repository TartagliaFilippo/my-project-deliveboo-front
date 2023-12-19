import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/pages/HomePage.vue";
import MenuPage from "../components/pages/MenuPage.vue";
import CartPage from "../components/pages/CartPage.vue";

//importo le varie rotte

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      name: "homepage",
      path: "/",
      component: HomePage,
    },
    {
      name: "dishes-by-restaurant",
      path: "/restaurant/:restaurantId/dishes",
      component: MenuPage,
    },
    {
      name: "cart",
      path: "/cart",
      component: CartPage,
    },
  ],
});

export { router };
