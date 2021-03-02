import React from 'react' 

class TestForm extends React.Component{
	constructor(props){
		super(props)
		this.state={
			username:'初始值'
		}
	}
	
	componentDidMount(){
		console.log('this.props',this.props)
	}
	
	uncontrollForm(){		//获取非受控表单的值
		console.log('非受控表单dom-getValue',document.getElementById('inp').value)
		console.log('非受控表单ref-getValue',this.refs.refname.value)
	}
	
	controllForm(){		//获取受控表单的值
		console.log('受控表单--username',this.state.username)
	}
	//react表单数据都是单向绑定,即其值由state赋予,但表单发生变化时不能更新到state中去
	//工作中一定要使用受控表单,除了文件上传
	inputChange(e){
		console.log(e.target.value)
		this.setState({username:e.target.value})
	}
	
	
	render(){
		return (
			<div>
				{/*路由传参*/}
				<h1>{this.props.match.params.id}</h1>
				
				<h1>test form</h1>
				{/*非受控表单:其value不受组件的state控制*/}
				{/*react开发中,尽量避免使用非受控表单*/}
				<input type="text" id="inp" ref="refname" />
				<button onClick={this.uncontrollForm.bind(this)}>获取非受控表单的值</button>
				<hr />
				{/*文件上传表单是仅有的一种可被接受的非受控表单*/}
				<input type="file" />
				<hr />
				
				{/*受控表单:其value由组件的state来控制*/}
				<input type="text" value={this.state.username} onChange={this.inputChange.bind(this)} />
				<button onClick={this.controllForm.bind(this)}>获取受控表单的值</button>
			</div>
		)
	}
}

export default TestForm