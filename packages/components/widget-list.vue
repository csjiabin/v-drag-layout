<template>
  <draggable
    tag="ul"
    :list="options"
    :group="{ name: 'people', pull: 'clone', put: false }"
    ghost-class="ghost"
    :sort="false"
    @end="handleMoveEnd"
    @start="handleMoveStart"
    :move="handleMove"
  >
    <template v-for="(item, index) in options">
      <li class="widget-label" :key="index">
        <slot :item="item" :index="index">
          <i v-if="item.icon" class="icon dragicon" :class="item.icon" />
          <span>{{ item.name }}</span>
        </slot>
      </li>
    </template>
  </draggable>
</template>
<script>
import Draggable from "vuedraggable";
export default {
  components: {
    Draggable,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    // 移动结束evt
    handleMoveEnd() {
      // console.log("left end", evt);
    },
    // 移动开始{ oldIndex }
    handleMoveStart() {
      // console.log("left start", oldIndex, this.options);
    },
    handleMove() {
      return true;
    },
  },
};
</script>
