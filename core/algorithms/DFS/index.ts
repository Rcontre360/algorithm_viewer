interface DFSOptions {
  startNode?: number;
  previousIndex?: number;
}

interface StateMapper {
  visited: boolean[];
  function: number;
  nodes: number[];
}

export interface DFSReturn extends GraphReturn {
  forward: boolean;
  state?: string[];
}

export class DFS implements AlgorithmHandler {
  visited: boolean[] = [];
  returnValue: DFSReturn[] = [];

  start = (graph: GraphInterface<unknown>, options?: DFSOptions) => {
    const startNode = (options && options.startNode) || 0;
    const previousIndex = (options && options.previousIndex) || -1;

    this.returnValue = [];
    this.visited = new Array(graph.getNumberOfElements());
    this.visited.fill(false);
    this.DFS(graph, { startNode, previousIndex });

    return this.returnValue;
  };

  DFS = (
    graph: GraphInterface<unknown>,
    options: { startNode: number; previousIndex: number }
  ) => {
    const { startNode, previousIndex } = options;

    if (graph.getNumberOfElements() <= startNode) return;

    this.visited[startNode] = true;
    const nodes: number[] = graph.getNodeConnections(startNode);

    this.returnValue.push({
      forward: true,
      from: previousIndex,
      to: startNode,
      state: this.stateParser({
        nodes,
        function: startNode,
        visited: this.visited,
      }),
    });

    for (let i = 0; i < nodes.length; i++)
      if (!this.visited[nodes[i]])
        this.DFS(graph, {
          ...options,
          startNode: nodes[i],
          previousIndex: startNode,
        });

    this.returnValue.push({
      forward: false,
      from: startNode,
      to: previousIndex,
      state: this.stateParser({
        nodes,
        function: startNode,
        visited: this.visited,
      }),
    });
  };

  stateParser = (state: StateMapper) => {
    return [
      `Array visited=[${state.visited.join(", ")}]`,
      `function dfs([${state.function}])`,
      `Array neighbours = [${state.nodes.join(", ")}]`,
    ];
  };
}

export default DFS;

