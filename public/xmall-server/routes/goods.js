const router = require('koa-router')()
const homeData = require('../data/home')
const recommend = require('../data/recommend')
const Goods = require('../models/goods.js')
const User = require('../models/user.js')
const Cart = require('../models/cart.js')
const rp = require('request-promise')

router.prefix('/goods')

// 首页数据
router.get('/home', async ctx => {
  ctx.body = {
    code: 200,
    msg: 'success',
    data: homeData,
  }
})

// 为你推荐
router.get('/recommend', ctx => {
  ctx.body = {
    code: 200,
    msg: 'success',
    data: recommend,
  }
})

// 所有商品
router.get('/allGoods', async ctx => {
  const { page = 1, size = 20, sort = '', priceGt = 0, priceLte = 1000000 } = ctx.query
  let total = await Goods.find()
  let data = await Goods.find({ salePrice: { $gt: priceGt, $lte: priceLte } }).sort({ salePrice: sort }).skip((page - 1) * size).limit(Number(size)).exec()
  ctx.body = {
    code: 200,
    msg: 'success',
    total: total.length,
    data
  }
})

// 搜索
router.get('/search', async ctx => {
  let { keyword } = ctx.query
  let reg = new RegExp(decodeURI(keyword), 'i')
  let lists = await Goods.find({
    $or: [
      {
        productName: { $regex: reg }
      }
    ]
  })
  ctx.body = {
    code: 200,
    data: lists
  }
})

// 商品详情
router.get('/detail', async ctx => {
  const { productId } = ctx.query
  let good = await rp('http://xmall.exrick.cn/goods/productDet?productId=' + productId)
  if (good) {
    ctx.body = {
      code: 200,
      msg: 'success',
      data: JSON.parse(good)
    }
  } else {
    ctx.body = {
      code: 500,
      msg: 'fail'
    }
  }
})

// 加入购物车
router.post('/addCart', async ctx => {
  let { productId, count = 1 } = ctx.request.body
  let result = await rp('http://xmall.exrick.cn/goods/productDet?productId=' + productId)
  let good = JSON.parse(result).result
  let cart = await Cart.findOne({
    productName: good.productName,
    productId: good.productId
  })
  if (cart) {
    let res = await Cart.findByIdAndUpdate(cart._id, {
      $set: {
        count: cart.count += count
      }
    })
    if (res) {
      ctx.body = {
        code: 200,
        msg: '加入购物车成功'
      }
    }
  } else {
    good.count = count
    let newGoods = new Cart(good)
    let res = newGoods.save()
    if (res) {
      ctx.body = {
        code: 200,
        msg: '加入购物车成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '加入购物车失败'
      }
    }
  }


})

// 获取购物车
router.get('/getCart', async ctx => {
  let carts = await Cart.find()
  if (carts.length > 0) {
    ctx.body = {
      code: 200,
      msg: 'success',
      data: carts
    }
  }
})

// 修改购物车数量
router.post('/editCart', async ctx => {
  let { count, productId } = ctx.request.body
  let res = await Cart.findByIdAndUpdate(productId, {
    count: count
  })
  if (res) {
    ctx.body = {
      code: 200,
      msg: '修改成功'
    }
  } else {
    ctx.body = {
      code: 500,
      msg: '修改失败'
    }
  }
})

// 删除购物车
router.post('/delCart', async ctx => {
  let { productId } = ctx.request.body
  let res = await Cart.findByIdAndDelete(productId)
  if (res) {
    ctx.body = {
      code: 200,
      msg: '删除成功'
    }
  } else {
    ctx.body = {
      code: 500,
      msg: '删除失败'
    }
  }
})

module.exports = router
