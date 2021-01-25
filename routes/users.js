var express = require('express');
var router = express.Router();
let joi = require('joi')


//将用户模板导入
let User = require('../module/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//实现用户提交信息，注册事项
//Response 响应
//Request  请求
router.post('/addUser',(req,res,next)=>{

   console.log(req.body);
   //用户填写的表单信息可以通过req.body获取到


  // res.send('点击注册了')


  // 向数据库添加用户信息
  let userInfo = {
    userName:req.body.userName,
    password:req.body.password,
    passwordC:req.body.passwordC
  }

  //用户验证
  // if (userInfo.password !== userInfo.passwordC) {
  //   let error = {
  //     state:0,//错误编码
  //     stack:''//错误代码
  //   }
  //   res.render('error',{error,message:'密码不一致'})
  // }


  // const schema = Joi.object({
  //   userName:Joi.String().min(2).max(12).require().err(new Error('用户名不符合验证规则')),
  //   password:Joi.String().regex(2).max(12).require().err(new Error('用户名不符合验证规则')),
  // }) 



  //页面保单数据，放入模型
  let userI = new User(userInfo)

  //保存
  userI.save((err,result)=>{
    if (!err) {
      res.send(result)
    }
  })

})

//登录--查询
router.post('/login',(req,res,next)=>{
  //从表单获取数据
  let userinfo = {
    userName:req.body.username,
    password:req.body.password,
  }
  //验证
  //查询
  User.findOne(userinfo,function(err,result){
    if (err) {
      return console.log(err);
    }
    if (result==null) {
      console.log('登录失败');
      res.redirect('/registered')
    } else {
      //将用户信息存储
      req.session.username = userinfo.userName

      console.log('登录成功');
      //路由重定向
      res.redirect('/home')
    }
  })
})


module.exports = router;
