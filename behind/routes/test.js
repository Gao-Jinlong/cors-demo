var express = require("express")
var router = express.Router()
require("express-ws")(router)
/* GET home page. */
router.get("/", function (req, res, next) {
  // 打印 cookie.name
  console.log("cookie", req.cookies.name)
  res.header("Access-Control-Allow-Credentials", "true") // 携带 cookie 需要配置
  // 允许跨域配置，get 的跨域请求也需要配置
  // 解码 query
  res.send("success response api")
})

router.post("/update", function (req, res, next) {
  // console.log('request body', req.body)
  res.send("success update from server")
})

// websocket 链接
router.ws("/socket", function (ws, req) {
  console.log("websocket connect success", ws)
  ws.on("message", function (msg) {
    console.log("from client msg", msg)
    ws.send("server response")
    ws.close()
  })
})

module.exports = router
