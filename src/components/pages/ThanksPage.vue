<script>
export default {
  data() {
    return {
      title: "Thank's for your order!",
    };
  },
};
</script>

<template>
  <div class="wrapper-thanks">
    <div class="container h-100">
      <div class="row flex-column-reverse gy-3 align-items-center flex-lg-row">
        <div class="col-6 left-content">
          <img src="../../../public/img/delivery/delivery-thanks.png" alt="" />
        </div>
        <div class="col-6 right-content px-4">
          <h1 class="text-center mt-3">{{ title }}</h1>
          <p class="text-center">We will be with you right away<span> &#128523 </span></p>
          <p class="mt-auto my-1">If you want to order other dishes,</p>  
          <p class="d-inline"><router-link :to="{ name: 'homepage' }" class="button">Click Here</router-link></p>      
        </div>
      </div>
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
  .left-content {
    img {
      max-width: 100%;
    }
  }
  .right-content {
    background-color: var(--bg-primary-300);
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    .button {
      text-decoration: none;
      border: 2px solid var(--bg-black);
      padding: 2px 7px;
      border-radius: 5px;
      background-color: var(--bg-primary-900);
      color: var(--bg-black);
      box-shadow: 1px 1px var(--bg-black);
      cursor: pointer;

      &:hover {
        background-color: var(--bg-white);
        font-weight: bold;
      }
  }
  }
  
}
</style>
