import {
	ALLOW_ADD_EDGE,
	ALLOW_ADD_NODE,
	ADD_NODE,
	ADD_EDGE,
	SET_DIRECTED,
} from '../../action_types'
import { AppDispatch } from '../../store'
import Manager from '../../../core/useCases/Manager'

export const onAllowAddEdge = () => {
	Manager.dataStructure.canAddEdge = true
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: ALLOW_ADD_EDGE,
			payload: {
				addEdge: Manager.dataStructure.canAddEdge,
				addNode: Manager.dataStructure.canAddNode
			},
		})
	};
};

export const onAllowAddNode = () => {
	Manager.dataStructure.canAddNode = true
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: ALLOW_ADD_NODE,
			payload: {
				addEdge: Manager.dataStructure.canAddEdge,
				addNode: Manager.dataStructure.canAddNode
			}
		})
	}
}

export const onAddNode = (nodeData: GraphType) => {
	Manager.dataStructure.addNode(nodeData)
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: ADD_NODE,
			payload: Manager.dataStructure.getGraphData(),
		})
	}
}

export const onAddEdge = (connection: { src: number | GraphType, dest: number | GraphType }) => {
	Manager.dataStructure.addEdge(connection.src, connection.dest)
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: ADD_EDGE,
			payload: Manager.dataStructure.getGraphData()
		})
	}
}

export const onSetDirected = (isDirected: boolean) => {
	Manager.dataStructure.setDirected(isDirected)
	return (dispatch: AppDispatch) => {
		return dispatch({
			type: SET_DIRECTED,
			payload: isDirected
		})
	}
}