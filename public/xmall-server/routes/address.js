const router = require('koa-router')()
const Address = require('../models/address')
router.prefix('/address')

router.get('/list', async ctx => {
  let lists = await Address.find().sort({ 'isDefault': -1 })
  ctx.body = {
    code: 200,
    msg: 'success',
    data: lists
  }
})

router.post('/addAddress', async ctx => {
  let { username, phone, address, isDefault = false } = ctx.request.body
  let newAddress = new Address({
    username,
    phone,
    address,
    isDefault
  })
  let res = await newAddress.save()
  if (res) {
    ctx.body = {
      code: 200,
      msg: '添加成功',
      data: newAddress
    }
  }
})

// 删除地址
router.post('/deleteAddress', async ctx => {
  let {addressId} = ctx.request.body
  let res = await Address.findByIdAndDelete(addressId)
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


// 设置默认地址
router.post('/setDefault', async ctx => {
  let { addressId } = ctx.request.body
  await Address.updateMany({}, {
    $set: {
      isDefault: false
    }
  })
  let res = await Address.findByIdAndUpdate(addressId, {
    isDefault: true
  })
  if (res) {
    ctx.body = {
      code: 200,
      msg: '设置成功'
    }
  } else {
    ctx.body = {
      code: 500,
      msg: '设置失败'
    }
  }
})


// 修改地址
router.post('/editAddress', async ctx => {
  let { addressId, username, phone, address, isDefault = false } = ctx.request.body
  if (isDefault) {
    await Address.updateMany({}, {
      $set: {
        isDefault: false
      }
    })
    await Address.findByIdAndUpdate(addressId, {
      isDefault: true
    })
  }
  await Address.findByIdAndUpdate(addressId, {
    $set: {
      username,
      phone,
      address,
      isDefault
    }
  })
  ctx.body = {
    code: 200,
    msg: '修改成功'
  }
})


module.exports = router