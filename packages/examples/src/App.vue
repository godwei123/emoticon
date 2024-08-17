<script setup lang="ts">
import  * as CompList from "emoticon-vue";

</script>

<template>
  <h1>hello</h1>
  <div style="display: grid;grid-template-columns: repeat(3,1fr);gap: 20px">
    <div style="display: flex;flex-direction: column;align-items: center" v-for="(item,index) in CompList" :key="index">
      <component :is="item" width="100" height="100"></component>
      <span>{{index}}</span>
    </div>
  </div>

</template>
