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
      <div class="col-6" v-for="dish in dishes">
        <div class="card">
          <h5 class="card-header">{{ dish.name }}</h5>
          <div class="card-body">
            <h5 class="card-title">{{ dish.ingredients }}</h5>
            <p class="card-text">
              {{ dish.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
