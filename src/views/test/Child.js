import React from 'react'

class Child extends React.Component{
	click(){
		//自定义事件,子组件向父组件传值
		this.props.info('hello dad')
	}
	render(){
		console.log('child-props',this.props)
		return (
			<div>
				<h3>child component</h3>
				<h3 onClick={this.click.bind(this)}>{this.props.msg}</h3>
			</div>
		)
	}
}

export default Child