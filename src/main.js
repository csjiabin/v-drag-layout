import Vue from "vue";
import App from "./App.vue";
import VDragLayout from 'lib'
import './style.scss'
Vue.use(VDragLayout)
new Vue({
  render: (h) => h(App),
}).$mount("#app");
