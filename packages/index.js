import DragLayout from "./components/drag-layout.vue";
import "./assets/iconfont/iconfont.css";
import "./style.scss";
DragLayout.install = (Vue) => {
  Vue.component(DragLayout.name, DragLayout);
};
export default DragLayout;
