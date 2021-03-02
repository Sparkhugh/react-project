import React from 'react'
import {HashRouter} from 'react-router-dom'
import Layout from '@/components/layout/Layout'


//无状态组件
function App(){
	return (
		<HashRouter>
			<div>
				<Layout />
				
				
			</div>
		</HashRouter>
		
	)
}

export default App