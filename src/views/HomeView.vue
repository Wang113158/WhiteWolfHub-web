<script setup lang="ts">
import { ref, onMounted } from 'vue'
import imageListData from '@/assets/imageList.json'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

interface ImageItem {
  id: string
  src: string
  name: string
}

const imageList = ref<ImageItem[]>([])

function randomID(length = 6): string {
  return (
    Math.random()
      .toString(36)
      .slice(2, 2 + length) + Date.now().toString(36)
  )
}

onMounted(() => {
  imageList.value = imageListData.map((imagePath: string) => ({
    id: randomID(),
    src: imagePath,
    name: imagePath.split('/').pop() || '',
  }))
})
</script>

<template>
  <h1 class="hubname">My Hub</h1>
  <Waterfall :list="imageList" :width="320" :gutter="16">
    <template #default="{ item }">
      <div class="image-wrapper">
        <LazyImg :url="item.src" alt="Image" />
        <p class="image-filename">{{ item.name }}</p>
      </div>
    </template>
  </Waterfall>
</template>

<style scoped>
h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.waterfall-list {
  background-color: transparent !important;
}

.image-wrapper {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: auto;
  display: block;
}

.image-filename {
  padding: 8px;
  text-align: center;
  font-size: 16px;
  color: #333;
}
</style>
