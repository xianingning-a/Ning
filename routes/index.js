var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   let userName = req.session.username || ''
//   res.render('index', { userName });
// });

//登录路由配置
router.get('/login',function(req,res){
  res.render('login',{})
})
//文章详情页路由配置
router.get('/details',function(req,res){
  res.render('details',{})
})
//首页路由
router.get('/home',function(req,res,next){
  let userName = req.session.username || ''
  res.render('home',{userName})
})
//注册路由配置
router.get('/registered',function(req,res){
  res.render('registered',{})
})
//新曾页面路由配置
router.get('/add',function(req,res){
  let userName = req.session.username || ''
  res.render('add',{userName})
})
module.exports = router;
