var express = require("express")
var router = express.Router()
/* GET home page. */
router.get("/setCookie", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://127.0.0.1:5173")
  res.header("Access-Control-Allow-Credentials", true)

  console.log("set cookie", req.cookies)
  res.cookie("remember-me", "2", {
    expires: new Date(Date.now() + 900000),
    sameSite: "none", // 仅在 https 时才可用
    secure: true,
  })
  res.send()
})
// router.options("/", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173")
//   console.log("req-cookie", req.cookies)
//   res.send()
// })
router.get("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://127.0.0.1:5173")
  // 携带 cookie
  res.header("Access-Control-Allow-Credentials", true)
  // 打印 cookie
  console.log("cookies--------", req.cookies)
  res.send("success response api")
})

router.post("/update", function (req, res, next) {
  // console.log('request body', req.body)
  res.send("success update from server")
})

module.exports = router
