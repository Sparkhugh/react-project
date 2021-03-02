# Webpack(静态模块打包器)

* webpack 是一个现代`JavaScript`应用程序的静态模块打包器(module bundler);
* 依赖图(dependency graph):任何时候，一个文件依赖于另一个文件，webpack 就把此视为文件之间有依赖关系;
* 安装
```
npm install --save-dev webpack //本地安装
npm install --global webpack //全局安装
```
* 安装webpack-cli (用于在命令行中运行webpack)
```
npm init		//创建一个package.json
npm install webpack-cli --save-dev
```
* 注:若全局安装webpack和webpack-cli后not found,再进行局部安装;
* 运行`webpack index.js`或	`webpack`,生成`/dist`目录,`/dist/main.js`中是自执行函数;
* 执行`npx webpack`(执行本地安装)，会将我们的脚本作为入口起点，然后输出为`main.js`;

###### npm install -D/-S
* `npm install --save` 安装一个要打包到生产环境的安装包;
* `npm install --save-dev` 安装一个用于开发环境的安装包（例如，linter, 测试库等）;

#### webpack.config.js
* 必须放在根目录
* 使用commonjs语法,运行在nodejs环境
```
var path = require('path');
module.exports={
	//自定义入口文件
	entry:'./main.js',
	output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
运行命令 npx webpack --config webpack.config.js
```
* 当在 windows 中通过调用路径去调用`webpack`时，必须使用反斜线:
```举例
node_modules\.bin\webpack --config webpack.config.js
```
* package.json:
```
"scripts": {
+     "build": "webpack",	//新增此命令,项目打包上线
			"start":"webpack-dev-server"	//配置本地服务器,热更新
    }
```
* 可以使用`npm run build`命令，来替代之前使用的`npx`命令
--------------------------------------------------

###### 核心概念:
* entry(入口):默认值为`./src`;
* 指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始,进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的,每个依赖项随即被处理，最后输出到称之为`bundles`的文件中;

* output(输出):
* webpack 在哪里输出它所创建的`bundles`，以及如何命名这些文件，默认值为`./dist`;

* loader(加载、编译文件):
* loader 让 webpack 能够去处理那些非`JavaScript`文件（webpack 自身只理解 JavaScript）,将所有类型的文件转换为 webpack 能够处理的有效模块;
* loader 能够`import`导入任何类型的模块（例如 .css 文件），这是 webpack 特有的功能，其他打包程序或任务执行器的可能并不支持;
* webpack 的配置中 loader 有两个目标：
```
test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件;
use 属性，表示进行转换时，应该使用哪个 loader;
在 webpack 配置中定义`loader`时，要定义在`module.rules`中，而不是 rules;
```

* plugins(插件):
* 用于执行范围更广的任务,从打包优化和压缩，一直到重新定义环境中的变量;
* 使用一个插件，你只需要`require()`它，然后把它添加到`plugins`数组中;
* 也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用`new`操作符来创建它的一个实例;

* mode(模式):
```
module.exports={
	mode:'development/production'
}
```
* 注:`development`(开发环境),`npm run build`运行时的模式;
* `production`(生产环境),`webpack dev-server`配置本地服务器时运行的模式;

* module(模块)
* Rule.enforce:"pre" | "post";
* 所有 loader 通过 前置, 行内, 普通, 后置 排序，并按此顺序使用;

* resolve(解析)
* 创建`import`或`require`的别名:resolve.alias
```//	配置绝对路径
module.exports = {
	//...
	resolve:{
		alias: {
	  '@': path.resolve(__dirname, './src')
		}
	}
}
```
--------------------------------------------------

#### plugins(插件)

* `HtmlWebpackPlugin`插件:简单创建 HTML 文件，用于服务器访问;
```// 安装
npm install --save-dev html-webpack-plugin
```
基本用法
```// webpack.config.js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports={
	 plugins: [new HtmlWebpackPlugin()] //实例化
}
```

#### loader
* webpack 可以使用 loader 来预处理文件,这允许你打包除 JavaScript 之外的任何静态资源;
* loader 通过在`require()`语句中使用 loadername! 前缀来激活，或者通过 webpack 配置中的正则表达式来自动应用;

* css-loader安装:
```
npm install --save-dev css-loader
```
* style-loader 安装:
```
npm install style-loader --save-dev
```
* 建议将`style-loader`与`css-loader`结合使用;
* 基本用法:
```// webpack.config.js
module.exports={
	 module:{
		 rules:[
			 {
				test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
			 }
		 ]
	 }
}
```
* sass-loader 安装:
```
npm install sass-loader node-sass webpack --save-dev
```
* 用法:
```// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{											//必须按此顺序书写
          loader: "style-loader" 	// 将 JS 字符串生成为 style 节点
      }, {
          loader: "css-loader" 		//将 CSS 转化成 CommonJS 模块
      }, {
          loader: "sass-loader", 	// 将 Sass 编译成 CSS
					options: {
						includePaths: ["absolute/path/a", "absolute/path/b"]	// 指定 options 参数，向 node-sass 传递选项参数
        }
      }]
    }]
  }
};
```
* file-loader 
* 将文件发送到输出文件夹，并返回（相对）URL	 可用于引入图片
```
npm install --save-dev file-loader
import img from './file.png'

// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  }
}
```
--------------------------------------------------

#### dev-server(只在开发环境中需要)
安装
```
npm install webpack-dev-server --save-dev
```
```// package.json
"scripts": {
  "start": "webpack-dev-server"
}
npm run start
```
```// webpack.config.js
devServer: {
  contentBase: path.join(__dirname, "dist"), //告诉服务器从哪里提供内容,只有在你想要提供静态文件时才需要,默认情况下，将使用当前工作目录作为提供内容的目录,可以修改为其他目录,也可以从多个目录提供内容;
	//contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")]
  compress: true,
  port: 9000,		//指定要监听请求的端口号
	hot:true		//热更新
}
```
* 热更新:webpack-dev-server启动时同时启动了web-socket通信,长连接,代码发生变化时通过长连接发送给客户端,自动更新;
* 热更新失败:浏览器刷新,或重启webSocket;

####### 解决热更新问题 	热模块替换（HMR）开发环境
* 不要在生产环境(production)下启用 HMR;
```//	webpack.config.js
+ new webpack.HotModuleReplacementPlugin({
  // Options...
})

//		main.js
+ if (module.hot) {
  module.hot.accept('./App.js', function() {
    console.log('Accepting the updated printMe module!');
    var NewApp=require('./App.js').default;
    ReactDOM.render(<NewApp />,document.getElementById('app'))
  })
}

```
--------------------------------------------------

#### 区分development/production
* 利用nodejs全局变量`process.env`
* 借助`cross-env`包
```
npm install --save-dev cross-env		//安装
//package.json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js",
		"serve": "cross-env NODE_ENV=development webpack-dev-server --open"
  }
}
//	执行`npm run build`即production环境
//	执行`npm run serve`即development环境
```
--------------------------------------------------
#### babel
* 是一个 JavaScript 编译器;
* Babel 是一个工具链，主要用于在旧的浏览器或环境中将 ECMAScript 2015+ 代码转换为向后兼容版本的 JavaScript 代码;

* Babel 的核心功能在 @babel/core 模块
```
npm install --save-dev @babel/core
```
* @babel/cli 是一个允许你从终端使用 babel 的工具
```
npm install --save-dev @babel/core @babel/cli
```
* Plugins & Presets 代码转换以插件的形式出现，插件是小型 JavaScript 程序，它指示 Babel 如何对代码进行转换;
```
npm install --save-dev @babel/plugin-transform-arrow-functions
npm install --save-dev @babel/preset-env
```
* Polyfill 实现目标环境中缺少的功能 (通过 @babel/polyfill)
```
npm install --save @babel/polyfill
```

配置`babel loader`:
```//安装
npm install --save-dev @babel/core @babel/preset-env
npm install --save-dev @babel/preset-react		//@babel/preset-react包
npm install babel-loader -D
```
```// .babelrc文件
{
  "presets": ["@babel/preset-react"]
}
```
```// webpack.config.js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,		//要排除 node_modules，参考文档中的 loaders 配置的`exclude`选项
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```
--------------------------------------------------
#### eslint(前端代码规范、开发环境中需要)
安装
```
npm install eslint-loader --save-dev
npm install eslint --save-dev
```
用法:
```// env='development'
module.exports = {
  // ...
  module: {
    rules: [
      {
				enforce: 'pre',		//前置处理
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  // ...
};
```
配置文件:
```//	项目根目录		.eslintrc.json
{
  "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true
      }
  },
  "rules": {
      "semi": 2			//要求或禁止使用分号代替 ASI
  }
}
```
--------------------------------------------------

# 1. react
* React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库;

* 使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”;
* React 中，所有的 DOM 特性和属性（包括事件处理）都应该是小驼峰命名的方式;
* 组件名称必须以大写字母开头;
* 注释 {/* xxxxxxx */};

* 添加一个空dom容器到html
```
<div id="app"></div>
```
安装
```
npm install react -S
npm install react-dom -S		//React DOM 会负责更新 DOM 来与 React 元素保持一致
```
```// App.js
import React from 'react'

class App extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
```// main.js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js' //将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 ReactDOM.render()
ReactDOM.render(<App />, document.getElementById('App'));
```
* CDN引入:
```// 仅用于开发环境
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```
```// 用于生产环境
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

#### 2. JSX
* JSX是一个js语法扩展,Babel 会把 JSX 转译成一个名为`React.createElement()`函数调用;
* JSX是一个变量,一个对象=>最终被React.createElement()转化成浏览器能够运行的React元素或者组件;
* 可以在JSX对象中使用变量、表达式;
* JSX中可以使用函数(返回值要求是jsx对象);
* JSX中可以嵌套react元素(组件);
```//JSX中嵌入表达式
const name='world'
const element=<h1>hello,{name}</h1>

ReactDOM.render(element,document.getElementById('app'))
```

#### 3. 组件 & props
#### 4. 事件处理
* 通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递,事件对象是最后一个参数;
* 箭头函数的方式，事件对象必须显式的进行传递,参数传递顺序无所谓;
* e.preventDefault();//不能通过返回 false 的方式阻止默认行为;
* e.stopPropagation();

#### 5. state & 生命周期函数
* 构造函数是唯一可以给 this.state 赋值的地方;
* 改变state应该用`setState()`;
* 生命周期:
1. 实例化阶段(3个钩子函数)
```
UNSAFE_componentWillMount(){		//该生命周期方法即将过时
		console.log('--------life will mount')
}
render() //执行	
componentDidMount(){
	console.log('--------life did mount')
	//调接口api 
	//第三方插件实例化
	//开启定时器
	this.timerID=setInterval(
		()=>this.tick(),
		1000
	)
}
```
2. 存在期阶段(4个钩子+render)
```
//当父组件的 props 或 state 发生变化时会触发更新
UNSAFE_componentWillReceiveProps(){		//该生命周期方法即将过时
		console.log('--------life will Receive Props')
}

//当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用
//判断 React 组件的输出是否受当前 state 或 props 更改的影响
//控制diff运算的结果,是否同意更新渲染到真实dom结构上
shouldComponentUpdate(){		//一个开关
	console.log('--------life should update')
	return true		//返回值默认为 true
}

//更新前
UNSAFE_componentWillUpdate(){		//该生命周期方法即将过时
	console.log('--------life will update')
}

render() //执行

//更新完成
componentDidUpdate(){
	console.log('--------life did update')
}
```
3. 销毁阶段(1个钩子)
```
componentWillUnmount(){
	console.log('--------life will unmount')
	//清除定时器
	//清除一些比较占内存的长连接,缓存数据
	//手动销毁定时器
	clearInterval(this.timerID)
}
```

#### 6. 条件渲染 & 列表
* 列表渲染时,一定要加key(每个key是唯一的),作用是用于diff运算,有助于性能优化


#### 7. 表单
* 非受控表单:其value不受组件的state控制;
* react开发中,尽量避免使用非受控表单
* react表单数据都是单向绑定,即其值由state赋予,但表单发生变化时不能更新到state中去
* 工作中一定要使用受控表单,除了文件上传
```
<input type="text" id="inp" />
```
* 文件上传表单 是仅有的一种可被接受的非受控表单
```
<input type="file" />
```
* 受控表单:其value由组件的state来控制
```
<input type="text" value={this.state.username} onChange={this.inputChange.bind(this)} />
```

#### 8. 状态提升
* 将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state;
* 如果父组件拥有了共享的 state，它将成为两个子组件的“数据源”。它能够使得两个子组件的数值彼此保持一致;
* 优点:排查和隔离 bug 所需的工作量将会变少;

#### 9. 组合 vs 继承
* 推荐使用组合而非继承来实现组件间的代码重用;


#### 10. react-router
[react-router](https://reacttraining.com/react-router/web/api/Route/render-func)
安装
```
npm install react-router-dom -S
```
用法:
```
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
	Redirect
} from "react-router-dom";
export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
		<Redirect from="/accounts" to="/users" />
		<HashRouter>
			<App />
		</HashRouter>
  );
}
```
安装:
```
npm install react-router -S
```
```// Router
import { Router } from "react-router";
```
```// withRouter 高阶函数:函数中返回新的函数;
import { withRouter } from "react-router";
```
```// matchPath
matchPath("/users/2", {
  path: "/users/:id",
  exact: true,
  strict: true
});
```
API介绍:
* BrowserRouter:类似vue中的history模式;
* HashRouter:hash模式;
* Link:a链接;
* NavLink:有高亮样式的a链接;
* Redirect:重定向;
* Route:类似vue中的`router-view`视图容器;
* history:编程式路由跳转;
* match:路由取参;
* withRouter:高阶函数;
* Switch是Route的直接父组件 Route只能被Switch包裹;
* react的默认情况下,只有被Route组件承载的React组件的this.props中才有history/match等路由API；
* 若想让非Route组件承载的react组件的this.props中有history/match等路由API，则需安装`react-router`,使用其高阶函数`withRouter`对当前组件进行修饰;

--------------------------------------------------

#### ant-design( React UI 组件库)
安装
```
npm install antd --save
```
引入样式
```//全局引入 main.js
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
```
引入Icon
```
import { Icon } from 'antd';
```