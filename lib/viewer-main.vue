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
        :id="view.uid"
        :key="view.uid"
        :index="index"
        :views="views"
        :view="view"
        :select="selectWidget"
        @select="handleWidgetSelect"
        @clone="handleWidgetClone"
        @remove="handleWidgetRemove"
      >
        <slot :view="view" :index="index" />
      </viewer-item>
    </template>
  </draggable>
</template>
<script>
import Draggable from "vuedraggable";
import ViewerItem from "./viewer-item.vue";
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
    select: {
      deep: true,
      immediate: true,
      handler(v) {
        this.selectWidget = v;
      },
    },
  },
  methods: {
    handleWidgetAdd({ newIndex }) {
      // console.log("add", evt);
      // const to = evt.to;
      // console.log(to);
      // 为拖拽到容器的元素添加唯一 key
      const uid = uuid();
      let widget = this.views[newIndex];
      let newWidget = {
        ...cloneDeep(widget),
        uid,
        // 绑定键值
        model: widget.type + "_" + uid,
      };
      this.$set(this.views, newIndex, newWidget);
      this.handleWidgetSelect(newWidget, newIndex);
    },
    // 选中
    handleWidgetSelect(widget, index) {
      this.selectWidget = widget;
      this.$emit("update:select", widget);
      this.$emit("select", widget, index);
    },
    // 复制
    handleWidgetClone(widget, index) {
      const uid = uuid();
      let cloneData = {
        ...cloneDeep(widget),
        uid,
        // 绑定键值
        model: widget.type + "_" + uid,
      };
      this.views.splice(index, 0, cloneData);
      this.$nextTick(() => {
        this.handleWidgetSelect(cloneData, index);
      });
    },
    // 删除
    handleWidgetRemove(widget, index) {
      if (this.views.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {};
        } else {
          this.selectWidget = this.views[index - 1];
        }
      } else {
        this.selectWidget = this.views[index + 1];
      }
      this.handleWidgetSelect(this.selectWidget, index);
      this.$nextTick(() => {
        this.views.splice(index, 1);
      });
      this.$emit("remove", widget, index);
    },
  },
};
</script>
