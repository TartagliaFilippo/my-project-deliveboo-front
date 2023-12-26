<script>
import axios from "axios";
import { store } from "../../data/store";

export default {
  data() {
    return {
      title: "Pagina di checkout",
      store,
      formData: {
        name: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        address_number: "",
        total: 0,
        cart: store.cart,
      },
    };
  },

  methods: {
    // submitForm() {
    //   const totalPrice =
    // },
  },

  methods: {
    submitForm() {
      axios
        .post(store.baseUrl + "orders", this.formData)
        .then((response) => {
          console.log("Dati inviati con successo:", response.data);

          if (response.status === 201) {
            this.formData = {
              name: "",
              lastname: "",
              email: "",
              phone: "",
              address: "",
              address_number: "",
              total: "",
              cart: [],
            };
          }
        })
        .catch((error) => {
          console.error(
            console.log(this.formData),
            "Errore nella richiesta POST:",
            error
          );
        });
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <h1>{{ title }}</h1>
      <form class="ms-auto row my-2 width-50" @submit.prevent="submitForm">
        <div class="col-md-6 col-12 mb-3">
          <label for="name" class="form_label">Name:</label>
          <input
            type="text"
            class="input-form"
            id="name"
            v-model="formData.name"
            required
          />
        </div>

        <div class="col-md-6 col-12 mb-3">
          <label for="lastname" class="form_label">Lastname:</label>
          <input
            type="text"
            class="input-form"
            id="lastname"
            v-model="formData.lastname"
            required
          />
        </div>

        <div class="col-md-6 col-12 mb-3">
          <label for="email" class="form_label">Email:</label>
          <input
            type="email"
            class="input-form"
            id="email"
            v-model="formData.email"
            required
          />
        </div>

        <div class="col-md-6 col-12 mb-3">
          <label for="phone" class="form_label">Phone:</label>
          <input
            type="text"
            class="input-form"
            id="phone"
            v-model="formData.phone"
            required
          />
        </div>

        <div class="mb-3">
          <label for="address" class="form_label">Address:</label>
          <input
            type="text"
            class="input-form"
            id="address"
            v-model="formData.address"
            required
          />
        </div>

        <div class="mb-3">
          <label for="address_number" class="form_label">Address Number:</label>
          <input
            type="text"
            class="input-form"
            id="address_number"
            v-model="formData.address_number"
            required
          />
        </div>

        <!-- Bottone di invio -->
        <div class="text-center">
          <button type="submit" class="btn btn-primary mt-4">Send</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
