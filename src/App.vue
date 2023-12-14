<script>
import { RouterView } from "vue-router";
import NavBar from "./components/ui/NavBar.vue";

export default {
  data() {
    return {
      title: "Sono la homepage",
    };
  },

  components: {
    NavBar,
    RouterView,
  },
};
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style lang="scss" scoped></style>
