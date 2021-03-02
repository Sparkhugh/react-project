import React from 'react'
import Child1 from './component/Child1'
import Child2 from './component/Child2'
import './style.scss'

class TestState extends React.Component{
	constructor(props){
		super(props)
		this.state={
			username:'hugh'
		}
	}
	
	render(){
		return (
			<div className="stateBox">
				{/*<h1>test state improvement状态提升</h1>*/}
				<div>
					<Child1 username={this.state.username} />
				</div>
				<div>
					<Child2 username={this.state.username} />
				</div>
			</div>
		)
	}
}

export default TestState