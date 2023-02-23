<template>
  <div id="app-container-box" class="flex-c">
    <Ckeditor v-model="editData" @change="dataChange"></Ckeditor>
  </div>
  <span ref="testRef">1234</span>
</template>

<script setup lang="ts">
import Ckeditor from "@/components/Ckeditor.vue";
const editData = "测试的数据文字";

function dataChange(data: string) {
  console.log(data);
}
</script>

<style scoped lang="scss">
@import "./assets/base.scss";
.test-scss {
  color: $default-color;
}

#app-container-box {
  height: 100%;
}
</style>
