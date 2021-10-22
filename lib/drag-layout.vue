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
                  tag="ul"
                  :filter="item.dragOnce ? '.disdraggable' : ''"
                  :group="{ name: 'widget', pull: 'clone', put: false }"
                  :sort="false"
                  ghost-class="ghost"
                >
                  <li class="widget-box">
                    <img :alt="item.name" :src="item.icon" width="100%" />
                  </li>
                </draggable>
              </div>
              <!-- <draggable
            tag="ul"
            :list="activeGroup.list"
            :group="{ name: 'widget', pull: 'clone', put: false }"
            ghost-class="ghost"
            :sort="false"
          >
            <template v-for="(item, index) in activeGroup.list">
              <di class="widget-item" :key="index">
                <h4 class="widget-title">
                  {{ item.name }}
                </h4>
                <div class="widget-box">{{ item.name }}</div>
              </di>
            </template>
          </draggable> -->
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
      {{ activeGroup }}
      <draggable
        v-model="views"
        group="widget"
        ghost-class="ghost"
        :animation="200"
        tag="ul"
        class="drag-widget-layout"
        handle=".drag-widget"
      >
      </draggable>
    </div>
    <div class="drag-layout__right"></div>
  </div>
</template>
<script>
export const defaultConfig = {
  title: "title",
  backgroundColor: "#f7f8f9",
  navigatorTitleColor: "#333",
  navigatorColor: "#fff",
};
import Draggable from "vuedraggable";

export default {
  name: "v-drag-layout",
  components: {
    Draggable,
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
    };
  },
  methods: {
    handleGroup(item) {
      this.activeGroup = item;
    },
  },
};
</script>
