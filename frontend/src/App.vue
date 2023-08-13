<template>
  <h1>App</h1>
  <div class="box">
    <div class="item" v-for="(_, index) of new Array(1000).fill(0)">{{ index }}</div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

// 跨域连接
axios.get('/api',{
}).then(res => {
  console.log(res.headers)
})

axios.post('/api/update',{
  name: 'zhangsan',
  age: 18
}).then(res => {
  console.log(res.data)
})
</script>
<style scoped>
.box{
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.box > .item{
  background: red;
  width: 15px;
}
</style>
