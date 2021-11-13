#### 🚀 Installation

```bash
npm install v-drag-layout
# or
yarn add v-drag-layout
```

##### Using Connection String

```javascript
// main.js
import Vue from "vue";
import VDragLayout from "v-drag-layout";
import "v-drag-layout/dist/style.css";
Vue.use(VDragLayout);
```

<!-- vue file -->

```html
<template>
  <v-drag-layout
    :options="options"
    v-model="data"
    @click:nav="handleClickNavClick"
    @select="handleWidgetSelect"
  >
    <!-- 左侧 -->
    <template #widget="{ data }"> {{ data.name }} </template>
    <!-- 视图 -->
    <template #view="{ index }">
      <div style="height: 100px">{{ index }}</div>
    </template>
    <!-- 配置 -->
    <template #empty>从左侧拖拽来添加视图</template>
    <!-- 视图 -->
    <template #conf="{ data }">{{ data }} </template>
    <!-- 页面 -->
    <template #page="{ data }">{{ data }}</template>
  </v-drag-layout>
</template>
<script>
  export default {
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
                    dragOnce: true,
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
    methods: {
      // 点击导航
      handleClickNavClick(config) {
        console.log(config);
      },
      // 视图点击
      handleWidgetSelect(view, index) {
        console.log(view, index);
      },
    },
  };
</script>
```

![效果](https://github.com/csjiabin/v-drag-layout/blob/master/src/v2.png)
