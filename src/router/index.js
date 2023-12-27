import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/pages/HomePage.vue";
import MenuPage from "../components/pages/MenuPage.vue";
import CartPage from "../components/pages/CartPage.vue";
import PaymentPage from "../components/pages/PaymentPage.vue";
import ThanksPage from "../components/pages/ThanksPage.vue";

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
    {
      name: "payment",
      path: "/payment",
      component: PaymentPage,
    },
    {
      name: "thanks",
      path: "/thank-you",
      component: ThanksPage,
    },
  ],
});

export { router };
