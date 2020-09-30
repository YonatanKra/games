export function distanceBetweenPoints({x: x1, y: y1}: Point, {x: x2, y: y2}: Point) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

export class Point {
  constructor(public x: number, public y: number) {
  }
}

class Node {
  private distances = [];
  adjacentNodes: Node[] = [];

  constructor(public point: Point) {
  }

  setAdjacentNode(node: Node) {
    if (node === this) return;

    if (!this.adjacentNodes[0]) {
      this.adjacentNodes.push(node);
      this.distances.push(distanceBetweenPoints(this.point, node.point));
      return;
    }
    if (!this.adjacentNodes[1]) {
      this.adjacentNodes.push(node);
      this.distances.push(distanceBetweenPoints(this.point, node.point));
      return;
    }

    const distance = distanceBetweenPoints(this.point, node.point);

    if (distance < this.distances[0]) {
      const tmpNode = this.adjacentNodes[0];
      const tmpNodeDistance = this.distances[0];
      this.adjacentNodes[0] = node;
      this.distances[0] = distance;

      if (this.distances[1] > tmpNodeDistance) {
        this.adjacentNodes[1] = tmpNode;
        this.distances[1] = tmpNodeDistance;
      }

      return

    }

    if (distance < this.distances[1]) {
      this.adjacentNodes[1] = node;
      this.distances[1] = distance;
    }
  }
}

class Edge {
  node: Point;
  next: Point;
}

export class Territory {
  borders: Edge[];

  constructor(public center:Node) {
  }
}

export interface Size {
  width: number;
  height: number;
}

function getRandomInRange(max: number): number {
  return Math.round(Math.random() * max);
}

export function generateCenters(range: Size, n: number): Point[] {
  const centersArray = new Array(n)
    .fill(0)
    .map(() => new Point(getRandomInRange(range.width), getRandomInRange(range.height)));
  return centersArray;
}

export function centersToGraph(centers: Point[]): Node[] {
  const graph = centers.map(point => new Node(point));

  graph.forEach(node => graph.forEach(anotherNode => node.setAdjacentNode(anotherNode)));

  return graph;
}

export function generateTerritories(centers: Point[]): Territory[] {
  const graph = centersToGraph(centers);
  return graph.map(center => new Territory(center));
}
