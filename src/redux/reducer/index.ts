import { RootState } from '../store'
import { IReduxAction } from '../interfaces'

const mainReducer: RootState = (state: RootState, action: IReduxAction) => {
	switch (action.type) {
		default: return state;
	}
}

export default mainReducer