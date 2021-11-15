import DragLayout from "./drag-layout.vue";
import ViewerMain from "./viewer-main.vue";
import "./style/style.scss";
const install = (Vue) => {
  Vue.component(DragLayout.name, DragLayout);
  Vue.component(ViewerMain.name, ViewerMain);
};
export default {
  install,
};
