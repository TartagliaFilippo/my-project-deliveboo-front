<script>
import { store } from "../../data/store";

export default {
  data() {
    return {
      title: "Sono il carrello",
      store,
    };
  },

  mounted() {
    this.loadSelectedDishesFromLocalStorage();
  },

  computed: {
    totalPrice() {
      let sum = 0;
      this.store.selectedDishes.forEach(function (item) {
        let itemTotal = parseFloat(item.price) * parseInt(item.quantity);
        sum += itemTotal;
      });
      return sum.toFixed(2);
    },
  },

  methods: {
    loadSelectedDishesFromLocalStorage() {
      const selectedDishes = localStorage.getItem("selectedDishes");
      if (selectedDishes) {
        this.store.selectedDishes = JSON.parse(selectedDishes);
      }
    },

    clearCart() {
      this.store.selectedDishes = [];
      localStorage.setItem(
        "selectedDishes",
        JSON.stringify(this.store.selectedDishes)
      );
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="card" v-for="dish in store.selectedDishes">
      <ul>
        <li>{{ dish.name }}</li>
        <li>{{ dish.price }}</li>
        <li>{{ dish.quantity }}</li>
      </ul>
    </div>
    <div class="total">{{ totalPrice }}</div>
    <div class="btn btn-danger" @click="clearCart()">Empty Cart</div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  background-color: rgb(163, 167, 52);
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
