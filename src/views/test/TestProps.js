import React from 'react'
import Child from './Child'

class TestProps extends React.Component{
	//构造器函数,此函数在类实例化时被调用
	constructor(props){
		super(props)		//调用父类的构造器
		 // 为了在回调中使用 `this`，这个绑定是必不可少的
		//this.clickHandle1 = this.clickHandle1.bind(this)
	}
	
	//通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递,事件对象是最后一个参数
	clickHandle1(arg1,arg2,e){
		//e.preventDefault();//不能通过返回 false 的方式阻止默认行为
		//e.stopPropagation()
		console.log('over')
		console.log(this)
		console.log(arg1,arg2)
		console.log('e',e)
	}
	//箭头函数的方式，事件对象必须显式的进行传递,参数传递顺序无所谓
	clickHandle2(arg1,e){
		console.log('e',e)
		console.log(arg1)
	}
	info(msg){
		console.log('父组件',msg)
	}
	render(){
		return (
			<div>
				<h1>测试props</h1>
				<button onClick={this.clickHandle1.bind(this,'111','222')}>点击</button>
				<button onClick={(e)=>this.clickHandle2('one',e)}>点击</button>
				{/* 父组件向子组件传值*/}
				<Child msg='hello mychild' info={this.info.bind(this)} />
			</div>
		)
	}
	
	
}

export default TestProps