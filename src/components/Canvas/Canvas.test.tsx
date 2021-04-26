import React from 'react'
import {render,screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import store from '@redux/store'
import Canvas from './index'

beforeEach(()=>{
	render(
	<Provider store={store}>
		<Canvas/>
	</Provider>
	)
})

describe('Canvas should render properly',()=>{

	test('Render main canvas',()=>{
		expect(screen.getByRole('main-app')).toBeDefined()
	})

})