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
    <div class="wrapper-left">
      <table class="table" v-if="store.cart.length > 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Dish Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dish in store.cart">
            <th scope="row">{{ dish.id }}</th>
            <td>{{ dish.name }}</td>
            <td>{{ dish.price }}</td>
            <td>
              <div class="container-quantity">
                <div class="quantity-controls row">
                  <div @click="decrementCartItem(dish)" class="control-button">
                    <span class="sign">-</span>
                  </div>
                  <div class="quantity">{{ dish.quantity }}</div>
                  <div @click="incrementCartItem(dish)" class="control-button">
                    <span class="sign">+</span>
                  </div>
                </div>
                <button @click="removeFromCart(dish)" class="btn btn-danger">
                  Remove
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="empty-cart" v-else>
        <h2 class="text-center">Cart is Empty</h2>
      </div>
    </div>
    <div class="wrapper-right">
      <div class="total">Total Order: {{ totalPrice }}</div>
      <div class="btn btn-danger my-3" @click="clearCart()">Empty Cart</div>
    </div>
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

  .wrapper-left {
    width: 70%;

    .container-quantity {
      display: flex;
      flex-direction: column;
      align-items: center;

      .quantity-controls {
        flex-direction: row;
        justify-content: center;
        flex-wrap: nowrap;
        height: 50px;

        .control-button {
          height: 100%;
          width: 50px;
          background-color: #d2fffe;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          cursor: pointer;

          .sign {
            font-size: 30px;
            font-weight: 600;
          }
        }

        .quantity {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          font-weight: bold;
        }
      }
    }
  }

  .wrapper-right {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
