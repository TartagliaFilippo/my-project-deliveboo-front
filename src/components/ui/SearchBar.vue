<script>
// import MyComponent from "./components/MyComponent.vue";

export default {
  data() {
    return {
      title: "Hello world",
    };
  },

  // components: {
  //   MyComponent,
  // },
};
</script>

<template>
  <div class="input-group">
    <div class="form-outline" data-mdb-input-init>
      <input type="search" />
      <button type="button" class="btn btn-primary">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
