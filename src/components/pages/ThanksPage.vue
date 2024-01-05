<script>
// import MyComponent from "./components/MyComponent.vue";

export default {
  data() {
    return {
      title: "Grazie al cazzo!!!",
    };
  },

  // components: {
  //   MyComponent,
  // },
};
</script>

<template>
  <div class="wrapper-thanks">
    <div class="container">
      <h1 class="text-center">{{ title }}</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/variables.scss" as *;
.wrapper-thanks {
  min-height: 100vh;
  background-color: var(--bg-primary-100);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
