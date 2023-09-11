var express = require("express")
var router = express.Router()
/* GET home page. */
// router.get("/setCookie", function (req, res, next) {
// res.header("Access-Control-Allow-Origin", "https://127.0.0.1:5173")
// res.header("Access-Control-Allow-Credentials", true)

// console.log("set cookie", req.cookies)
// res.cookie("remember-me", "2", {
//   expires: new Date(Date.now() + 900000),
//   sameSite: "none", // 仅在 https 时才可用
//   secure: true,
// })
// res.send()
// })
// router.options("/update", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*") // 是否允许跨域
//   res.header("Access-Control-Allow-Headers", "Content-Type") // 允许携带的 header 标识
//   res.send()
//   res.end()
// })
router.get("/", function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*")
  res.header("Content-Type", "text/plain")
  // 携带 cookie
  // res.header("Access-Control-Allow-Credentials", true)
  // 打印 cookie
  // console.log("cookies--------", req.cookies)
  res.send("success")
})

router.post("/update", function (req, res, next) {
  // console.log('request body', req.body)
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173")

  console.log(req.body)
  res.send("success update from server")
})

module.exports = router
