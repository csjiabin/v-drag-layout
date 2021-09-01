import DragLayout from "./drag-layout.vue";
import "./style/style.scss";
DragLayout.install = (Vue) => {
  Vue.component(DragLayout.name, DragLayout);
};
export default DragLayout;
