<template>
  <div class="drag-layout">
    <div class="drag-layout__left">
      <div class="components-title">
        <button
          v-for="(item, index) in options"
          :key="index"
          @click="handleGroup(item)"
          :class="{ active: activeGroup.group == item.group }"
        >
          {{ item.name }}
        </button>
      </div>
      <div class="components-content">
        <template v-for="(option, index) in options">
          <keep-alive :key="index">
            <div v-if="activeGroup.group == option.group">
              <div
                class="widget-item"
                v-for="item in option.list"
                :key="item.type"
              >
                <h4 class="widget-title">
                  {{ item.name }}
                </h4>

                <draggable
                  :filter="item.dragOnce ? '.disdraggable' : ''"
                  :group="{ name: 'widget', pull: 'clone', put: false }"
                  :sort="false"
                  ghost-class="ghost"
                >
                  <div class="widget-box">
                    <img :alt="item.name" :src="item.icon" width="100%" />
                  </div>
                </draggable>
              </div>
            </div>
          </keep-alive>
        </template>
      </div>
    </div>
    <div class="drag-layout__content">
      <div class="toolbar">
        <button>重置</button>
        <button>预览</button>
        <button>保存</button>
      </div>
      <div class="viewer-wrapper">
        <div class="editor-main" style="width: 375px">
          <div class="viewer-nav">
            <div class="viewer-nav__statusbar">09:30AM</div>
            <div
              class="viewer-nav__title"
              :style="{
                backgroundColor: config.navigatorColor,
                color: config.navigatorTitleColor,
              }"
            >
              {{ config.title }}
            </div>
          </div>
          <div
            class="viewer-main"
            v-click-outside="clickOutside"
            @click="isClickOutside = true"
          >
            <drag-main v-model="views" />
          </div>
        </div>
      </div>
    </div>
    <div class="drag-layout__right"></div>
  </div>
</template>
<script>
export const defaultConfig = {
  title: "页面标题",
  backgroundColor: "#f7f8f9",
  navigatorTitleColor: "#333",
  navigatorColor: "#fff",
};
import Draggable from "vuedraggable";
import DragMain from "./drag-main.vue";
import clickOutside from "./directives/click-outside.js";
export default {
  name: "v-drag-layout",
  directives: {
    clickOutside,
  },
  components: {
    Draggable,
    DragMain,
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
    options: {
      type: Array,
      default: () => [],
    },
    activeColor: String,
  },
  data() {
    return {
      activeGroup: this.options[0],
      config: this.value.config || defaultConfig,
      views: this.value.views,
      isClickOutside: false,
    };
  },
  methods: {
    handleGroup(item) {
      this.activeGroup = item;
    },
    clickOutside() {
      this.isClickOutside = false;
    },
  },
};
</script>
