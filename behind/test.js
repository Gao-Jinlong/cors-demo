const express = require("express")
const app = express()
const http = require("http")

const port = 3001

app.get("/", (req, res) => {
  // res.send("<h1>Hello World!</h1>")
  res.send("Hello World!")
})

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("Hello, World!\n")
})

// 监听端口
server.listen(port, () => {
  console.log("Server is running on port 3000")
})
