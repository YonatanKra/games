import {
  centersToGraph,
  generateCenters,
  generateEdgesForCenters,
  generateTerritories,
  Point,
  Size,
  Territory
} from '@games/map';

describe(`Map`, function() {
  describe(`generateCenters`, function() {
    it(`should generate n 2D points in range`, function() {
      const n = 20 + Math.round(Math.random() * 20);
      const size: Size = {width: 500, height: 750};
      const centers = generateCenters(size, n);
      expect(centers.length).toEqual(n);
      centers.forEach(point => expect(point instanceof Point).toEqual(true));
    });

    it(`should have different points between 0 and max ranges`, function() {
      function isOutOfRange(value, max) {
        return value < 0 || value > max;
      }

      function testCenter(counter, point) {
        if (!counter[point]) {
          counter[point] = 0;
        }
        counter[point]++;
      }
      const n = 20 + Math.round(Math.random() * 20);
      const size: Size = {width: 500, height: 750};
      const centers = generateCenters(size, n);
      const countersX = {};
      const countersY = {};
      let numberOutOfRange = false;

      centers.forEach(point => {
        testCenter(countersX, point.x);
        testCenter(countersY, point.y);
        numberOutOfRange = isOutOfRange(point.x, size.width) || isOutOfRange(point.y, size.height)
      });

      expect(numberOutOfRange).toEqual(false);
      expect(Object.keys(countersX).length > n / 2).toEqual(true);
      expect(Object.keys(countersY).length > n / 2).toEqual(true);
    });
  });

  describe(`centersToGraph`, function() {
    it(`should return a graph of adjacent centers`, function() {
      const centers =  [
         { x: 1, y: 3 }, // 5.385, 6.324, 7, 6.324, 1.414 => 1/5
         { x: 2, y: 4 }, // 4.123, 5.099, 6.082, 5.83, 1.414 => 0/5
         { x: 7, y: 1 }, // 4.123, 8.944, 2.236, 5.83, 6.324 => 3/5
         { x: 8, y: 3 }, // 2.828, 7.810, 2.236, 6.082, 7 => 2/5
         { x: 3, y: 9 }, // 5, 7.81, 8.944, 5.099, 6.324 => 5/1
         { x: 6, y: 5 }, // 5, 2.828, 4.123, 4.123, 5.385 -> 4-3/1
      ];

      const expectedConnections = [
        [1,5], [0, 5], [3, 5], [2, 5], [1, 5], [1, 3]
      ];

      const graph = centersToGraph(centers);

      expect(graph.length).toEqual(centers.length);
      graph.forEach((node, index) => {
        const adjacentNodesPointStrings = node.adjacentNodes.map(node => JSON.stringify(node.point)).sort();
        const expectedPointsStrings = expectedConnections[index].map(pointIndex => JSON.stringify(centers[pointIndex])).sort();
        adjacentNodesPointStrings.forEach((adjacentNodePoint, i) => {
          expect(adjacentNodePoint).toEqual(expectedPointsStrings[i]);
        })
      });

    });
  });

  describe(`generateTerritories`, function() {
    let n, size: Size, centers: Point[], territories: Territory[];

    beforeEach(function() {
       n = 20 + Math.round(Math.random() * 20);
       size = {width: 500, height: 750};
       centers = generateCenters(size, n);
       territories = generateTerritories(centers);
    });

    it(`should return n territories`, function() {
      expect(territories.length).toEqual(n);
      expect(territories[0]).toBeDefined();
      territories.forEach(territory => {
        expect(territory instanceof Territory).toEqual(true);
      });
    });

    it(`should add node for each center`, function() {
      territories.forEach((territory, index) => {
        expect(territory.center.point).toMatchObject(centers[index]);
      });
    });

    it(`should have each center as part of a map graph`, function() {
      territories.forEach((territory, index) => {
        expect(territory.center.adjacentNodes.length).toEqual(2);
      });
    });
  });
});
