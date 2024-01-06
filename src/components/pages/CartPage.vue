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
  <div class="wrapper-cart">
    <div class="container">
      <div class="row">
        <div class="wrapper-left col-8">
          <h2 v-if="store.cart.length > 0">Cart</h2>
          <table v-if="store.cart.length > 0">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Dish Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dish in store.cart">
                <th scope="row">{{ dish.id }}</th>
                <td class="image-data">
                  <img
                    :src="store.pathImageDishes + dish.image"
                    :alt="dish.image"
                  />
                </td>
                <td>{{ dish.name }}</td>
                <td>{{ dish.price }}</td>
                <td>
                  <div class="container-quantity">
                    <div class="quantity-controls">
                      <div
                        @click="decrementCartItem(dish)"
                        class="control-button"
                      >
                        <font-awesome-icon :icon="['fas', 'minus']" />
                      </div>
                      <div class="quantity">{{ dish.quantity }}</div>
                      <div
                        @click="incrementCartItem(dish)"
                        class="control-button"
                      >
                        <font-awesome-icon :icon="['fas', 'plus']" />
                      </div>
                    </div>
                    <button @click="removeFromCart(dish)" class="button-remove">
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
        <div class="wrapper-right col-4">
          <div class="total">
            Your total order is:
            <span class="badge-total">{{ totalPrice }} €</span>
          </div>
          <button
            class="button-payment"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#staticBackdrop"
            aria-controls="staticBackdrop"
          >
            Go to Payment
          </button>
          <div class="button" @click="clearCart()">Empty Cart</div>
        </div>
      </div>
    </div>
    <div
      class="offcanvas offcanvas-end"
      data-bs-backdrop="static"
      tabindex="-1"
      id="staticBackdrop"
      aria-labelledby="staticBackdropLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="staticBackdropLabel">Data Order</h5>
        <button
          type="button"
          class="btn-close text-light"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <form class="my-2" @submit.prevent="submitForm">
          <div class="row justify-content-center">
            <div class="col-12 mb-3">
              <label for="name" class="form-label">Name:</label>
              <input
                type="text"
                class="input-form w-100"
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
                class="input-form w-100"
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
                class="input-form w-100"
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
                class="input-form w-100"
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
                class="input-form w-100"
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
                class="input-form w-100"
                name="address_number"
                id="address_number"
                v-model="formData.address_number"
                required
              />
            </div>
          </div>

          <!-- Bottone di invio -->
          <div class="text-center">
            <button type="submit" class="button-send mt-4">Send</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/variables.scss" as *;
.wrapper-cart {
  background-color: var(--bg-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: relative;
  .container {
    .row {
      align-items: center;
      .wrapper-left {
        table {
          width: 100%;
          border-right: 1px solid var(--bg-black);
          border-radius: 1rem;
          thead {
            background-color: var(--bg-primary-700);
            th {
              text-align: center;
              border: 1px solid var(--bg-black);
            }
          }
          tbody {
            background-color: var(--bg-primary-100);
            text-align: center;
            tr {
              border-bottom: 1px solid var(--bg-black);
              th {
                background-color: var(--bg-primary-300);
                border: 1px solid var(--bg-black);
              }
              td {
                padding: 0.3rem;
              }
              .image-data {
                width: 5rem;
                img {
                  max-width: 100%;
                }
              }
            }
          }
        }
        .container-quantity {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          .quantity-controls {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
            height: 2rem;
            .control-button {
              height: 100%;
              width: 2rem;
              background-color: var(--bg-white);
              border: 2px solid var(--bg-black);
              box-shadow: 1px 1px var(--bg-primary-700);
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 0.4rem;
              cursor: pointer;

              &:hover {
                background-color: var(--bg-primary-900);
                color: var(--bg-white);
              }
            }
            .quantity {
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.5rem;
              font-weight: bold;
            }
          }
          .button-remove {
            padding: 2px 7px;
            border-radius: 5px;
            background-color: var(--bg-primary-700);
            color: var(--bg-black);
            box-shadow: 1px 1px var(--bg-black);
            cursor: pointer;

            &:hover {
              background-color: var(--bg-black);
              color: var(--bg-white);
            }
          }
        }
      }
      .wrapper-right {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        .total {
          font-weight: bold;
          .badge-total {
            border: 2px solid var(--bg-primary-700);
            background-color: var(--bg-white);
            color: var(--bg-black);
            font-weight: bold;
            font-size: 1.2rem;
            border-radius: 0.9rem;
            padding: 1px 5px;
          }
        }
        .button-payment {
          border: 2px solid var(--bg-black);
          padding: 2px 7px;
          border-radius: 5px;
          background-color: var(--bg-primary-900);
          color: var(--bg-black);
          box-shadow: 1px 1px var(--bg-black);
          cursor: pointer;

          &:hover {
            background-color: var(--bg-white);
            font-weight: bold;
          }
        }
        .button {
          border: 2px solid var(--bg-black);
          padding: 2px 7px;
          border-radius: 5px;
          background-color: var(--bg-primary-700);
          color: var(--bg-black);
          box-shadow: 1px 1px var(--bg-black);
          cursor: pointer;

          &:hover {
            background-color: var(--bg-black);
            color: var(--bg-white);
            font-weight: bold;
          }
        }
      }
    }
  }
  .offcanvas {
    background-color: var(--bg-primary-100);
    .button-send {
      border: 2px solid var(--bg-black);
      padding: 2px 7px;
      border-radius: 5px;
      background-color: var(--bg-primary-900);
      color: var(--bg-black);
      box-shadow: 1px 1px var(--bg-black);
      cursor: pointer;

      &:hover {
        background-color: var(--bg-white);
        font-weight: bold;
      }
    }
  }
}
</style>
