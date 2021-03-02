import React from 'react'
import moment from 'moment'

class TestLifecycle extends React.Component{
	constructor(props){
		super(props)
		this.state={
			msg:'hello state',
			date: new Date(),
			time:''
		}
	}
	
	//生命周期
	//I.实例化阶段(3个钩子函数)
	UNSAFE_componentWillMount(){		//该生命周期方法即将过时
		console.log('--------life will mount')
	}
	// render() 执行
	componentDidMount(){
		console.log('--------life did mount')
		//调接口api 
		//第三方插件实例化
		//开启定时器
		this.timerID=setInterval(
			()=>this.tick(),
			1000
		)
		this.timer=setInterval(()=>{
			let t=Date.now()
			this.setState({
				time:moment(t).format('HH:mm:ss')
			})
		},1000)
	}
	
	//II.存在期阶段(4个钩子+render)
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
	//render() 执行
	
	//更新完成
	componentDidUpdate(){
		console.log('--------life did update')
	}
	
	// III.销毁阶段(1个钩子)
	componentWillUnmount(){
		console.log('--------life will unmount')
		//清除定时器
		//清除一些比较占内存的长连接,缓存数据
		//手动销毁定时器
		clearInterval(this.timerID)
		clearInterval(this.timer)
	}
	
	tick(){
		this.setState({
			date:new Date()
		})
	}
	
	// 用于改变state中msg
	changeMsg(){
		// this.setState({}) 改变组件自有的状态
		// 当状态发生变化时，DOM同步发生变化
		this.setState({msg:'change state'})
	}
	render(){
		console.log('-------render')
		return(
			<div>
				<h1>test State & 生命周期</h1>
				<h2>{this.state.msg}</h2>
				<button onClick={this.changeMsg.bind(this)}>改变msg</button>
				<h2>It is {this.state.date.toLocaleTimeString()}</h2>
				<h3>It is {this.state.time} now</h3>
			</div>
		)
	}
	
}

export default TestLifecycle