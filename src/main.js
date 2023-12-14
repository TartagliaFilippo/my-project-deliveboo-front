import { createApp } from "vue";

// importo lo stile
import "./assets/scss/style.scss";

//importo le router
import { router } from "./router";

// Bootstrap JS
import * as Bootstrap from "bootstrap";

// font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// importo le icone
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// le aggiungo alla libreria
library.add(faMagnifyingGlass);

import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
