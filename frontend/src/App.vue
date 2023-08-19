<template>
  <h1>App</h1>
  <div class="box"></div>
  <button @click="sendSocket">send message</button>
  <button @click="closeSocket">close socket</button>
</template>
<script setup lang="ts">
import axios from "axios"

axios.defaults.baseURL = "http://localhost:3000"

document.cookie = "name=ginlon"
document.cookie = "age=18"

// 设置 cookie
axios.defaults.withCredentials = true

// // 跨域连接
// axios
//   .get("/", {
//     params: {
//       name: encodeURI("张三"),
//       age: 18,
//     },
//   })
//   .then((res) => {
//     console.log(res.headers)
//   })

// axios
//   .post(
//     "/api/update",
//     {
//       name: "zhangsan",
//       age: 18,
//     },
//     {
//       headers: {
//         "Content-Type": "application/json", // 带参数的 post 请求会在头部
//         Authorization: "123",
//       },
//     }
//   )
//   .then((res) => {
//     console.log(res.data)
//   })

// const xhr = new XMLHttpRequest()
// xhr.withCredentials = false

// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4) {
//     console.log("ready state", xhr.responseText)
//   }
// }
// xhr.open("POST", "http://localhost:3000/api/update", true)
// xhr.setRequestHeader("Content-Type", "application/json")
// xhr.send(
//   JSON.stringify({
//     name: "Ginlon",
//     age: "18",
//   })
// )

// websocket
const socketConnect = new WebSocket("ws://localhost:3000/socket")
socketConnect.onopen = function (evt) {
  console.log("websocket open", evt)
}
socketConnect.onmessage = function (e) {
  console.log("websocket message", e)
  const box = document.querySelector(".box")!
  const item = document.createElement("div")
  item.innerText = e.data
  box.appendChild(item)
  setTimeout(() => {
    socketConnect.send("confirm")
  }, 100)
}
socketConnect.onclose = function () {
  console.log("websocket close")
}
socketConnect.onerror = function (err) {
  console.error("websocket error", err)
}

const closeSocket = () => {
  socketConnect.close()
}
const sendSocket = () => {
  socketConnect.send("hello")
}
</script>
<style scoped>
.box {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.box > .item {
  background: red;
  width: 15px;
}
</style>
