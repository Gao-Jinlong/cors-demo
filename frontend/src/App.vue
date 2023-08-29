<template>
  <h1>App</h1>
  <img
    id="imgElement"
    width="200"
    height="200"
    class="avatar"
    src="http://localhost:3000/static/images/avatar.jpg"
  />
  <canvas width="200" height="200" id="canvas"></canvas>

  <div class="box"></div>
  <button @click="sendSocket">send message</button>
  <button @click="closeSocket">close socket</button>
</template>
<script setup lang="ts">
import axios from "axios"
import { onMounted } from "vue"

// axios.defaults.baseURL = "https://localhost:3001"

// 设置 cookie
axios.defaults.withCredentials = true

axios
  .get("/api/setCookie", {
    baseURL: "https://localhost:3001",
  })
  .then((res) => {
    console.log("get cookie", document.cookie)
    document.cookie = "remember-me=3"

    axios.get("/api", {
      withCredentials: true,
      baseURL: "https://localhost:3001",
    })
  })

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

// EventSource
const eventSource = new EventSource("http://localhost:3000/event")
eventSource.onmessage = function (e) {
  const box = document.querySelector(".box")!
  const item = document.createElement("div")
  item.innerText = "EventSource:" + e.data
  box.appendChild(item)
}
eventSource.onopen = function (e) {
  console.log("EventSource open", e)
}
eventSource.onerror = function (err) {
  console.error("EventSource error: ", err)
}

eventSource.addEventListener("update", function (e) {
  console.log("update", e.data)
})

onMounted(() => {
  // const img = new Image()
  // img.src = "http://localhost:3000/static/images/avatar.jpg"

  const canvas = document.querySelector("#canvas")! as HTMLCanvasElement
  const ctx = canvas.getContext("2d")!

  const img = document.querySelector("#imgElement")
  console.log(img)
  img.onload = () => {
    console.log("img onload")
    ctx.drawImage(img, 0, 0, 200, 200)
    // 读取图像数据
    const imageData = ctx.getImageData(0, 0, 200, 200)
    console.log("data")

    console.log(imageData)
  }
})
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
