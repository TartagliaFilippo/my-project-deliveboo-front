<script>
// import MyComponent from "./components/MyComponent.vue";

export default {
  data() {
    return {
      title: "Sono il carrello",
    };
  },

  // components: {
  //   MyComponent,
  // },
};
</script>

<template>
  <div class="wrapper">
    <div class="container-img left">
      <img src="../../../public/img/grocery-bag-jumbotron.png" alt="" />
    </div>
    <div class="container-img right">
      <img src="../../../public/img/mastro-ciccio-burger.png" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  background-color: rgb(27, 27, 27);
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  .container-img {
    width: 40%;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.right {
      height: 45%;
    }

    img {
      max-height: 100%;
      max-width: 100%;
      background-size: cover;
    }
  }
}
</style>
