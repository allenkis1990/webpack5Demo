var path = require('path');
var {CleanWebpackPlugin} = require('clean-webpack-plugin');//清空dist文件夹
var HtmlWebpackPlugin = require('html-webpack-plugin');//生成index.html
var MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件
var CssMinimizerPlugin = require('css-minimizer-webpack-plugin')//压缩css插件
var WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')//压缩JS


const AddFavIcoPlugin = require('./plugins/addFavIcoPlugin.js')

var webpack = require('webpack')
let env = process.env.NODE_ENV
console.log(env);
module.exports = {
  target: "web",//配置web解决dev-server不更新问题
  // mode: 'development',
  entry: {app:'./src/main.js'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash:6].js',
    //异步加载生成的JS文件
    chunkFilename:'js/[id].[hash:6].js',


    // library: {
    //   //name: 'MYMODULE', //移除name
    //   type: 'commonjs2',
    //   export: 'default'
    // }

    // publicPath:'/'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    },
  },
  resolveLoader: {
    mainFields:['main'],
    modules: [path.resolve(__dirname,"loaders"),path.resolve(__dirname,"./node_modules")]
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,//注意这边
          options: {
            publicPath: '../'//解决css下的图片路径错误问题
          }
        }/*,'style-loader'*/,'css-loader','postcss-loader']
      },
      {
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,//注意这边
          options: {
            publicPath: '../'//解决css下的图片路径错误问题
          }
        }/*,'style-loader'*/,'css-loader','sass-loader','postcss-loader']
      },
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        type: 'asset',
        generator:{
          filename:'img/[name].[hash:6][ext]'
        },
        parser:{
          dataUrlCondition: {
            maxSize: 8*1024
          }
        }
      },
      {
        test: /\.(ttf|woff2?)$/,
        type:'asset/resource',
        generator:{
          filename:'font/[name].[hash:3][ext]'
        },
      },
      {
        test:/\.html$/,
        loader:'html-loader'
      },
      {
        test:/\.js$/,
        use:['babel-loader']
      },
      {
        test:/text\.txt$/,
        use:{
          loader:'txtLoader'
        }
      },
      {
        test:/article\.txt$/,
        use:{
          loader:'txtLoader',
          options:{
            author:'Allen Liu'
          }
        }
      }
    ]
  },
  plugins: [
    // new CssMinimizerPlugin(),
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false, //不需要格式化
          comments: false //不保留注释
        },
        compress: {
          // warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
          drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
          collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: "style/[name].[hash:8].css",
      //异步加载生成的CSS
      chunkFilename: "style/[id].[hash:8].css"}),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns:[path.resolve(__dirname,'dist')]
    }),
    new HtmlWebpackPlugin({
      filename: `index.html`,//真正输出的地址output.path+filename=./dist/index.html
      template:path.resolve(__dirname,`index.html`),//INdex的模板
      inject: true,
      // hash:true,
      // minify: {
      //   removeAttributeQuotes: true, // 移除属性的引号
      //   collapseWhitespace:true,//html片段变成一行
      //   removeComments: true
      // },
      chunks:['app','vendor','manifest']//按需映入入口JS
    }),
    //注入库 无须引入
    new webpack.ProvidePlugin({
      $: "jquery"
    }),
    //注入全局变量
    new webpack.DefinePlugin({
      "window.is_production":env === 'production'
    }),
    new AddFavIcoPlugin()
  ],
  devServer:{
    inline:true,
    hot: true,
    hotOnly:true,
    port:8000,
    //开启服务端压缩
    compress: true,
    //使用 History 路由模式时，若404错误时被替代为 index.html
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      cacheGroups:{
        vendor: {
          //initial(初始块)、async(按需加载块)、 all(全部块)
          chunks: 'all',
          test:/[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },
    //抽取webpack运行文件代码
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new CssMinimizerPlugin()
    ]
    // moduleIds: 'hashed'
  }
};