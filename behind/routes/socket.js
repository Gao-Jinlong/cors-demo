var express = require("express")
var router = express.Router()
require("express-ws")(router)

// websocket
let index = 0
router.ws("/", function (ws, req) {
  ws.on("open", function () {
    console.log("socket open")
    return ws.send("from server", index++)
  })
  ws.on("message", function (msg) {
    ws.send("from server" + index++)
    if (index > 10) {
      ws.close()
    }
  })
  ws.on("close", function () {
    console.log("socket closed")
    index = 0
  })
})

module.exports = router
