<template>
  <div
    class="widget-view drag-widget"
    :class="{ active }"
    :style="{ outlineColor: active ? activeColor : null }"
    @click.stop="handleSelectWidget(index)"
  >
    <slot :view="view" :index="index">
      <div class="widget-view__default">{{ view.name }}{{ index }}</div>
    </slot>
    <div
      class="widget-view__action"
      :style="{ backgroundColor: activeColor }"
      v-if="active"
    >
      <i
        class="dragicon dragicon-copy"
        @click.stop="$emit('clone', view, index)"
      />
      <i
        class="dragicon dragicon-trash"
        @click.stop="$emit('remove', view, index)"
      />
    </div>
    <!-- <div class="widget-view__drag" v-if="active">
      <i class="dragicon dragicon-drag drag-widget" />
    </div> -->
  </div>
</template>
<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    view: {
      type: Object,
      default: () => ({}),
    },
    views: {
      type: Array,
      default: () => [],
    },
    select: {
      type: Object,
      default: () => ({}),
    },
    activeColor: String,
  },
  computed: {
    active() {
      return this.select.uid == this.view.uid;
    },
  },
  methods: {
    handleSelectWidget(index) {
      this.$emit("select", index, this.view);
    },
  },
};
</script>
