<script>
import axios from "axios";
import { store } from "../../data/store";

export default {
  data() {
    return {
      store,
      restaurantInfo: {},
      dishes: [],
    };
  },

  created() {
    this.viewCart();
  },

  mounted() {
    this.fetchRestaurant();
    this.fetchDishes();
  },

  methods: {
    // api per restaurantInfo specifico
    fetchRestaurant() {
      axios
        .get(store.baseUrl + `restaurants/${this.$route.params.restaurantId}`)
        .then((response) => {
          this.restaurantInfo = response.data;
        });
    },

    // api piatti per ristorante
    fetchDishes() {
      axios
        .get(
          store.baseUrl +
            "restaurant/" +
            this.$route.params.restaurantId +
            "/dishes"
        )
        .then((response) => {
          this.dishes = response.data.map((dish) => {
            return { ...dish, showAddRemoveById: false, quantity: 0 }; // aggiungo la quantità e la visibilità dell'addRemove
          });
        });
    },

    // inizializzo il localStorage con il carrello
    viewCart() {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        this.store.cart = JSON.parse(storedCartItems);
      }
    },

    //mostra il componente o lo rimuove addAndRemove
    showAddRemove(dish) {
      dish.showAddRemoveById = !dish.showAddRemoveById;

      if (!dish.showAddRemoveById) {
        const existingCartItemIndex = this.store.cart.findIndex(
          (item) => item.id === dish.id
        );
        if (existingCartItemIndex !== -1) {
          this.store.cart.splice(existingCartItemIndex, 1); // rimuovo il piatto dal carrello
          localStorage.setItem("cartItems", JSON.stringify(this.store.cart)); // rimuovo anche nel localStorage
        }
      }
    },

    //aggiunta al carrello per determinato piatto
    addToCart(dish) {
      dish.showAddRemoveById = true;

      const existingCartItemIndex = this.store.cart.findIndex(
        (item) => item.id === dish.id
      );

      if (existingCartItemIndex !== -1) {
        // Se l'articolo è già nel carrello, aggiorna solo la quantità
        this.store.cart[existingCartItemIndex].quantity += dish.quantity;
      } else {
        // Se l'articolo non è nel carrello, aggiungilo
        const cartItem = {
          id: dish.id,
          restaurant_id: dish.restaurant_id,
          name: dish.name,
          image: dish.image,
          price: dish.price,
          quantity: 1,
        };
        this.store.cart.push(cartItem);
        dish.quantity = 1;
      }

      // aggiungo i dati del carrello nel localStorage
      localStorage.setItem("cartItems", JSON.stringify(this.store.cart));
    },

    // decremento quantità piatti
    decrementsValue(dish) {
      if (dish.quantity > 0) {
        dish.quantity--;
        const existingCartItemIndex = this.store.cart.findIndex(
          (item) => item.id === dish.id
        ); //identico il piatto nel carrello
        if (existingCartItemIndex !== -1) {
          this.store.cart[existingCartItemIndex].quantity--;
          if (this.store.cart[existingCartItemIndex].quantity === 0) {
            this.store.cart.splice(existingCartItemIndex, 1); // Rimuove il piatto dal carrello se la quantità diventa zero
            dish.showAddRemoveById = false;
          }
        }
        // aggiorno il localStorege dopo la modifica della quantità
        localStorage.setItem("cartItems", JSON.stringify(this.store.cart));
      }
    },

    // incremento quantità piatti
    incrementsValue(dish) {
      dish.quantity++;
      const existingCartItemIndex = this.store.cart.findIndex(
        (item) => item.id === dish.id
      );
      if (existingCartItemIndex !== -1) {
        this.store.cart[existingCartItemIndex].quantity++;
        // aggiorno il localStorage dopo la modifica della quantità
        localStorage.setItem("cartItems", JSON.stringify(this.store.cart));
      } else {
        const cartItem = {
          id: dish.id,
          restaurant_id: dish.restaurant_id,
          name: dish.name,
          image: dish.image,
          price: dish.price,
          quantity: 1,
        };
        this.store.cart.push(cartItem);
        // aggiorno il localStorage dopo l'aggiunta di un elemento al carrello
        localStorage.setItem("cartItems", JSON.stringify(this.store.cart));
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <h1>Menu di {{ restaurantInfo.name }}</h1>
    <div class="row">
      <div class="col-6" v-for="(dish, index) in dishes" :key="dish.id">
        <div class="card">
          <h5 class="card-header">{{ dish.name }}</h5>
          <div class="card-body">
            <h5 class="card-title">{{ dish.ingredients }}</h5>
            <p class="card-text">
              {{ dish.description }}
            </p>
            <div class="text-center">
              <div
                class="btn btn-primary"
                v-if="dish.showAddRemoveById == false"
                @click="addToCart(dish)"
              >
                Add to Cart
              </div>
              <div
                class="container-add-cart"
                v-if="dish.showAddRemoveById == true"
              >
                <div class="row container-componets">
                  <div @click="decrementsValue(dish)" class="col-2 componet">
                    <span class="sign">-</span>
                  </div>
                  <span class="col-3 quantity-value">
                    {{ dish.quantity }}
                  </span>
                  <div @click="incrementsValue(dish)" class="col-2 componet">
                    <span class="sign">+</span>
                  </div>
                </div>
                <button class="btn btn-danger" @click="showAddRemove(dish)">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-componets {
  flex-direction: row;
  justify-content: center;
  height: 50px;

  .componet {
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

  .quantity-value {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: bold;
  }
}
</style>
