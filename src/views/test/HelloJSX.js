import React from 'react'



export default class HelloJSX extends React.Component{
	click(){
		console.log('子组件')
		this.props.click()
	}
	render(){
		let  {title}=this.props
		return (
			<div>
				<h2 onClick={this.click.bind(this)} title={title}>HelloJSX</h2>
			</div>
		)
	}
}