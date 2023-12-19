<script>
import axios from "axios";
import { store } from "../../data/store";
import AddAndRemove from "../ui/AddAndRemove.vue";

export default {
  data() {
    return {
      store,
      restaurantInfo: {},
      dishes: [],
      selectedDishes: [],
    };
  },

  components: {
    AddAndRemove,
  },

  methods: {
    fetchRestaurant() {
      axios
        .get(store.baseUrl + `restaurants/${this.$route.params.restaurantId}`)
        .then((response) => {
          this.restaurantInfo = response.data;
        });
    },

    fetchDishes() {
      axios
        .get(
          store.baseUrl +
            "restaurant/" +
            this.$route.params.restaurantId +
            "/dishes"
        )
        .then((response) => {
          this.dishes = response.data;
        });
    },

    toggleAddAndRemove(clickedDish) {
      clickedDish.selected = !clickedDish.selected;
      if (clickedDish.selected) {
        clickedDish.quantity = 1;
        this.selectedDishes.push(clickedDish); // Aggiungo il piatto selezionato all'array
      } else {
        const index = this.selectedDishes.findIndex(
          (dish) => dish.id === clickedDish.id
        );
        if (index !== -1) {
          this.selectedDishes.splice(index, 1); // Rimuovo il piatto deselezionato dall'array
        }
      }
    },
  },

  mounted() {
    this.fetchRestaurant();
    this.fetchDishes();
  },
};
</script>

<template>
  <div class="container">
    <h1>Menu di {{ restaurantInfo.name }}</h1>
    <div class="row">
      <div class="col-6" v-for="dish in dishes" :key="dish.id">
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
                @click="toggleAddAndRemove(dish)"
                v-if="!dish.selected"
              >
                Add
              </div>
              <div class="container-add-cart" v-if="dish.selected">
                <AddAndRemove :dish="dish" />
                <button class="btn btn-success">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
