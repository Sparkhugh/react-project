var path=require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack=require('webpack');

// 使用 cross-env 动态设置进程的环境变量
var env=process.env.NODE_ENV
//console.log('---------------',env)

//默认为生产环境打包 env=production
var config={
	mode:'production',
	entry:path.join(__dirname,'./src/main.js'),
	output:{
		filename:'bundle.js',
		path:path.resolve(__dirname,'./dist')
	},
	resolve:{
		//别名
		alias:{
			'@':path.resolve(__dirname,'./src')		//配置绝对路径
		}
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:path.join(__dirname,'./public/index.html')
		})
	],
	module:{
		rules:[
			{	//第一条规则
				test:/\.(css|scss)$/,
				use:[
					{loader:"style-loader"},
					{loader:"css-loader"},
					{loader: "sass-loader"}
				]
			},
			{	//第二条规则
				test:/\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use:[
					{loader:"babel-loader"}
				]
			},
			{//第四条规则
				test:/\.(png|jpg|gif)$/,
				use:[
					{loader: 'file-loader'}
				]
			}
		]
	}
}

//开发环境运行 env=development
if(env==='development'){
	config.mode='development'
	config.output={
		filename:'bundle.js',
		path:path.resolve(__dirname,'./public')
	}
	//本地服务和热更新
	config.devServer={
		contentBase:path.join(__dirname,'./public'),		//指定目录
		compress:true,		//压缩
		port:8012,			//自定义端口
		hot:true			//热更新
	}
	//第三条规则
	config.module.rules.push({
		test:/\.(js|jsx)$/,
		exclude:/node_modules/,
		enforce:'pre',		//前置处理
		use:[
			{loader:'eslint-loader'}
		]
	})
	//添加热更新插件,表示开启devServer中的HMR
	//config.plugins.push(new webpack.HotModuleReplacementPlugin())
}


module.exports= config