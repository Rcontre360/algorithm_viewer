import * as actions from "@shared/redux/action_types";
import { AppDispatch } from "@shared/redux/store";
import Manager from "@core/useCases/Manager";

export const onAllowAddEdge = () => {
  Manager.dataStructure.canAddEdge = true;
  return (dispatch: AppDispatch) => {
    return dispatch({
      type: actions.ALLOW_ADD_EDGE,
      payload: {
        addEdge: Manager.dataStructure.canAddEdge,
        addNode: Manager.dataStructure.canAddNode,
      },
    });
  };
};

export const onAllowAddNode = () => {
  Manager.dataStructure.canAddNode = true;
  return (dispatch: AppDispatch) => {
    return dispatch({
      type: actions.ALLOW_ADD_NODE,
      payload: {
        addEdge: Manager.dataStructure.canAddEdge,
        addNode: Manager.dataStructure.canAddNode,
      },
    });
  };
};

export const onAddNode = (nodeData: GraphType) => {
  Manager.dataStructure.addNode(nodeData);
  return (dispatch: AppDispatch) => {
    return dispatch({
      type: actions.ADD_NODE,
      payload: Manager.dataStructure.getGraphData(),
    });
  };
};

export const onRemoveNode = (nodeIndex: number) => {
  Manager.dataStructure;
};

export const onAddEdge = (connection: {
  src: number | GraphType;
  dest: number | GraphType;
}) => {
  Manager.dataStructure.addEdge(connection.src, connection.dest);
  return (dispatch: AppDispatch) => {
    return dispatch({
      type: actions.ADD_EDGE,
      payload: Manager.dataStructure.getGraphData(),
    });
  };
};

export const onSetDirected = (isDirected: boolean) => {
  Manager.dataStructure.setDirected(isDirected);
  return (dispatch: AppDispatch) => {
    return dispatch({
      type: actions.SET_DIRECTED,
      payload: isDirected,
    });
  };
};

export const onSetStartNode = (startNode: number) => {
  Manager.setOptions({ startNode });
  return (dispatch: AppDispatch) => {
    return dispatch({
      type: actions.SET_START_NODE,
      payload: startNode,
    });
  };
};

export const onSetEdgeWeight = (edge: number, weight: number) => {
  Manager.dataStructure.setEdgeWeight(edge, weight);
  return (dispatch: AppDispatch) => {
    return dispatch({
      type: actions.SET_EDGE_WEIGTH,
      payload: Manager.dataStructure.getGraphData(),
    });
  };
};

export const onSetWeighted = (isWeighted: boolean) => {
  return (dispatch: AppDispatch) => {
    return dispatch({
      type: actions.SET_WEIGHTED,
      payload: isWeighted,
    });
  };
};
