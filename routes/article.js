var express = require('express');
var router = express.Router();

//当前时间
// let date = new Date()

//将用户模板导入
let Article = require('../module/article')
//上传文件工具导入
var Multiparty = require('Multiparty')
//
let fs = require('fs')

//添加博客接口
router.post('/cdd', (req, res, next) => {
  console.log(req.body);
  // let date = new Date();
  // console.log(date);

  //首先获取文章id，依次判断是新增还是编辑
  let nId = req.body.dId || ''
  // console.log(nId);
  //新增

  if (!nId) {
    var articleInfo = {
      titletxt: req.body.titletxt,
      content: req.body.content,
      datetime: Date.now(),
    }

    //页面保单数据，放入模型
    let articleI = new Article(articleInfo)

    //保存
    articleI.save((err, result) => {
      if (!err) {
        // res.send(result)
        res.redirect('/home')
      }
    })

  } else {//编辑
    let page = req.body.page

    let articleInfo = {
      titletxt: req.body.titletxt,
      content: req.body.content,
    }

    Article.findByIdAndUpdate(nId, articleInfo, { new: true }, (err, result) => {
      if (!err) {
        res.redirect(`/home?page=${page}`)
      }
    })

  }



})

//新增上传图片的路由
router.post('/upload', (req, res, next) => {
  //图片文件上传的操作
  console.log(req.body);
  //实例化Multiparty的from
  let form = new Multiparty.Form()
  //使用path，获取文件信息
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
    }
    // console.log(fields + '第一个');
    // console.log(files.upload[0]);
    let file = files.upload[0]
    //将读取道德文件信息，及文件上传到本项目下，也就是服务器
    //读取文件流
    let rStream = fs.createReadStream(file.path)
    //拼接路径
    let filePath = '/uploads/' + file.originalFilename
    //写入文件流
    let wStream = fs.createWriteStream('./public' + filePath)
    //触发读写管道，实现上传
    rStream.pipe(wStream)
    //将文件返回ckeditor这个插件
    wStream.on('close', () => {
      res.send({
        uploaded: 1,
        url: filePath
      })
    })
  })
})


//文章删除的接口
router.get('/delete',(req,res,next)=>{
  let id = req.query._id
  let page = req.query.page
  console.log(id,page);
  //从后台删除一条数据
  Article.deleteOne({_id:id},err => {
    if (!err) {
      // res.send('删除成功')
      res.redirect(`/home?page=${page}`)
    }
  })
})
module.exports = router