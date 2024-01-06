<script>
import { store } from "../../data/store";

export default {
  data() {
    return {
      store,
      selectedTheme: "default",
    };
  },

  mounted() {
    this.applyDefaultTheme();
  },

  methods: {
    calculateCartLength() {
      let cartLength = store.cart.length;
      return cartLength;
    },

    applyDefaultTheme() {
      this.changeTheme();
    },

    changeToDefaultTheme() {
      this.selectedTheme = "default";
      this.changeTheme();
    },

    changeToOtherTheme() {
      this.selectedTheme = "other-theme";
      this.changeTheme();
    },

    changeTheme() {
      if (this.selectedTheme === "default") {
        document.documentElement.style.setProperty("--bg-primary", "#f5c127");
        document.documentElement.style.setProperty(
          "--bg-primary-100",
          "#f5a827"
        );
        document.documentElement.style.setProperty(
          "--bg-primary-300",
          "#f58727"
        );
        document.documentElement.style.setProperty(
          "--bg-primary-500",
          "#f56327"
        );
        document.documentElement.style.setProperty(
          "--bg-primary-700",
          "#f41212"
        );
        document.documentElement.style.setProperty(
          "--bg-primary-900",
          "#f520a0"
        );
        document.documentElement.style.setProperty(
          "--bg-primary-shine",
          "#f5d816"
        );
        document.documentElement.style.setProperty("--bg-black", "#101010");
        document.documentElement.style.setProperty(
          "--bg-light-grey",
          "#969696"
        );
        document.documentElement.style.setProperty("--bg-grey", "#555555");
        document.documentElement.style.setProperty("--bg-white", "#e9e9e9");
      } else if (this.selectedTheme === "other-theme") {
        document.documentElement.style.setProperty("--bg-primary", "#ffff");
        document.documentElement.style.setProperty(
          "--bg-primary-100",
          "#f5a827"
        );
        document.documentElement.style.setProperty(
          "--bg-primary-300",
          "#f58727"
        );
        document.documentElement.style.setProperty(
          "--bg-primary-500",
          "#f56327"
        );
        document.documentElement.style.setProperty(
          "--bg-primary-700",
          "#f41212"
        );
        document.documentElement.style.setProperty(
          "--bg-primary-900",
          "#f520a0"
        );
        document.documentElement.style.setProperty(
          "--bg-primary-shine",
          "#f5d816"
        );
        document.documentElement.style.setProperty("--bg-black", "#101010");
        document.documentElement.style.setProperty(
          "--bg-light-grey",
          "#969696"
        );
        document.documentElement.style.setProperty("--bg-grey", "#555555");
        document.documentElement.style.setProperty("--bg-white", "#e9e9e9");
      }
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'homepage' }"
        >Deliveboo</router-link
      >
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
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
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
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <font-awesome-icon :icon="['fas', 'gear']" />
            </a>
            <ul class="dropdown-menu">
              <li @click="changeToDefaultTheme">Default Theme</li>
              <li @click="changeToOtherTheme">Other Theme</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/variables.scss" as *;

.navbar.bg-body-tertiary {
  background-color: var(--bg-primary-300) !important;
}

.dropdown-toggle::after {
  display: none;
}
.dropdown-menu {
  left: -120px;
  background-color: var(--bg-primary-300);
}

.cart {
  position: relative;
  .cart-length {
    position: absolute;
    top: 0;
    left: 80%;
    font-size: 10px;
    font-weight: bold;
    color: var(--bg-black);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
