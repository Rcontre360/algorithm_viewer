import React from 'react'
import {render,screen,fireEvent} from '@testing-library/react'
import {Provider,useSelector} from 'react-redux'
import produce from 'immer'

import * as actions from '../../../redux/actions'
import store,{InitialState} from '../../../redux/store'
import Canvas from '../../../components/Canvas/GraphCanvas'

jest.mock('../../../redux/actions')

const mockAppState = store.getState() as InitialState
jest.mock("react-redux", () => ({
	...jest.requireActual("react-redux"),
	useSelector: jest.fn().mockImplementation(callback => {
		return callback(mockAppState);
	})
}));

const component = (
	<Provider store={store}>
		<Canvas />
	</Provider>
)

const canvasId = 'canvas_container'

const updateUseSelector = (update:InitialState)=>{
	(useSelector as any).mockImplementation((callback: any) => {
		return callback(update);
	});
}

beforeEach(()=>{
	(actions.onAddNode as any).mockClear()
})

describe('Canvas should render properly',()=>{

	test('Render main canvas',()=>{
		render(component)
		expect(screen.getByTestId(canvasId)).toBeDefined()
	})

})

describe('Canvas should add edges and Nodes',()=>{

	test('Nodes when allowed',()=>{
		const newState = produce(mockAppState, draft => {
			draft.graph.options.addNode = true;
		});

		updateUseSelector(newState)
		render(component)
		fireEvent.click(screen.getByTestId(canvasId))
		expect(actions.onAddNode).toHaveBeenCalledTimes(1)
		expect(actions.onAddNode).toHaveBeenCalledWith(0)
	})

	test('Not add nodes when not allowed',()=>{
		const newState = produce(mockAppState, draft => {
			draft.graph.options.addNode = false;
		});

		updateUseSelector(newState)
		render(component)
		fireEvent.click(screen.getByTestId(canvasId))
		expect(actions.onAddNode).toHaveBeenCalledTimes(0)
	})

	test('Add edges',()=>{
		// const newState = produce(mockAppState,draft=>{
		// 	draft.algorithm.options.addNode = false
		// 	draft.algorithm.options.addEdge = true
		// })
		// updateUseSelector(newState)

		// render(component);
		// fireEvent.click(screen.getByTestId(canvasId))
		// fireEvent.click(screen.getByTestId(canvasId))
		// //fireEvent.click(screen.getByRole('node-source-handle'))
		// //simulate drag drop to connect nodes
	})

	test('Set directed',()=>{
		// const newState = produce(mockAppState, draft => {
		// 	draft.algorithm.options.directed = false
		// })
		// updateUseSelector(newState)
		// render(component);
	})

	// test('Running algorithm',()=>{
	// 	const newState = produce(mockAppState, draft => {
	// 		draft.common.running = true;
	// 		draft.algorithm.output = []
	// 	})
	// 	updateUseSelector(newState)
	// 	render(component)
			//HOW TO TESTS?
	// })

})