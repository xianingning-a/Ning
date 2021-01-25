var express = require('express');
var router = express.Router();

//当前时间
// let date = new Date()

//将用户模板导入
let Article = require('../module/article')

//添加博客接口
router.post('/cdd',(req,res,next)=>{
    console.log(req.body);

    let articleInfo = {
        titletxt:req.body.titletxt,
        content:req.body.content,
      }
    
    //页面保单数据，放入模型
    let articleI = new Article(articleInfo)
    
    //保存
    articleI.save((err,result)=>{
      if (!err) {
        res.send(result)
      }
    })
})
module.exports = router