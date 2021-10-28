<template>
  <draggable
    v-model="views"
    group="widget"
    ghost-class="ghost"
    :animation="200"
    class="drag-main"
    handle=".drag-widget"
    @add="handleWidgetAdd"
  >
    <transition-group name="fade" tag="div" class="widget-views">
      <template v-for="(view, index) in views">
        <widget-item
          :key="view.uid"
          :index="index"
          :views="views"
          :select.sync="selectWidget"
        />
      </template>
    </transition-group>
  </draggable>
</template>
<script>
import Draggable from "vuedraggable";
import widgetItem from "./drag-widget-item.vue";
export default {
  name: "v-drag-main",
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
  methods: {
    handleWidgetAdd() {},
  },
};
</script>
