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

    // Decrementa la quantità del prodotto nel carrello
    decrementCartItem(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.updateCartItem(item);
      }
    },

    // Incrementa la quantità del prodotto nel carrello
    incrementCartItem(item) {
      item.quantity++;
      this.updateCartItem(item);
    },

    // Aggiorna il carrello nel localStorage dopo la modifica della quantità
    updateCartItem(item) {
      const index = this.store.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (index !== -1) {
        this.store.cart.splice(index, 1, item);
        localStorage.setItem("cartItems", JSON.stringify(this.store.cart));
      }
    },

    // Rimuove il prodotto specifico dal carrello
    removeFromCart(item) {
      const index = this.store.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (index !== -1) {
        this.store.cart.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(this.store.cart));
      }
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="card" v-for="dish in store.cart">
      <ul v-show="dish.quantity > 0">
        <li>{{ dish.name }}</li>
        <li>{{ dish.price }}</li>
        <li>
          <div class="quantity-controls">
            <div @click="decrementCartItem(dish)" class="control-button">-</div>
            <div class="quantity">{{ dish.quantity }}</div>
            <div @click="incrementCartItem(dish)" class="control-button">+</div>
            <div @click="removeFromCart(dish)" class="remove-button">
              Remove
            </div>
          </div>
        </li>
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
