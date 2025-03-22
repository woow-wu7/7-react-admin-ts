<template>
  <section class="app">
    <h1>this is vue app</h1>
    <h2>webpack 从零构建 vue 项目</h2>
    <img :src="logo" />
  </section>
</template>

<script setup lang="ts">
import logo from "../../../static/images/icons/主页-check.png";
</script>
<style lang="scss" scoped>
.app {
  color: red;
}
</style>
