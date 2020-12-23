function bfs(startNode, endNode) {
    let path = [];
    let visited = [];
    let q = [];
    q.push(startNode);
    while (q.length) {
        let curNode = q.shift();
        visited.push(curNode);
        if (curNode === endNode) {
            let temp = curNode;
            while (temp.previous !== startNode) {
                path.push(temp);
                temp = temp.previous;
            }
            path.push(temp);
            path.push(startNode);
            path.reverse();
            return { path, visited };
        }
        let neighbour = curNode.neighbours;
        for (let i = 0; i < neighbour.length; i++) {
            if (!visited.includes(neighbour[i]) && !neighbour[i].isWall) {
                neighbour[i].previous = curNode;
                q.push(neighbour[i]);
                visited.push(neighbour[i]);
            }
        }
    }
    return { path, visited, text: "no path found" };
}

export default bfs;