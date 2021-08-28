import Vue from "vue";
import App from "./App.vue";
// import DragLayout from "../lib/vue-drag-layout.umd.min";
// import "../lib/vue-drag-layout.css";
import DragLayout from "~";
Vue.config.productionTip = false;
Vue.use(DragLayout);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
