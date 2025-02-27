import { createApp } from "vue";
import "./assets/tailwind.css"; // Tailwind CSS en premier
import "./style.css"; // Styles personnalisés en dernier
import App from "./App.vue";

createApp(App).mount("#app");