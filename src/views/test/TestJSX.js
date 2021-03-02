import React,{Component} from 'react'
import HelloJSX from './HelloJSX'

//JSX是一个变量,一个对象=>最终被React.createElement()转化成浏览器能够运行的React元素或者组件
//可以在JSX对象中使用变量、表达式
//JSX中可以使用函数(返回值要求是jsx对象)
//JSX中可以嵌套react元素(组件)

const name='Hugh'
const element = <h1>hello {name}</h1>

class TestJSX extends Component{
	componentDidMount(){
		console.log('this.props',this.props)
	}
	
	click(){
		console.log('父组件')
	}
	
	skip(){
		let num =Math.random()
		//路由跳转
		this.props.history.push('/form/'+num)
	}
	
	toggle(flag){
		let com=null
		if(flag){
			com=<div>111</div>
		}else{
			com=<div>000</div>
		}
		return com
	}
	
	render(){
		const bol=true
		return (
			<div>
				{element}
				{
					<h1>{this.toggle(bol)}</h1>
				}
				<HelloJSX title='hhh' click={this.click} />
				<button onClick={this.skip.bind(this)}>跳转至'表单'</button>
			</div>
		)
	}
}

export default TestJSX