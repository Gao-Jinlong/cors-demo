#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require("../app")
var debug = require("debug")("cors-demo:server")
var fs = require("fs")
var path = require("path")
var http = require("http")
// var https = require("https")
// var privateKey = fs.readFileSync(path.resolve("../private.pem"))
// var certificate = fs.readFileSync(path.resolve("../file.crt"))
var expressWs = require("express-ws")
var createError = require("http-errors")
// var credentials = { key: privateKey, cert: certificate }
/**
 * Get port from environment and store in Express.
 */

// var port = normalizePort(process.env.PORT || "3000")
// app.set("port", port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app)
// var httpsServer = https.createServer(credentials, app)
expressWs(app, server)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(3000, function () {
  console.log("httpServer is running on port 3000")
})
// httpsServer.listen(3001, function () {
//   console.log("httpsServer is running on port 30001")
// })
server.on("error", onError)
server.on("listening", onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges")
      process.exit(1)
      break
    case "EADDRINUSE":
      console.error(bind + " is already in use")
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address()
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
  debug("Listening on " + bind)
}
