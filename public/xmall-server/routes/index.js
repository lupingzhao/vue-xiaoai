const router = require('koa-router')()
const goodsData = require('../data/goods')
const recommend = require('../data/recommend')
const Goods = require('../models/goods.js')


router.get('/', async ctx => {
  goodsData.map((item, index) => {
    let newGoods = new Goods(item)
    newGoods.save().then(res => {
    }).catch(err => {
      console.log(err)
    })

  })
  ctx.body =  '导入数据成功'
})

module.exports = router
