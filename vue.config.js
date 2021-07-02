module.exports = {
  // 跨域 浏览器的同源策略
  // 同协议 同域名 同端口三个必须相同 只要有一个不想同 就会出现跨域
  // 请求会报错 拿不到结果

  // 代理接口
  devServer: {
    proxy: {
      '/api': {
        ws: false,
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  },
}