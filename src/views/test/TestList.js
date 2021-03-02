import React from 'react'
import './style.scss'

class TestList extends React.Component{
	constructor(props){
		super(props)
		this.state={
			show:false,
			idx:1,
			list:[
				{id:1,name:'text one',time:'2020'},
				{id:2,name:'text two',time:'2021'},
				{id:3,name:'text three',time:'2022'}
			],
			style:{
				'fontSize':'50px',
				'textAlign':'center'
			},
			color:'sea',
			count:50
		}
	}
	//列表渲染时,一定要加key(每个key是唯一的),作用是用于diff运算,有助于性能优化
	renderList(arr){
		let res=[]
		arr.map(ele=>{
			ele.time=ele.time+'!!!!'
			res.push(
				<div key={ele.id}>
					<span>{ele.id}</span>
					<span>{ele.name}</span>
					<span>{ele.time}</span>
				</div>
			)
		})
		return res
	}
	changeClass(){
		if(this.state.color==='sea'){
			this.setState({color:'red'})
		}else{
			this.setState({color:'sea'})
		}
	}
	changeStyle(){		//只读 不能修改
		//深拷贝
		var style=Object.assign({},this.state.style)
		var count=this.state.count
		count++
		style.fontSize=count + 'px'
		this.setState({count:count,style:style})
		//浅复制	(不建议用)
		//var style={...this.state.style}
		//style.fontSize='200px'
		//this.setState({style:style})
	}
	
	
	render(){
		let {show,idx,list,style,color,count}=this.state
		return (
			<div>
				<h1>test conditional render 条件渲染</h1>
				{show && <h3>showshowshow</h3>}
				{show ? <h3>showshow</h3> : <h3>hidehide</h3>}
				
				{idx===1 && <p>11111</p>}
				{idx===2 && <p>22222</p>}
				{idx===3 && <p>33333</p>}
				{idx===4 && <p>44444</p>}
				
				{
					list.map(ele=>{
						return (
							<div key={ele.id}>
								<span>{ele.id}</span>
								<span>{ele.name}</span>
								<span>{ele.time}</span>
							</div>
						)
					})
				}
				<hr />
				{
					list.map(ele=>(
						<div key={ele.id}>
							<span>{ele.id}</span>
							<span>{ele.name}</span>
							<span>{ele.time}</span>
						</div>
					))
				}
				<hr />
				{
					this.renderList(list)
				}
				<hr />
				<h1 className='sea' style={{'fontSize':'40px','fontStyle':'Italic'}}>静态样式</h1>
				
				<h1 className={color} style={style}>动态样式</h1>
				<h1 className={color} style={{'fontStyle':'Italic','fontSize':count+'px'}}>动态样式---计数器</h1>
				
				<button onClick={this.changeClass.bind(this)}>改变动态class</button>
				<button onClick={this.changeStyle.bind(this)}>改变动态style</button>
				
				
			</div>
		)
	}
	
}

export default TestList