<script>
import axios from "axios";
import { store } from "../../data/store";
import braintree from "braintree-web";

export default {
  data() {
    return {
      title: "Payment",
      store,
      braintreeClient: null,
      hostedFields: null,
      total: 0,
    };
  },

  computed: {
    totalPrice() {
      let sum = 0;
      this.store.cart.forEach(function (item) {
        let itemTotal = parseFloat(item.price) * parseInt(item.quantity);
        sum += itemTotal;
      });
      return sum.toFixed(2);
    },
  },

  mounted() {
    this.setupPayment();
  },

  methods: {
    async setupPayment() {
      try {
        // Elimina i campi Hosted Fields precedenti, se presenti
        if (this.hostedFieldsInstance) {
          this.hostedFieldsInstance.teardown();
        }

        const response = await axios.get(store.baseUrl + "generate");
        const clientToken = response.data.token;

        this.braintreeClient = await braintree.client.create({
          authorization: clientToken,
        });

        // Inizializza i campi per l'input della carta
        const hostedFieldsInstance = await braintree.hostedFields.create({
          client: this.braintreeClient,
          fields: {
            number: {
              selector: "#card-number",
              placeholder: "Inserisci numero carta",
            },
            expirationDate: {
              selector: "#expiration-date",
              placeholder: "MM / YY",
            },
            cvv: {
              selector: "#cvv",
              placeholder: "CVV",
            },
          },
        });

        this.hostedFields = hostedFieldsInstance;
      } catch (error) {
        console.error("Errore durante l'inizializzazione di Braintree:", error);
      }
    },

    async handlePayment() {
      this.total = this.totalPrice;

      try {
        const { nonce } = await this.hostedFields.tokenize();

        // Invia il nonce alla tua API per elaborare il pagamento
        const response = await axios.post(store.baseUrl + "payment", {
          amount: this.totalPrice,
          token: nonce,
        });

        console.log("Risposta pagamento: positiva", response.data);
      } catch (error) {
        console.error("Errore durante il pagamento:", error);
      }
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <h1>{{ title }}</h1>
      <form class="ms-auto row my-2 width-50" @submit.prevent="handlePayment">
        <div class="form-group">
          <label for="card-number">Cart Number</label>
          <div id="card-number"></div>
        </div>

        <div class="form-group">
          <label for="expiration-date">Exipiration Date</label>
          <div id="expiration-date"></div>
        </div>

        <div class="form-group">
          <label for="cvv">CVV</label>
          <div id="cvv"></div>
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary mt-4">Pay</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
