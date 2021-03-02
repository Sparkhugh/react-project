import React from 'react'

class Child1 extends React.Component{
	
	render(){
		return (
			<div>
				<h1>第一个子组件</h1>
				<h2>{this.props.username}</h2>
			</div>
		)
	}
}

export default Child1