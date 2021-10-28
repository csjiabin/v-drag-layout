import DragLayout from "./drag-layout.vue";
import DragMain from "./drag-main.vue";

import "./style/style.scss";
const install = (Vue) => {
  Vue.component(DragLayout.name, DragLayout);
  Vue.component(DragMain.name, DragMain);
};
export default {
  install,
};
