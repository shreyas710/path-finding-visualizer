let vis = [];
let visited = [];
let path = [];
let flag = 0;
function dfs(startNode, endNode, rows, cols) {
    for (let i = 0; i < rows; i++) {
        const temp = [];
        for (let j = 0; j < cols; j++) {
            temp.push(0);
        }
        vis.push(temp);
    }
    run(startNode, endNode, vis, visited);
    if (flag === 0) {
        path = [];
        return { path, visited, error: "no path found" };
    }
    let currentNode = endNode;
    while (currentNode.previous !== undefined) {
        path.push(currentNode);
        currentNode = currentNode.previous;
    }
    path.push(currentNode);
    path.reverse();
    return { path, visited, error: "no path found" };
}

function run(startNode, endNode, vis, visited) {
    if (vis[startNode.x][startNode.y] === 0) {
        vis[startNode.x][startNode.y] = 1;
        visited.push(startNode);
        if (startNode === endNode) {
            flag = 1;
            return;
        }
        for (let i = 0; i < startNode.neighbours.length; i++) {
            const neighbour = startNode.neighbours[i];
            if (vis[neighbour.x][neighbour.y] === 0 && !neighbour.isWall) {
                run(startNode.neighbours[i], endNode, vis, visited);
                startNode.neighbours[i].previous = startNode;
                if (flag === 1) {
                    return;
                }
            }
        }
    }
}

export default dfs;
