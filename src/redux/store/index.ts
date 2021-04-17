import { createStore, Store } from 'redux'
import mainReducer from '../reducer'

interface ICommonState {
	speed: number;
	running: boolean;
}

interface IAlgorithmState {
	name: string;
	dataStructure: string;
	options: Readonly < object > ;
}

interface IInitialState {
	common: Readonly < ICommonState > ;
	algorithm: Readonly < IAlgorithmState > ;
}

const initialState: IInitialState = {
	common: {
		speed: 1,
		running: false,
	},
	algorithm: {
		name: 'DFS',
		dataStructure: 'graph',
		options: {
			addNode: true,
			addEdge: false,
		}
	},
}

const store: Store = createStore(mainReducer, ['Use Redux'])

export type RootState = ReturnType < typeof store.getState > ;
export type AppDispatch = typeof store.dispatch
export type InitialState = Readonly < IInitialState > ;
export default store