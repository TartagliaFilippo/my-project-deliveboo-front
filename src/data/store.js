import { reactive } from "vue";

export const store = reactive({
  baseUrl: "http://localhost:8000/api/",
  cart: [],
  pathImageRestaurants: "../../../public/img/restaurants/",
  pathImageDishes: "../../../public/img/dishes/",
});
