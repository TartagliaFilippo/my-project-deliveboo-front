<script>
export default {
  data() {
    return {};
  },

  // components: {
  //   MyComponent,
  // },
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
              >Home</router-link
            >
          </li>
          <!-- <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              :to="{ name: 'portfolio' }"
              >Portfolio</router-link
            > 
          </li>-->
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
