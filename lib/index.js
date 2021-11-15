import DragLayout from "./drag-layout.vue";
import ViewerMain from "./viewer-main.vue";
import ViewerItem from "./viewer-item.vue";
import "./style/style.scss";
const install = (Vue) => {
  Vue.component(DragLayout.name, DragLayout);
  Vue.component(ViewerMain.name, ViewerMain);
  Vue.component(ViewerItem.name, ViewerItem);
};
export default {
  install,
};
