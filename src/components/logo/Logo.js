import React from 'react'
import './style.scss'		//相对路径
import logoPng from '@/assets/img/logo.png'		//绝对路径
//console.log('logoPng',logoPng)

//react的默认情况下,只有被Route组件承载的React组件的this.props中才有history/match等路由API；
//若想让非Route组件承载的react组件的this.props中有history/match等路由API，则需安装`react-router`,使用其高阶函数`withRouter`对当前组件进行修饰;
import {withRouter} from 'react-router'

class Logo extends React.Component{
	componentDidMount(){
		console.log('this.props-------',this.props)
	}
	skip(){
		this.props.history.replace('/jsx')
	}
	
	render(){
		return (
			<div className="asd-logo">
				<img onClick={this.skip.bind(this)} src={logoPng} alt="logo" />
			</div>
		)
	}
}

//export default Logo
export default withRouter(Logo)