var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")

var app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// 添加中间件，解决跨域问题
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173") // 携带凭据时需要指明域名
  // 添加可接受的 header 类型，携带参数的 post 请求会发送一个 Content-Type: application/json 的请求头
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Connection, Sec-WebSocket-Extensions, Sec-WebSocket-Key, Sec-WebSocket-Version, Sec-WebSocket-Protocol, Upgrade"
  )
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  )
  // socket 链接需要配置
  next()
})

// static file
app.use("/static", express.static(path.join(__dirname, "public")))

var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users")
const testRouter = require("./routes/test")
const socket = require("./routes/socket")
const eventSource = require("./routes/eventSource")
const file = require("./routes/file")

app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/api", testRouter)
app.use("/socket", socket)
app.use("/event", eventSource)
app.use("/file", file)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
