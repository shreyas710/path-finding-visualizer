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
                path.unshift(temp);
                temp = temp.previous;
            }
            path.push(startNode);
            return { path, visited };
        }
        for (let i = 0; i < curNode.neighbours.length; i++) {
            if (!visited.includes(curNode.neighbours[i]) && !curNode.neighbours[i].isWall) {
                curNode.neighbours[i].previous = curNode;
                q.push(curNode.neighbours[i]);
            }
        }
    }
    return { path, visited, text: "no path found" };
}

export default bfs;