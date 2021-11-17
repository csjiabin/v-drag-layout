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
          backgroundImage:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftxt39-1.book118.com%2F2018%2F0507%2Fbook165302%2F165301959.jpg&refer=http%3A%2F%2Ftxt39-1.book118.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639708958&t=867dee96903c64789947fe525e17cf5a",
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
