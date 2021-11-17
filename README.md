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
  <v-drag-layout :options="options" v-model="data" @select="handleWidgetSelect">
    <template #toolbar> 自定义工具栏 </template>
    <!-- 左侧 -->
    <template #widget="{ data }"> {{ data.title }} </template>
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
                    icon: "https://image.jpg",
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
                    icon: "https://video.jpg",
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
                    icon: "https://banner.jpg",
                    options: {
                      value: [],
                    },
                  },
                  {
                    type: "banner1",
                    label: "轮播图1",
                    icon: "https://banner.jpg",
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
    methods: {
      // 视图点击
      handleWidgetSelect(view, index) {
        console.log(view, index);
      },
    },
  };
</script>
```

![效果](https://github.com/csjiabin/v-drag-layout/blob/master/src/v2.png)
