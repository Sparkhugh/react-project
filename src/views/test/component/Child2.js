import React from 'react'

class Child2 extends React.Component{
	
	render(){
		return (
			<div>
				<h1>第二个子组件</h1>
				<h2>{this.props.username}</h2>
			</div>
		)
	}
}

export default Child2