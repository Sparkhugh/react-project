import React from 'react'
//用sass解决react样式全局性问题
//类名必须用className
import './style.scss'
import Logo from '../logo/Logo'
import { NavLink,Route,Switch,Redirect } from 'react-router-dom'
import routes from '@/router.js'
import { Icon } from 'antd'

export default class Layout extends React.Component{
	createRouter(type){
		let res1=[]
		let res2=[]
		routes.map(ele=>{
			if(type==1){
				res1.push(
					<div key={ele.id}>
						<NavLink exact to={ele.path} activeClassName="on">
							<Icon type={ele.icon} />
							{ele.text}
						</NavLink>
					</div>
				)
			}else{
				res2.push(
					<Route key={ele.id} exact path={ele.path} component={ele.component}></Route>
				)
			}
		})
		return type == 1? res1:res2
	}
	render(){
		return (
			<div className='layout'>
				<div className="aside">
					<Logo />
					<div className="navs">
						{this.createRouter(1)}
					</div>
				</div>
				<div className="header">
					<h1>hello 2020</h1>
				</div>
				<div className="main">
					<div>
						{/*Switch是Route的直接父组件 Route只能被Switch包裹*/}
						<Switch>
							{this.createRouter(2)}
						</Switch>
						
						<Redirect from='/*' to='/jsx' />
					</div>
				</div>
				<div className="footer"></div>
			</div>
		)
	}
}