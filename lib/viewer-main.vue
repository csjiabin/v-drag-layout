<template>
  <draggable
    v-model="views"
    group="widget"
    ghost-class="ghost"
    :animation="200"
    class="viewer-main"
    handle=".drag-widget"
    @add="handleWidgetAdd"
  >
    <template v-for="(view, index) in views">
      <viewer-item
        :key="view.uid"
        :index="index"
        :views="views"
        :select.sync="selectWidget"
      />
    </template>
  </draggable>
</template>
<script>
import Draggable from "vuedraggable";
import ViewerItem from "./viewer-item.vue";
// import Scrollbar from "./scrollbar";
import { uuid, cloneDeep } from "./utils/util";

export default {
  name: "v-drag-viewer",
  components: {
    Draggable,
    ViewerItem,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    select: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      views: this.value,
      selectWidget: this.select,
    };
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(v) {
        this.views = v;
      },
    },
    views: {
      deep: true,
      immediate: true,
      handler(v) {
        this.$emit("input", v);
      },
    },
  },
  methods: {
    handleWidgetAdd({ newIndex }) {
      console.log(
        "%c 🍲 res.data: ",
        "font-size:20px;background-color: #33A5FF;color:#fff;",
        newIndex,
        this.views
      );
      // console.log("add", evt);
      // const to = evt.to;
      // console.log(to);
      //为拖拽到容器的元素添加唯一 key
      // const uid = uuid();
      // let widget = this.views[newIndex];
      // let newWidget = {
      //   ...cloneDeep(widget),
      //   uid,
      //   // 绑定键值
      //   model: widget.type + "_" + uid,
      // };
      // this.$set(this.views, newIndex, newWidget);
      // this.handleWidgetSelect(newWidget, newIndex);
    },
  },
};
</script>
