<script>
import axios from "axios";
import { store } from "../../data/store";

export default {
  data() {
    return {
      title: "I piatti dei ristoranti che ami e la spesa, a domicilio ",
      store,
      types: [],
      filteredRestaurants: [],
      selectedTypeIds: [],
    };
  },

  methods: {
    fetchRestaurants() {
      // indentifico i tii attivi
      const activeTypes = this.types.filter((type) => type.active);

      //verifico se ce ne sono
      if (activeTypes.length > 0) {
        const selectedTypeIds = activeTypes.map((type) => type.id);

        axios
          .get(this.store.baseUrl + "get-restaurants-by-types", {
            headers: { "Content-Type": "multipart/form-data" },
            params: { type_ids: selectedTypeIds },
          })
          .then((response) => {
            // filtro il tipo solo se esiste
            this.filteredRestaurants = response.data.filter((restaurant) =>
              selectedTypeIds.every((typeId) =>
                restaurant.types.some((type) => type.id === typeId)
              )
            );
            // Se non ci sono ristoranti con queste categorie
            this.showNoRestaurantsMessage =
              this.filteredRestaurants.length === 0;
          })
          .catch((error) => {
            console.error("Error fetching restaurants by types:", error);
          });
      } else {
        //se nessun tipo è attivo
        axios.get(this.store.baseUrl + "restaurants").then((response) => {
          this.filteredRestaurants = response.data;
        });
      }
    },

    fetchTypes() {
      axios.get(this.store.baseUrl + "types").then((response) => {
        this.types = response.data.map((type) => {
          return {
            ...type,
            active: false,
          };
        });
      });
    },

    toggleType(type) {
      type.active = !type.active;
      this.fetchRestaurants();
      console.log(type.active);
    },
  },

  created() {
    this.fetchRestaurants();
    this.fetchTypes();
  },
};
</script>

<template>
  <div class="wrapper-home">
    <div class="container">
      <h1>{{ title }}</h1>
      <div class="row">
        <h3>Scegli la tipologia di ristorante</h3>
        <div class="col-1" v-for="(type, index) in types" :key="index">
          <span
            class="badge"
            :class="type.active ? 'text-bg-' + 'success' : 'text-bg-danger'"
            @click="toggleType(type)"
          >
            {{ type.name }}
          </span>
        </div>
      </div>
      <div class="row">
        <div
          class="col-4 my-3"
          v-for="restaurant in filteredRestaurants"
          :key="restaurant.id"
          :restaurantId="restaurant.id"
        >
          <div class="card h-100">
            <img
              :src="store.pathImageRestaurants + restaurant.image"
              class="card-img-top"
              :alt="restaurant.image"
            />
            <div class="card-body">
              <h5 class="card-title">{{ restaurant.name }}</h5>
              <p class="card-text">{{ restaurant.description }}</p>
              <router-link
                :to="{
                  name: 'dishes-by-restaurant',
                  params: { restaurantId: restaurant.id },
                }"
                class="btn btn-primary"
                >Menu
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-home {
  background-color: rgb(217, 116, 1);
  color: rgb(255, 250, 244);
  width: 100%;
}
</style>
