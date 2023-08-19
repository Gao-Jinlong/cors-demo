const express = require("express")
const { set } = require("../app")
const router = express.Router()

// EventSource
router.get("/", function (req, res, next) {
  res.header("Content-Type", "text/event-stream")

  // EventSource 的数据格式是固定的，要以 data: （有空格）开头，以 \n\n 结尾
  const interval = setInterval(() => {
    res.write(`data: ${new Date().toLocaleString()}\n\n`)
    res.write(`data: ${new Date().toLocaleString()} \nevent: update\n\n`)
  }, 1000)

  setTimeout(() => {
    clearInterval(interval)
    res.write("event: close\n\n")
  }, 4000)
})

module.exports = router
