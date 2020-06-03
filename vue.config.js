module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= '粤开证券炒股大赛'
        return args
      })
  },
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost", 
    port: '8080',
    https: false,
    hotOnly: false, 
    proxy: {
      '/smc2': {
        target: 'http://kk234.ykzq.com:7772', //API服务器的地址
        ws: true,  //代理websockets
        changeOrigin: true // 虚拟的站点需要更管origin
        // pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
        //     '^/smc2': '/smc2'
        // }
      }
    },
  }
}