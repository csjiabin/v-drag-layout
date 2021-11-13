import Vue from "vue";
import App from "./App.vue";
import VDragLayout from '../dist/index.es'
import '../dist/style.css'
Vue.use(VDragLayout)
new Vue({
  render: (h) => h(App),
}).$mount("#app");
