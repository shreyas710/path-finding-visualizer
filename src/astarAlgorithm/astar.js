function Astar(startNode, endNode) {
    let openSet = [];
    let closedSet = [];
    let path = [];
    let visited = [];

    openSet.push(startNode);
    while (openSet.length) {
        let leastIdx = 0;
        for (let i = 0; i < openSet.length; ++i) {
            if (openSet[i].f < openSet[leastIdx].f) {
                leastIdx = i;
            }
        }
        let current = openSet[leastIdx];
        visited.push(current);
        if (current === endNode) {
            let temp = current;
            path.push(temp);
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }
            path.reverse();
            return { path, visited, error: "path found" };
        }
        openSet = openSet.filter(ele => ele !== current);
        closedSet.push(current);

        let neighbours = current.neighbours;
        for (let i = 0; i < neighbours.length; ++i) {
            let neighbour = neighbours[i];
            if (!closedSet.includes(neighbour) && !neighbour.isWall) {
                let tempG = current.g + 1;
                let newPath = false;
                if (openSet.includes(neighbour)) {
                    if (tempG < neighbour.g) {
                        neighbour.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbour.f = tempG;
                    newPath = true;
                    openSet.push(neighbour);
                }

                if (newPath) {
                    neighbour.h = herustic(neighbour, endNode);
                    neighbour.f = neighbour.g + neighbour.f;
                    neighbour.previous = current;
                }
            }
        }
    }
    path.reverse();
    return { path, visited, error: "no path found" };
}

function herustic(a, b) {
    let d = Math.abs(a.x - a.y) + Math.abs(b.x - b.y);
    return d;
}

export default Astar;