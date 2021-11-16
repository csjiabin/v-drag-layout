<template>
  <div id="app">
    <v-drag-layout :options="options" v-model="data">
      <!-- <template #toolbar> 自定义工具栏 </template> -->
      <template #widget="scope">
        <img
          :alt="scope.data.label"
          :src="scope.data.icon"
          width="100%"
          :title="scope.data.label"
        />
      </template>
      <template #conf="scope">{{ scope.data.label }}</template>
      <template #page="scope">
        <div v-for="(val, key) in scope.data" :key="key">
          {{ key }}: {{ val }}
        </div>
      </template>
      <template #view="scope">
        <img :src="scope.data.icon" width="100%" />
      </template>
    </v-drag-layout>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      options: [
        {
          type: "base",
          label: "基础",
          list: [
            {
              type: "image",
              label: "图片",
              list: [
                {
                  type: "image",
                  label: "图片",
                  icon: "https://vincentzyc.github.io/form-design/static/img/widget/button/button.jpg",
                  options: {
                    value: [],
                  },
                },
              ],
            },
            {
              type: "video",
              label: "视频",
              list: [
                {
                  type: "video",
                  label: "视频",
                  icon: "https://vincentzyc.github.io/form-design/static/img/widget/video/videoPlay.jpg",
                  dragOnce: true,
                  options: {
                    value: [],
                  },
                },
              ],
            },
          ],
        },
        {
          type: "advanced",
          label: "高级",
          list: [
            {
              type: "banner",
              label: "轮播图",
              list: [
                {
                  type: "banner",
                  label: "轮播图",
                  icon: "https://vincentzyc.github.io/form-design/static/img/widget/img/imgSlide.jpg",
                  dragOnce: true,
                  options: {
                    value: [],
                  },
                },
                {
                  type: "banner1",
                  label: "轮播图1",
                  icon: "https://vincentzyc.github.io/form-design/static/img/widget/img/imgSlide.jpg",
                  options: {
                    value: [],
                  },
                },
              ],
            },
          ],
        },
      ],
      data: {
        views: [],
        config: {
          title: "页面标题",
          backgroundColor: "#f7f8f9",
          navigatorTitleColor: "#333",
          navigatorColor: "#fff",
        },
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  height: 100%;
}
#app {
  height: 100vh;
  box-sizing: border-box;
}
</style>
