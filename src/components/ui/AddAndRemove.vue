<script>
import { store } from "../../data/store";

export default {
  data() {
    return {
      store,
    };
  },

  props: { dish: Object },

  methods: {
    decrementsValue() {
      if (this.dish.quantity > 0) {
        this.dish.quantity--;
        this.$emit("quantityChanged", this.dish);
      }
    },

    incrementsValue() {
      this.dish.quantity++;
      this.$emit("quantityChanged", this.dish);
    },
  },
};
</script>

<template>
  <div class="row container-componets">
    <div @click="decrementsValue()" class="col-2 componet">
      <span class="sign">-</span>
    </div>
    <span class="col-3 quantity-value">
      {{ dish.quantity }}
    </span>
    <div @click="incrementsValue()" class="col-2 componet">
      <span class="sign">+</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-componets {
  flex-direction: row;
  justify-content: center;
  height: 50px;

  .componet {
    height: 100%;
    width: 50px;
    background-color: #d2fffe;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;

    .sign {
      font-size: 30px;
      font-weight: 600;
    }
  }

  .quantity-value {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: bold;
  }
}
</style>
