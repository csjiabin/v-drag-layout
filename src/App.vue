<template>
  <div id="app">
    <v-drag-layout :options="options" v-model="data"> </v-drag-layout>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      options: [
        {
          group: "base",
          name: "基础",
          list: [
            {
              type: "image",
              name: "图片",
              icon: "icon-tupian",
              options: {
                value: [],
              },
            },
          ],
        },
        {
          group: "advanced",
          name: "高级",
          list: [
            {
              type: "banner",
              name: "轮播图",
              icon: "icon-tupian",
              options: {
                value: [],
              },
            },
          ],
        },
      ],
      data: {
        views: [],
        config: {
          title: "title",
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
