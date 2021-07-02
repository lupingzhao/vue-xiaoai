### 首页数据

``` js
http://localhost:3456/goods/home
```

### 为你推荐

``` js
http://localhost:3456/goods/recommend
```

### 所有商品

``` js
http://localhost:3456/goods/allGoods
请求方式: get
参数: 
1.page: 请求页数(必填)
2.size: 请求条数(必填)
3.sort: 排序方式 1为升序 -1为降序
4.priceGt: 价格区间 从多少开始
5.priceLte: 价格区间 到哪结束

```

### 搜索商品

``` js
http://localhost:3456/goods/search
请求方式: get
参数:
keyword: 关键字
```

### 商品详情

``` js
http://localhost:3456/goods/detail
请求方式:get
参数:
productId: 商品id
```



### 登陆

``` js
http://localhost:3456/users/login
请求方式: post
参数:
username: 用户名
password: 密码
```

### 注册

``` js
http://localhost:3456/users/register
请求方式: post
参数:
username: 用户名
password: 密码
```

### 加入购物车

``` js
http://localhost:3456/goods/addCart
请求方式: post
参数:
productId: 商品id
```

### 查询购物车

``` js
http://localhost:3456/goods/getCarts
```

### 删除购物车的商品

``` js
http://localhost:3456/goods/delCart
请求方式: post
参数
1.productId: 商品_id
```



### 修改购物车数量

``` js
http://localhost:3456/goods/editCart
请求方式: post
参数
1.productId: 商品_id
2.count: 数量
```

### 获取全部收获地址

``` js
http://localhost:3456/address/list
```

### 添加收获地址

``` js
http://localhost:3456/address/addAddress
请求方式: post
参数:
1.username: 用户名
2.phone: 电话
3.address: 地址
4.isDefault: 是否为默认地址
```

### 设置默认地址

``` js
http://localhost:3456/address/setDefault
请求方式: post
参数:
1.addressId: 地址的_id
```

### 修改地址

``` js
http://localhost:3456/address/editAddress
请求方式: post
参数:
1.addressId: 地址的_id
2.username: 用户名
3.phone: 电话
4.address: 地址
5.isDefault: 是否为默认地址
```

### 删除地址

``` js
http://localhost:3456/address/deleteAddress
请求方式: post
参数:
addressId: 地址的_id
```

