import React from 'react'
import {render,screen} from '@testing-library/react'
import {Provider,useSelector} from 'react-redux'

import BaseCanvas,{FIELDS as canvasFields} from '@adapters/Canvas/BaseCanvas'
import LineDrawer,{FIELDS as lineFields} from '@adapters/shapes/Line'
import store,{InitialState} from '@redux/store'
import Canvas from './index'

jest.mock('@adapters/Canvas/BaseCanvas')
jest.mock('@adapters/shapes/Line')

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

const clearFields = (obj:jest.Mock)=>{
	Object.values(obj).forEach(fn=>fn.mockClear())
}

beforeEach(()=>{
	clearFields(canvasFields);
	clearFields(lineFields);
	(BaseCanvas as any).mockClear();
	(LineDrawer as any).mockClear();
})

describe('Canvas should render properly',()=>{

	test('Render main canvas',()=>{
		render(component)
		expect(screen.getByRole('main-app')).toBeDefined()
	})

	test('Initialize line drawer',()=>{
		render(component)
		expect(LineDrawer).toHaveBeenCalledTimes(1)
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
		expect(lineFields.removeDrawingEvents).toHaveBeenCalledTimes(1)
	})

	test('Not add nodes when not allowed',()=>{

		const localMockState:InitialState = {
			...mockAppState,
			algorithm:{
				...mockAppState.algorithm,
				options:{
					...mockAppState.algorithm.options,
					addNode:false,
				}
			}
		};

		(useSelector as any).mockImplementation((callback: any) => {
			return callback(localMockState);
		});
		render(component)

		expect(canvasFields.off).toHaveBeenCalledTimes(1)
		expect(canvasFields.on).toHaveBeenCalledTimes(0)
	})

	test('Add edges',()=>{
		const localMockState: InitialState = {
			...mockAppState,
			algorithm: {
				...mockAppState.algorithm,
				options: {
					...mockAppState.algorithm.options,
					addNode: false,
					addEdge:true,
				}
			}
		};

		(useSelector as any).mockImplementation((callback: any) => {
			return callback(localMockState);
		});

		render(component);
		expect(lineFields.setDrawingEvents).toHaveBeenCalledTimes(1)
	})

	test('Set directed',()=>{
		render(component);
		expect(canvasFields.renderAll).toHaveBeenCalledTimes(1)
		expect(canvasFields.clear).toHaveBeenCalledTimes(1)
		expect(lineFields.useArrow).toHaveBeenCalledTimes(1)
	})

})