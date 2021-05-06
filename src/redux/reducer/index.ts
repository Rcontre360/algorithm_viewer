import { combineReducers } from 'redux'
import graphReducer from './graph'
import commonReducer from './common'

const mainReducer = combineReducers({
	graph: graphReducer,
	common: commonReducer
})

export default mainReducer