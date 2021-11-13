import Scrollbar from './main';
import './scrollbar.scss'
/* istanbul ignore next */
Scrollbar.install = function (Vue) {
  Vue.component(Scrollbar.name, Scrollbar);
};

export default Scrollbar;
