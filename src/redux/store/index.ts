import { createStore, Store } from 'redux'
import mainReducer from '../reducer'

interface ICommonState {
	speed: number;
	running: boolean;
}

interface IAlgorithmState {
	name: 'dfs';
	dataStructure: string;
	options: {
		readonly addNode: boolean;
		readonly addEdge: boolean;
		readonly directed: boolean;
	};
	output: any;
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
		name: 'dfs',
		dataStructure: 'graph',
		output: undefined,
		options: {
			addNode: true,
			addEdge: false,
			directed: false
		}
	},
}

const store: Store = createStore(mainReducer, initialState)

export type RootState = ReturnType < typeof store.getState > ;
export type AppDispatch = typeof store.dispatch;
export type InitialState = Readonly < IInitialState > ;
export default store