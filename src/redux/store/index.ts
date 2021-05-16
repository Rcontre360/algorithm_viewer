import { createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import mainReducer from '../reducer'

interface CommonState {
	speed: number;
	running: boolean;
	algorithm: {
		name: 'bfs' | 'dfs';
		dataStructure: 'graph';
	}
}

interface AlgorithmState {
	options: {
		readonly addNode: boolean;
		readonly addEdge: boolean;
		readonly directed: boolean;
		readonly data: any;
	};
	output: any;
}

interface IInitialState {
	common: Readonly < CommonState > ;
	graph: Readonly < AlgorithmState > ;
}

export const initialState: IInitialState = {
	common: {
		speed: 500,
		running: false,
		algorithm: {
			name: 'bfs',
			dataStructure: 'graph',
		}
	},
	graph: {
		output: undefined,
		options: {
			addNode: false,
			addEdge: false,
			directed: false,
			data: undefined
		}
	},
}

const store: Store = createStore(mainReducer, initialState, composeWithDevTools())

export type RootState = ReturnType < typeof store.getState > ;
export type AppDispatch = typeof store.dispatch;
export type InitialState = Readonly < IInitialState > ;
export default store