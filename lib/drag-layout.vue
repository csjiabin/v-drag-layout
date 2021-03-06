<template>
  <div class="drag-layout">
    <div class="drag-layout__left">
      <div class="components-title">
        <button
          v-for="(item, index) in options"
          :key="index"
          @click="handleGroup(item)"
          :class="{ active: activeGroup.type == item.type }"
        >
          {{ item.label }}
        </button>
      </div>
      <div class="components-content">
        <template v-for="(option, index) in options">
          <keep-alive :key="index">
            <div v-if="activeGroup.type == option.type">
              <div
                class="widget-item"
                v-for="item in option.list"
                :key="item.type"
              >
                <h4 class="widget-title">
                  <slot name="widget-title" :data="item">
                    {{ item.label }}
                  </slot>
                </h4>

                <draggable
                  :filter="'.disdraggable'"
                  :group="{ name: 'widget', pull: 'clone', put: false }"
                  :sort="false"
                  ghost-class="ghost"
                  :move="handleMove"
                  :list="item.list"
                >
                  <div
                    v-for="subitem in item.list"
                    :key="subitem.type"
                    class="widget-box"
                    :class="{ disdraggable: disFormList(subitem) }"
                  >
                    <slot name="widget" :data="subitem">
                      <img
                        :alt="subitem.label"
                        :src="subitem.icon"
                        width="100%"
                      />
                    </slot>
                  </div>
                </draggable>
              </div>
            </div>
          </keep-alive>
        </template>
      </div>
    </div>
    <div class="drag-layout__content">
      <div class="drag-layout__content--toolbar" v-if="toolbar">
        <slot name="toolbar">
          <button class="toolbar-btn" @click="handleClickOutside">
            页面设置
          </button>
          <button class="toolbar-btn" @click="handleReset">重置</button>
          <button class="toolbar-btn" @click="handlePreview">预览</button>
          <button class="toolbar-btn" @click="handleSave">保存</button>
        </slot>
      </div>
      <div class="viewer-wrapper" @click="handleClickOutside">
        <div class="editor-main">
          <div class="viewer-nav">
            <div class="viewer-nav__statusbar">09:30AM</div>
            <div class="viewer-nav__title" :style="navStyle">
              {{ config.title }}
            </div>
          </div>

          <div class="viewer-body" :style="bodyStyle">
            <div v-if="views.length == 0" class="viewer-body__empty">
              <slot name="empty">{{ emptyText }}</slot>
            </div>
            <div class="viewer-body__mask"></div>
            <viewer-main
              ref="viewer"
              v-model="views"
              :select.sync="selectWidget"
              @click.native.stop
              @select="handleWidgetSelect"
            >
              <slot
                slot-scope="{ view, index }"
                name="view"
                :data="view"
                :index="index"
              />
            </viewer-main>
          </div>
        </div>
      </div>
    </div>
    <keep-alive>
      <div class="drag-layout__right" v-if="!selectWidget.uid">
        <slot name="page" :data="config" />
      </div>
      <div class="drag-layout__right" v-else>
        <slot name="conf" :data="selectWidget" :index="selectIndex" />
      </div>
    </keep-alive>
  </div>
</template>
<script>
const defaultConfig = {
  title: "页面标题",
  backgroundColor: "#f7f8f9",
  backgroundImage: "",
  navigatorTitleColor: "#333",
  navigatorColor: "#fff",
};
import Draggable from "vuedraggable";
import ViewerMain from "./viewer-main.vue";
import clickOutside from "./directives/click-outside.js";
import ViewerItem from "./viewer-item.vue";
import { isEmpty } from "./utils/util";
export default {
  name: "v-drag-layout",
  directives: {
    clickOutside,
  },
  components: {
    Draggable,
    ViewerMain,
    ViewerItem,
  },
  props: {
    value: {
      type: Object,
      default: () => ({
        views: [],
        config: defaultConfig,
      }),
    },
    options: {
      type: Array,
      default: () => [],
    },
    activeColor: String,
    toolbar: {
      type: Boolean,
      default: true,
    },
    emptyText: {
      type: String,
      default: "请在左侧选择页面组件",
    },
  },
  data() {
    return {
      activeGroup: this.options[0],
      config: this.value.config || defaultConfig,
      views: this.value.views,
      selectWidget: {},
      selectIndex: -1,
    };
  },
  computed: {
    navStyle() {
      const { navigatorColor, navigatorTitleColor } = this.config;
      return {
        backgroundColor: navigatorColor,
        color: navigatorTitleColor,
      };
    },
    bodyStyle() {
      const { backgroundColor, backgroundImage } = this.config;

      return {
        backgroundColor: backgroundColor,
        backgroundImage: isEmpty(backgroundImage)
          ? ""
          : `url(${backgroundImage})`,
      };
    },
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(v) {
        this.views = v.views;
        this.config = v.config;
      },
    },
    views: {
      deep: true,
      handler() {
        this.handleChange();
      },
    },
    config: {
      deep: true,
      handler() {
        this.handleChange();
      },
    },
  },
  methods: {
    handleMove() {
      return true;
    },
    handleGroup(item) {
      this.activeGroup = item;
    },
    handleClickOutside() {
      this.cancelSelect();
    },
    handleChange() {
      const { views, config } = this;
      this.$emit("input", { views, config });
    },
    handleReset() {
      this.views = [];
      this.cancelSelect();
      this.$emit("reset");
    },
    handlePreview() {
      this.$emit("preview", {
        config: this.config,
        views: this.views,
      });
    },
    handleSave() {
      this.$emit("save", {
        config: this.config,
        views: this.views,
      });
    },
    // 如果第一参数不传则重置选中
    setSelect(widget, index) {
      if (!widget) {
        this.cancelSelect();
        return;
      }
      this.handleWidgetSelect(widget, index);
    },
    cancelSelect() {
      this.selectWidget = {};
      this.selectIndex = -1;
    },
    handleWidgetSelect(widget = {}, index) {
      this.selectWidget = widget;
      this.selectIndex = index;
      this.$emit("select", widget, index);
    },
    disFormList(wgItem) {
      if (!wgItem.dragOnce) return false;
      return this.views.some((v) => v.type === wgItem.type);
    },
  },
};
</script>
