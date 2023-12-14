<script>
export default {
  data() {
    return {
      title: "Add and Remove",
      quantity: 1,
      limit: 1,
    };
  },

  methods: {
    decrementsValue() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    incrementsValue() {
      this.quantity++;
    },
  },

  computed() {
    this.setRangeQuantity;
  },
};
</script>

<template>
  <div class="row container-componets">
    <div @click="decrementsValue()" class="col-2 componet">
      <span class="sign">-</span>
    </div>
    <span class="col-3 quantity-value">
      {{ quantity }}
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
