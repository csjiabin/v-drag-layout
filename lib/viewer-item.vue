<template>
  <div
    class="viewer-item drag-widget"
    :class="{ active }"
    :style="{ outlineColor: active ? activeColor : null }"
    @click.stop="handleSelectWidget(index)"
  >
    <slot :view="view" :index="index">
      <div class="viewer-item__default">{{ view.name }}{{ index }}</div>
    </slot>
    <div
      class="viewer-item__action"
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
    <!-- <div class="viewer-item__drag" v-if="active">
      <i class="dragicon dragicon-drag drag-widget" />
    </div> -->
  </div>
</template>
<script>
export default {
  name: "v-drag-viewer-item",
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
      if (this.active) return;
      this.$emit("select", this.view, index);
    },
  },
};
</script>
