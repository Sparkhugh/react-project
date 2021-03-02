import React from 'react'
import Child3 from '@/views/test/component/Child3'


function Combine(props){
	return (
		<div>
			<div>公共头</div>
			<h1>test combination 组合</h1>
			{/*渲染子组件和JSX对象*/}
			{props.children}
			<div>公共尾部</div>
		</div>
	)
}

//无state(状态)组件 纯组合
class TestCombine extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div>
				{/*组合 实现组件复用*/}
				<Combine>
					<Child3 />
					<h1>child-4</h1>
				</Combine>
				<hr />
				<Combine>
					<Child3 />
					<h1>child-5</h1>
				</Combine>
			</div>
		)
	}
}

export default TestCombine