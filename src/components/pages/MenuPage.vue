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
            const cartItem = this.store.cart.find(
              (item) => item.id === dish.id
            );
            if (cartItem) {
              // Se il piatto è nel carrello, aggiorna le informazioni
              return {
                ...dish,
                showAddRemove: true,
                quantity: cartItem.quantity,
              };
            } else {
              // Se non è nel carrello, lascia inalterato il piatto
              return { ...dish, showAddRemove: false, quantity: 0 };
            }
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
    toggleAddRemove(dish) {
      dish.showAddRemove = !dish.showAddRemove;

      if (!dish.showAddRemove) {
        const existingCartItemIndex = this.store.cart.findIndex(
          (item) => item.id === dish.id
        );
        if (existingCartItemIndex !== -1) {
          this.store.cart.splice(existingCartItemIndex, 1); // rimuovo il piatto dal carrello
          localStorage.setItem("cartItems", JSON.stringify(this.store.cart)); // rimuovo anche nel localStorage
        }
      }
    },

    checkRestaurant(dish) {
      if (this.store.cart.length > 0) {
        const cartRestaurantId = this.store.cart[0].restaurant_id;
        if (cartRestaurantId !== dish.restaurant_id) {
          alert(
            "Please note: You can only add dishes from the same restaurant."
          );
          return false; 
        }
      }
      return true;
    },

    //aggiunta al carrello per determinato piatto
    addToCart(dish) {
      dish.showAddRemove = true;

      if (!this.checkRestaurant(dish)) {
        dish.showAddRemove = false;
        return; // Non aggiungere il piatto se il ristorante è diverso
      }

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
          showAddRemove: true,
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
            dish.showAddRemove = false;
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
      }
    },
  },
};
</script>

<template>
  <div class="wrapper-menu">
    <div class="container">
      <h1>Menu di {{ restaurantInfo.name }}</h1>
      <div class="row">
        <div class="dish col-12 col-md-4 col-lg-3 my-3" v-for="dish in dishes" :key="dish.id">
          <div class="card-dishes h-100"><div class="container-image">
            <img class="img-fluid" :src="store.pathImageDishes + dish.image" :alt="dish.image">
          </div>
          <div class="container-content h-100">
            <h3>{{ dish.name }}</h3>
            <p class="ingredients-text">
              <h6>Ingredients:</h6>
              <p>{{ dish.ingredients }}</p>
            </p>
            <p class="description-text">
              <h6>Description:</h6>
              <p>{{ dish.description }}</p>
            </p>
            <p class="price-text">
              <h6>Price: {{ dish.price }} €</h6>
            </p>
            <div class="container-add-cart text-center mt-auto pb-2">
                <div
                  class="button-add"
                  v-if="dish.showAddRemove == false"
                  @click="addToCart(dish)"
                >
                  Add to Cart
                </div>
                <div
                  class="container-add-remove"
                  v-if="dish.showAddRemove == true"
                >
                  <div class="row container-componets">
                    <div @click="decrementsValue(dish)" class="col-2 componet">
                      <font-awesome-icon :icon="['fas', 'minus']" />
                    </div>
                    <span class="col-3 quantity-value">
                      {{ dish.quantity }}
                    </span>
                    <div @click="incrementsValue(dish)" class="col-2 componet">
                      <font-awesome-icon :icon="['fas', 'plus']" />
                    </div>
                  </div>
                  <button class="button" @click="toggleAddRemove(dish)">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/variables.scss" as *;

.wrapper-menu {
  background-color: var(--bg-primary);
  .container {
    .dish {
      .card-dishes {
        background-color: var(--bg-primary-100); 
        display: flex;
        flex-direction: column;
        .container-image {
          padding: 1rem;
          
          img {
            max-width: 100%;
            border-radius: 0.5rem;
            overflow: hidden;        
          }
        }
        .container-content {
          display: flex;
          flex-direction: column;
          margin: 0 1rem 0 1rem;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          background: linear-gradient(0deg, var(--bg-primary-100) 55%, var(--bg-primary-500) 100%);
          .container-add-cart {
            .button-add {
              border: 1px solid var(--bg-black);
              padding: 2px 7px;
              border-radius: 5px;
              background-color: var(--bg-primary-500);
              color: var(--bg-black);
              box-shadow: 1px 1px var(--bg-black);
              cursor: pointer;

              &:hover {
                background-color: var(--bg-primary-700);
                color: var(--bg-white);
              }
            }
            .container-add-remove {
              display: flex;
              flex-direction: column;
              gap: 0.5rem;

              .button {
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
              .container-componets {
              flex-direction: row;
              justify-content: space-evenly;
              align-items: center;
              height: 2rem;
                .componet {
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
                  .quantity-value {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    font-weight: bold;
              }
            }
           }     
         }
        }
      }
    }
  }
}

</style>
