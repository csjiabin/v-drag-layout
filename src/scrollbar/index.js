import Scrollbar from './main';
import '../style/scrollbar.scss'
/* istanbul ignore next */
Scrollbar.install = function (Vue) {
  Vue.component(Scrollbar.name, Scrollbar);
};

export default Scrollbar;
