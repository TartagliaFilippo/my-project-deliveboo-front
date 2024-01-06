<script>
export default {
  data() {
    return {
      title: "Grazie al cazzo!!!",
    };
  },
};
</script>

<template>
  <div class="wrapper-thanks">
    <div class="container">
      <h1 class="text-center">{{ title }}</h1>
      <router-link :to="{ name: 'homepage' }">Order again</router-link>
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
