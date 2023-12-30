<script>
import { store } from "../../data/store";

export default {
  data() {
    return {
      store,
    };
  },

  methods: {
    calculateCartLength() {
      let cartLength = store.cart.length;
      return cartLength;
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Deliveboo</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              :to="{ name: 'homepage' }"
              >Home
            </router-link>
          </li>
          <li class="nav-item cart">
            <router-link
              class="nav-link"
              aria-current="page"
              :to="{ name: 'cart' }"
              ><font-awesome-icon icon="cart-shopping" />
            </router-link>
            <span v-if="calculateCartLength() > 0" class="cart-length">
              {{ calculateCartLength() }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav-item.cart {
  position: relative;
  .cart-length {
    position: absolute;
    top: 0;
    left: 80%;
    font-size: 10px;
    font-weight: bold;
    color: rgb(70, 137, 70);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
