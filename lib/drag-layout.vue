<template>
  <div class="drag-layout" :style="{ height: addUnit(height) }">
    <div class="drag-layout__left">
      <widget-list :options="options">
        <slot
          slot-scope="{ item, index }"
          name="widget"
          :data="item"
          :index="index"
        />
      </widget-list>
    </div>
    <div class="drag-layout__content">
      <div class="mobile">
        <div class="mobile-nav" @click="clickNav">
          <div class="mobile-nav__statusbar">09:30AM</div>
          <div
            class="mobile-nav__title"
            :style="{
              backgroundColor: config.navigatorColor,
              color: config.navigatorTitleColor,
            }"
          >
            <span>{{ config.title }}</span>
          </div>
        </div>
        <div
          class="view-content"
          :style="{ backgroundColor: config.backgroundColor, padding }"
        >
          <div v-if="views.length == 0" class="view-content__empty">
            <slot name="empty">从左侧拖拽来添加视图</slot>
          </div>

          <widget-container
            ref="widgetCont"
            v-model="views"
            :active-color="activeColor"
            :select="select"
            @select="setSelect"
          >
            <slot
              slot-scope="{ view, index }"
              name="view"
              :data="view"
              :index="index"
            />
          </widget-container>
          <slot name="ext-view" />
        </div>
      </div>
      <slot />
    </div>
    <div class="drag-layout__right">
      <slot name="page" :data="config" v-if="!select.uid" />
      <slot
        name="conf"
        :data="select"
        :index="selectIndex"
        v-if="select.uid && views.length"
      />
    </div>
  </div>
</template>
<script>
import WidgetContainer from "./widget-container.vue";
import WidgetList from "./widget-list.vue";
export const defaultConfig = {
  title: "title",
  backgroundColor: "#f7f8f9",
  navigatorTitleColor: "#333",
  navigatorColor: "#fff",
};
export default {
  name: "v-drag-layout",
  components: {
    WidgetList,
    WidgetContainer,
  },
  props: {
    height: {
      type: [String, Number],
      default: "100%",
    },
    value: {
      type: Object,
      default: () => ({
        views: [],
        config: defaultConfig,
      }),
    },
    padding: String,
    options: {
      type: Array,
      default: () => [],
    },
    activeColor: String,
  },
  data() {
    return {
      config: this.value.config || defaultConfig,
      views: this.value.views,
      select: {},
      selectIndex: -1,
    };
  },
  watch: {
    value(v) {
      this.views = v.views;
      this.config = v.config;
    },
    views: {
      deep: true,
      handler() {
        this.handleChange();
      },
    },
    page: {
      immediate: true,
      handler() {
        this.handleChange();
      },
    },
  },
  methods: {
    clickNav() {
      this.select = {};
      this.$emit("click:nav", this.config);
    },
    setSelect(widget, index) {
      this.handleWidgetSelect(widget, index);
    },
    handleWidgetSelect(widget, index) {
      this.select = widget;
      if (!index) {
        this.selectIndex = this.views.findIndex((v) => widget.uid === v.uid);
      } else {
        this.selectIndex = index;
      }
      this.$emit("select", widget, this.selectIndex);
    },
    handleChange() {
      const { views, config } = this;
      this.$emit("input", { views, config });
    },
    // 添加单位，如果有，%，px等单位结尾或者值为auto，直接返回，否则加上px单位结尾
    addUnit(value = "auto", unit = "px") {
      let reg = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
      value = String(value);
      // 用uView内置验证规则中的number判断是否为数值
      return reg.test(value) ? `${value}${unit}` : value;
    },
  },
};
</script>
