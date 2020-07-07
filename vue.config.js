module.exports = {
	publicPath: '/',
	outputDir: 'cgds',
	assetsDir: 'static',
  lintOnSave: false,
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true,
		// 开启 CSS source maps?
		sourceMap: false,
	},
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: false,
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
    host: "0.0.0.0", 
    port: '8080',
    https: false,
    hotOnly: false, 
    proxy: {
      '/smc2': {
        target: 'http://kk234.ykzq.com:7772', //API服务器的地址
        ws: true,  //代理websockets
        changeOrigin: true // 虚拟的站点需要更管origin
      }
    },
  }
}