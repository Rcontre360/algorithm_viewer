interface BFSOptions {
  startNode?: number;
}

interface StateMapper {
  visited: boolean[];
  current: number;
  nodes: number[];
  queue: number[];
}

export interface BFSReturn extends GraphReturn {
  role: "current" | "pushed" | "poped";
  state: string[];
}

export class BFS implements AlgorithmHandler {
  visited: boolean[] = [];
  returnValue: BFSReturn[] = [];
  queue: { from: number; to: number }[] = [];

  constructor() {}

  start = (graph: GraphInterface<unknown>, options?: BFSOptions) => {
    const startNode = (options && options.startNode) || 0;

    this.returnValue = [];
    this.visited = new Array(graph.getNumberOfElements());
    this.visited.fill(false);
    this.BFS(graph, { startNode });
    return this.returnValue;
  };

  BFS = (graph: GraphInterface<unknown>, options: { startNode: number }) => {
    const { startNode } = options;

    this.queue.push({ to: startNode, from: -1 });

    while (this.queue.length > 0) {
      const currentNode = this.queue.shift();
      const nodes = graph.getNodeConnections(currentNode!.to);

      this.visited[currentNode!.to] = true;
      this.returnValue.push({
        role: "current",
        from: currentNode!.from,
        to: currentNode!.to,
        state: this.stateMapper({
          nodes,
          visited: this.visited,
          current: currentNode!.to,
          queue: this.queue.map(({ to }) => to),
        }),
      });

      const queueFinishedCopy = this.queue.map(({ to }) => to).concat(nodes);

      for (let i of nodes) {
        if (this.visited[i]) continue;
        this.queue.push({ to: i, from: currentNode!.to });
        this.returnValue.push({
          role: "pushed",
          from: currentNode!.to,
          to: i,
          state: this.stateMapper({
            nodes,
            visited: this.visited,
            current: currentNode!.to,
            queue: queueFinishedCopy,
          }),
        });
      }

      this.returnValue.push({
        role: "poped",
        from: currentNode!.from,
        to: currentNode!.to,
        state: this.stateMapper({
          nodes,
          visited: this.visited,
          current: currentNode!.to,
          queue: this.queue.map(({ to }) => to),
        }),
      });
    }
  };

  stateMapper = (state: StateMapper) => {
    return [
      `Queue stack = [${state.queue.join(", ")}]`,
      `Array visited = [${state.visited.join(", ")}]`,
      `Array neighbours = [${state.nodes.join(", ")}]`,
      `Integer currentNode = ${state.current}`,
    ];
  };
}

export default BFS;

