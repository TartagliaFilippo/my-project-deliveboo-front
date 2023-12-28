<script>
import axios from "axios";
import { store } from "../../data/store";
import { router } from "../../router/index";

export default {
  data() {
    return {
      title: "Cart",
      store,
      formData: {
        restaurant_id: "",
        name: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        address_number: "",
        total: 0,
        cart: [],
      },
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

    // form che invia i dati dell'utente che fatto l'ordine
    submitForm() {
      this.formData.total = this.totalPrice;
      this.formData.cart = this.store.cart;
      this.formData.restaurant_id = this.store.cart[0].restaurant_id;

      axios
        .post(store.baseUrl + "orders", this.formData)
        .then((response) => {
          console.log("dati inviati con successo", response.data);

          if (response.status === 201) {
            this.formData = {
              restaurant_id: "",
              name: "",
              lastname: "",
              email: "",
              phone: "",
              address: "",
              address_number: "",
              total: "",
              cart: [],
            };
            // reindirizzol'utente alla pagina del pagamento
            router.push({ name: "payment" });
          }
        })
        .catch((error) => {
          console.error("errore nella richiesta POST", error);
        });
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
      <!-- <router-link class="btn btn-success" :to="{ name: 'checkout' }"
        >Go to payment
      </router-link> -->
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#staticBackdrop"
        aria-controls="staticBackdrop"
      >
        Go to Payment
      </button>
    </div>
    <div
      class="offcanvas offcanvas-start text-bg-dark"
      data-bs-backdrop="static"
      tabindex="-1"
      id="staticBackdrop"
      aria-labelledby="staticBackdropLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="staticBackdropLabel">Order Data</h5>
        <button
          type="button"
          class="btn-close text-light"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <form class="row my-2 width-50" @submit.prevent="submitForm">
          <div class="col-12 mb-3">
            <label for="name" class="form-label">Name:</label>
            <input
              type="text"
              class="input-form"
              name="name"
              id="name"
              v-model="formData.name"
              required
            />
          </div>

          <div class="col-12 mb-3">
            <label for="lastname" class="form-label">Lastname:</label>
            <input
              type="text"
              class="input-form"
              name="lastname"
              id="lastname"
              v-model="formData.lastname"
              required
            />
          </div>

          <div class="col-12 mb-3">
            <label for="email" class="form-label">Email:</label>
            <input
              type="email"
              class="input-form"
              name="email"
              id="email"
              v-model="formData.email"
              required
            />
          </div>

          <div class="col-12 mb-3">
            <label for="phone" class="form-label">Phone:</label>
            <input
              type="text"
              class="input-form"
              name="phone"
              id="phone"
              v-model="formData.phone"
              required
            />
          </div>

          <div class="col-12 mb-3">
            <label for="address" class="form-label">Address:</label>
            <input
              type="text"
              class="input-form"
              name="address"
              id="address"
              v-model="formData.address"
              required
            />
          </div>

          <div class="col-12 mb-3">
            <label for="address_number" class="form-label"
              >Address Number:</label
            >
            <input
              type="text"
              class="input-form"
              name="address_number"
              id="address_number"
              v-model="formData.address_number"
              required
            />
          </div>

          <!-- Bottone di invio -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary mt-4">Send</button>
          </div>
        </form>
      </div>
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

  .offcanvas {
    --bs-offcanvas-width: 100%;
    &.offcanvas-start {
      top: 30%;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
