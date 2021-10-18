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
        <div v-for="item in activeGroup.list" :key="item.type">
          <draggable
            tag="ul"
            :list="activeGroup.list"
            :group="{ name: 'widget', pull: 'clone', put: false }"
            ghost-class="ghost"
            :sort="false"
          >
            <template v-for="(item, index) in activeGroup.list">
              <li class="widget-item" :key="index">
                <h4 class="widget-title">
                  {{ item.name }}
                </h4>
                <div class="widget-box">{{ item.name }}</div>
              </li>
            </template>
          </draggable>
        </div>
      </div>
    </div>
    <div class="drag-layout__content">
      {{ activeGroup }}
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
    };
  },
  methods: {
    handleGroup(item) {
      this.activeGroup = item;
    },
  },
};
</script>
