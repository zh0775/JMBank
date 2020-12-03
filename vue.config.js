const Timestamp = new Date().getTime();
module.exports = {
  runtimeCompiler : true,
  devServer: {
    proxy: {
      "/api": {
        target: "https://developer.api.autodesk.com",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  lintOnSave: false, //关闭eslint的
  configureWebpack: {
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
        filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
        chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
      },
   }
}
