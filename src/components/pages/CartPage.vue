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
    this.loadCartFromLocalStorage();
  },

  computed: {
    totalPrice() {
      let sum = 0;
      this.store.cart.forEach(function (item) {
        let itemTotal = parseFloat(item.price) * parseInt(item.quantity);
        sum += itemTotal;
      });
      return sum.toFixed(2);
    },
  },

  methods: {
    loadCartFromLocalStorage() {
      const cartItems = localStorage.getItem("cartItems");
      if (cartItems) {
        this.store.cart = JSON.parse(cartItems);
      }
    },

    clearCart() {
      this.store.cart = [];
      localStorage.setItem("cartItems", JSON.stringify(this.store.cart));
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="card" v-for="dish in store.cart">
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
