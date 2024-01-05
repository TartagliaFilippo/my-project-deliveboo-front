<script>
import axios from "axios";
import { store } from "../../data/store";

export default {
  data() {
    return {
      title: "Dishes from the restaurants you love, delivered to your home",
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
      <h1 class="text-center py-5">{{ title }}</h1>
      <div class="row justify-content-center">
        <div class="section-types col-8">
          <h3 class="my-2">Choose the types of restaurant:</h3>
          <div class="container-types my-3">
            <div
              class="type"
              :class="type.active ? 'active' : ''"
              v-for="(type, index) in types"
              :key="index"
              @click="toggleType(type)"
            >
              {{ type.name }}
            </div>
          </div>
        </div>
        <div v-if="filteredRestaurants.length === 0">
          <h2 class="text-center my-3">There's no Restaurant for this type</h2>
        </div>
        <div class="container-restaurants col-12 my-5">
          <div
            class="col-3"
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
                <p class="card-text">
                  <span
                    class="badge text-bg-primary"
                    v-for="(type, index) in restaurant.types"
                    :key="index"
                    >{{ type.name }}</span
                  >
                </p>
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
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/variables.scss" as *;
.wrapper-home {
  background-color: var(--bg-primary);
  color: var(--bg-white);
  width: 100%;
  min-height: 100vh;

  .section-types {
    padding-bottom: 1rem;
    border-bottom: 0.1rem dotted var(--bg-primary-700);
  }
  .container-types {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 1rem;
    .type {
      border: 1px solid var(--bg-primary-700);
      padding: 2px 7px;
      border-radius: 5px;
      background-color: var(--bg-primary-500);
      box-shadow: 1px 1px var(--bg-black);
      cursor: pointer;
    }
    .type.active {
      border: 2px solid var(--bg-white);
      font-weight: bold;
      background-color: var(--bg-primary-shine);
      box-shadow: 0px 0px;
    }
  }

  .container-restaurants {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 2rem;
  }
}
</style>
