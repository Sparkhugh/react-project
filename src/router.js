import TestJSX from '@/views/test/TestJSX'
import TestProps from '@/views/test/TestProps'
import TestLifecycle from '@/views/test/TestLifecycle'
import TestList from '@/views/test/TestList'
import TestForm from '@/views/test/TestForm'
import TestState from '@/views/test/TestState'
import TestCombine from '@/views/test/TestCombine'


const routes =[
	{
		id:1,
		path:"/jsx",
		component:TestJSX,
		text:'jsx',
		icon:'home'
	},
	{
		id:2,
		path:"/props",
		component:TestProps,
		text:'props',
		icon:'calendar'
	},
	{
		id:3,
		path:"/lifeCycle",
		component:TestLifecycle,
		text:'lifeCycle',
		icon:'credit-card'
	},
	{
		id:4,
		path:"/list",
		component:TestList,
		text:'列表',
		icon:'book'
	},
	{
		id:5,
		path:"/form/:id",		//路由动态传参
		component:TestForm,
		text:'表单',
		icon:'database'
	},
	{
		id:6,
		path:"/state",
		component:TestState,
		text:'状态提升',
		icon:'profile'
	},
	{
		id:7,
		path:"/combine",
		component:TestCombine,
		text:'组合复用',
		icon:'appstore'
	}
]

export default routes