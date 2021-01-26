let mongoose = require('../mongodb/db')

let Schema = mongoose.Schema

let articleSchema = new Schema({
    titletxt:String,
    content:String,
    datetime:String,
})
//Model-----将会生成数据库集合名（复数）
let Article = mongoose.model('article',articleSchema)

module.exports = Article