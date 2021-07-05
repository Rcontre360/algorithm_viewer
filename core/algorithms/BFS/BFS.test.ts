import { Graph } from "@core/data_structures/Graph";
import BFS from "./index";

describe("BFS should return right values", () => {
  let graph: Graph<string>;
  let bfs: BFS;
  const rightIndirectedConnection = [[1, 3], [0, 3], [], [0, 1]];
  const nodeData = ["node", "node2", "node3", "node4"];
  const rightIndirectedReturn = {
    role: expect.stringMatching(/current|pushed|poped/),
    from: expect.any(Number),
    to: expect.any(Number),
    state: expect.arrayContaining([expect.any(String)]),
  };

  beforeEach(() => {
    graph = new Graph(rightIndirectedConnection, nodeData);
    bfs = new BFS();
  });

  test("Return value", () => {
    bfs.start(graph, { startNode: 0 }).forEach((value) => {
      expect(value).toMatchObject(rightIndirectedReturn);
    });
  });
});

