<template>
  <draggable
    v-model="views"
    group="people"
    ghost-class="ghost"
    :animation="200"
    handle=".drag-widget"
    @add="handleWidgetAdd"
  >
    <transition-group name="fade" tag="div" class="widget-views">
      <template v-for="(view, index) in views">
        <widget-item
          v-if="view && view.uid"
          :key="view.uid"
          :index="index"
          :view="view"
          :views="views"
          :select="selectWidget"
          :active-color="activeColor"
          @select="handleWidgetSelect(view, index)"
          @clone="handleWidgetClone"
          @remove="handleWidgetRemove"
        >
          <slot :view="view" :index="index" />
        </widget-item>
      </template>
    </transition-group>
  </draggable>
</template>
<script>
import Draggable from "vuedraggable";
import widgetItem from "./widget-container-item";
import { uuid } from "../utils";
export default {
  components: {
    Draggable,
    widgetItem,
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
    activeColor: String,
  },
  data() {
    return {
      selectWidget: this.select,
      views: this.value,
    };
  },
  watch: {
    select: {
      immediate: true,
      handler(v) {
        this.selectWidget = v;
      },
    },
    value: {
      deep: true,
      handler(v) {
        this.views = v;
      },
    },
    views: {
      deep: true,
      handler(v) {
        this.$emit("input", v);
      },
    },
  },
  created() {
    document.body.ondrop = (ev) => {
      let isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
      if (isFirefox) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    };
  },
  methods: {
    handleSelectWidget(index) {
      // console.log(index, "#####");
      this.selectWidget = this.views[index];
    },
    handleWidgetAdd({ newIndex }) {
      // console.log("add", evt);
      // const to = evt.to;
      // console.log(to);
      //为拖拽到容器的元素添加唯一 key
      const uid = uuid();
      let widget = this.views[newIndex];
      let newWidget = {
        ...widget,
        uid,
        // 绑定键值
        model: widget.type + "_" + uid,
      };
      this.$set(this.views, newIndex, newWidget);
      this.handleWidgetSelect(newWidget, newIndex);
    },
    handleWidgetSelect(widget, index) {
      this.selectWidget = widget;
      this.$emit("select", widget, index);
    },
    // 复制
    handleWidgetClone(widget, index) {
      const uid = uuid();
      let cloneData = {
        ...widget,
        uid,
        // 绑定键值
        model: widget.type + "_" + uid,
      };
      this.views.splice(index, 0, cloneData);
      this.$nextTick(() => {
        this.selectWidget = cloneData;
      });
    },
    // 删除
    handleWidgetRemove(widget, index) {
      if (this.views.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {};
        } else {
          this.selectWidget = this.views[index - 1];
          this.handleWidgetSelect(this.selectWidget, index);
        }
      } else {
        this.selectWidget = this.views[index + 1];
        this.handleWidgetSelect(this.selectWidget, index);
      }
      this.$nextTick(() => {
        this.views.splice(index, 1);
      });
      this.$emit("remove", widget, index);
    },
  },
};
</script>
