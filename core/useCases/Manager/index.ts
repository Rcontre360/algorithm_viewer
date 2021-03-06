import GraphCase from "@core/useCases/GraphCase";
import DFS from "@core/algorithms/DFS";
import BFS from "@core/algorithms/BFS";

const DSMapper = {
  graph: GraphCase,
};

const AlgorithmMapper = {
  dfs: new DFS(),
  bfs: new BFS(),
};

export class Manager {
  static dataStructure: any;
  static algorithm: AlgorithmHandler;
  static algorithmOptions: Record<string, unknown>;

  static setDataStructure = (DS: "graph") => {
    if (typeof DS === "string") Manager.dataStructure = new DSMapper[DS]();
  };

  static setAlgorithm = (algorithm: AlgorithmSignature) => {
    Manager.algorithm = AlgorithmMapper[algorithm];
  };

  static setOptions = (newOptionSet: Record<string, unknown>) => {
    Manager.algorithmOptions = { ...Manager.algorithmOptions, ...newOptionSet };
  };

  static startAlgorithm = () => {
    return Manager.dataStructure.startAlgorithm(
      Manager.algorithm.start,
      Manager.algorithmOptions
    );
  };
}

export default Manager;

