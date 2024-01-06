<script>
import axios from "axios";
import { store } from "../../data/store";
import braintree from "braintree-web";
import { router } from "../../router/index";

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
        if (this.hostedFields) {
          this.hostedFields.teardown();
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
        // svuoto il carrello e il localStorage se il pagamento è stato effettuato
        this.store.cart = [];
        localStorage.removeItem("cartItems");
        // elimino i precedenti campi di hostedFields
        this.hostedFields.teardown();
        // vado alla rotta di ringraziamento
        router.push({ name: "thanks" });
      } catch (error) {
        console.error("Errore durante il pagamento:", error);
      }
    },
  },
};
</script>

<template>
  <div class="wrapper-payment">
    <div class="container">
      <h1>{{ title }}</h1>
      <div class="row">
        <div class="col-9">
          <form
            class="ms-auto row my-2 width-50"
            @submit.prevent="handlePayment"
          >
            <div class="form-group my-3">
              <label for="card-number">Cart Number</label>
              <div id="card-number"></div>
            </div>

            <div class="form-group my-3">
              <label for="expiration-date">Exipiration Date</label>
              <div id="expiration-date"></div>
            </div>

            <div class="form-group my-3">
              <label for="cvv">CVV</label>
              <div id="cvv"></div>
            </div>

            <div class="text-center">
              <button type="submit" class="button-pay">Pay</button>
            </div>
          </form>
        </div>
        <div class="col-3"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/variables.scss" as *;
.wrapper-payment {
  background-color: var(--bg-primary);
  min-height: 100vh;
  .form-group > div {
    background-color: var(--bg-white);
    height: 6rem;
    padding: 1rem 2rem;
  }
  .button-pay {
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
</style>
