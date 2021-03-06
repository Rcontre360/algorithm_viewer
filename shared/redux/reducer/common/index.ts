import produce from "immer";
import * as actions from "@shared/redux/action_types";
import { initialState, RootState } from "@shared/redux/store";
import { IReduxAction } from "@shared/redux/interfaces";
import GraphCase from "@core/data_structures";

export const commonState = {
  speed: 500,
  running: false,
  algorithm: {
    name: "dfs",
    dataStructure: "graph",
  },
};

const commonReducer: RootState = (
  state = commonState,
  action: IReduxAction
) => {
  switch (action.type) {
    case actions.SET_ALGORITHM:
      return produce(state, (state) => {
        state.algorithm.name = action.payload;
      });
    case actions.SET_DATA_STRUCTURE:
      return state;
    case actions.START_ALGORITHM:
      return produce(state, (state) => {
        state.running = true;
      });
    case actions.STOP_ALGORITHM:
      return produce(state, (state) => {
        state.running = false;
      });
    case actions.SET_SPEED:
      return produce(state, (state) => {
        state.speed = action.payload;
      });
    default:
      return state;
  }
};

export default commonReducer;

