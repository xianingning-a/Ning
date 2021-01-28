var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   let userName = req.session.username || ''
//   res.render('index', { userName });
// });

//将用户模板导入
let Article = require('../module/article')

//导入时间插件
let moment = require('moment')

//登录路由配置
router.get('/login',function(req,res){
  res.render('login',{})
})
//文章详情页路由配置
router.get('/details', async function(req,res){
  

//在详情页渲染路由的时候接收一下传递过来的参数_id
let blokId = req.query._id
console.log(blokId);
// 根据获取到的id使数据库查询方法，拿到当前文章详情
 let data = await Article.findOne({_id:blokId})

 data['time'] = moment(data.datetime).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')

let userName = req.session.username || ''
  res.render('details',{userName,data})
})
//首页路由
router.get('/home', async function(req,res,next){
  let cPage = req.query.page || 1
  console.log(cPage);
  // let data = await Article.find()
  // console.log(data);
  let userName = req.session.username || ''

  let data = {
    blogList:[],//文章列表
    currPage:cPage,//当前页数
    PagesTotle:'',//总页数
  }
  //设置每页渲染的条数
  let pageSize = 2
  //确定每页显示的数据
  data.blogList = await Article.find()
    .limit(pageSize)//限定展示出来的条数
    .skip((data.currPage - 1) * pageSize)//限定从第几条开始截胡
    //总数据
    let blogAll = await Article.find()
    //总页码
    data.PagesTotle = blogAll.length/pageSize
    //将所有的时间戳转换成时间
    data.blogList.map(item => {
      let a = moment(item.datetime).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
      item['time']= a
    })
  

  res.render('home',{userName,data})
})
//注册路由配置
router.get('/registered',function(req,res){
  res.render('registered',{})
})
//新曾页面路由配置
router.get('/add', async function(req,res){
  let userName = req.session.username || ''

  let id = req.query._id || ''

  if (id) {
    let page = req.query.page
    console.log(id);
    console.log(page);
    //文章数据查询渲染
    let dataa = await Article.findOne({_id:id})
    dataa.page = page
    //时间处理
    dataa['time'] = moment(dataa.datetime).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
    res.render('add',{userName,dataa})
  }else{
    let dataa = {
      titletxt:'',
      content:'',
    }
    res.render('add',{userName,dataa})
  }
  
})
module.exports = router;
