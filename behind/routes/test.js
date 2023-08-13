var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 允许跨域配置，get 的跨域请求也需要配置
  res.header('Access-Control-Allow-Origin', '*');
  res.send('success response api');
});

router.post('/update',function(req,res,next){
  console.log('request body', req)
  res.header('Access-Control-Allow-Origin', '*');
  res.send('success update')
})

// websocket 链接
// router.ws('/avatar', function(ws, req) {
//   ws.on('/message', function(msg) {
//     console.log(msg);
//     ws.send('server response');
//   });
// });

module.exports = router;
