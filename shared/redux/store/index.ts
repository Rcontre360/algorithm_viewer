import { createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import mainReducer from "@shared/redux/reducer";

interface CommonState {
  speed: number;
  running: boolean;
  algorithm: {
    name: AlgorithmSignature;
    dataStructure: "graph";
  };
}

interface AlgorithmState {
  readonly options: {
    readonly addNode: boolean;
    readonly addEdge: boolean;
    readonly directed: boolean;
    readonly weighted: boolean;
    readonly startNode: number;
  };
  readonly output: any;
  readonly data: any;
}

interface IInitialState {
  common: Readonly<CommonState>;
  graph: Readonly<AlgorithmState>;
}

export const initialState: IInitialState = {
  common: {
    speed: 500,
    running: false,
    algorithm: {
      name: "dfs",
      dataStructure: "graph",
    },
  },
  graph: {
    output: undefined,
    options: {
      addNode: false,
      addEdge: false,
      directed: false,
      weighted: false,
      startNode: 0,
    },
    data: {
      nodes: [],
      edges: [],
    },
  },
};

const store: Store = createStore(
  mainReducer,
  initialState,
  composeWithDevTools()
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type InitialState = Readonly<IInitialState>;
export default store;
