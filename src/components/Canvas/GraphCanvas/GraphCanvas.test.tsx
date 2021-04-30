import React from 'react'
import {render,screen} from '@testing-library/react'
import {Provider,useSelector} from 'react-redux'
import produce from 'immer'

import BaseCanvas,{FIELDS as canvasFields} from '../../../adapters/Canvas'
import store,{InitialState} from '../../../redux/store'
import Canvas from '../../../components/Canvas/GraphCanvas'

jest.mock('../../../adapters/Canvas')

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

const clearFields = (obj:{[x:string]:jest.Mock<any,any>})=>{
	Object.values(obj).forEach(fn=>fn.mockClear())
}

const updateUseSelector = (update:InitialState)=>{
	(useSelector as any).mockImplementation((callback: any) => {
		return callback(update);
	});
}

beforeEach(()=>{
	const fields = {...canvasFields}
	delete fields.drawer
	clearFields(fields);
	clearFields(canvasFields.drawer);
	(BaseCanvas as any).mockClear();
})

describe('Canvas should render properly',()=>{

	test('Render main canvas',()=>{
		render(component)
		expect(screen.getByRole('main-app')).toBeDefined()
	})

	test('Initialize base canvas',()=>{
		render(component)
		expect(BaseCanvas).toHaveBeenCalledTimes(1)
	})

})

describe('Canvas should add edges and Nodes',()=>{

	test('Nodes when allowed',()=>{
		render(component)
		expect(canvasFields.on).toHaveBeenCalledTimes(1)
	})

	test('Remove drawing lines when nodes allowed',()=>{
		render(component)
		expect(canvasFields.drawer.removeDrawingEvents).toHaveBeenCalledTimes(1)
	})

	test('Not add nodes when not allowed',()=>{
		const newState = produce(mockAppState, draft => {
			draft.algorithm.options.addNode = false;
		});

		updateUseSelector(newState)
		render(component)

		expect(canvasFields.off).toHaveBeenCalledTimes(1)
		expect(canvasFields.on).toHaveBeenCalledTimes(0)
	})

	test('Add edges',()=>{
		const newState = produce(mockAppState,draft=>{
			draft.algorithm.options.addNode = false
			draft.algorithm.options.addEdge = true
		})
		updateUseSelector(newState)

		render(component);
		expect(canvasFields.drawer.setDrawingEvents).toHaveBeenCalledTimes(1)
	})

	test('Set directed',()=>{
		render(component);
		expect(canvasFields.renderAll).toHaveBeenCalledTimes(1)
		expect(canvasFields.clear).toHaveBeenCalledTimes(1)
		expect(canvasFields.drawer.useArrow).toHaveBeenCalledTimes(1)
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