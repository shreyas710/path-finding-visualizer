let sVisited = [];
let tVisited = [];

let sParent = new Map();
let tParent = new Map();

let sQueue = [];
let tQueue = [];

let path = [];

let Visited = [];

function BFS1() {
    let curr = sQueue.shift();
    let neighbour = curr.neighbours;
    for (let i = 0; i < neighbour.length; ++i) {
        if (!sVisited.includes(neighbour[i]) && !neighbour[i].isWall) {
            sParent.set(neighbour[i], curr);
            sVisited.push(neighbour[i]);
            sQueue.push(neighbour[i]);
        }
    }
}

function BFS2() {
    let curr = tQueue.shift();
    let neighbour = curr.neighbours;
    for (let i = 0; i < neighbour.length; ++i) {
        if (!tVisited.includes(neighbour[i]) && !neighbour[i].isWall) {
            tParent.set(neighbour[i], curr);
            tVisited.push(neighbour[i]);
            tQueue.push(neighbour[i]);
        }
    }
}

function isInter(startNode) {
    let queue = [];
    let vis = [];
    queue.push(startNode);
    vis.push(startNode);
    while (queue.length) {
        let x = queue.shift();
        if (sVisited.includes(x) && tVisited.includes(x)) {
            return x;
        }
        let neighbour = x.neighbours;
        for (let i = 0; i < neighbour.length; ++i) {
            if (!vis.includes(neighbour[i]) && !neighbour[i].isWall) {
                queue.push(neighbour[i]);
                vis.push(neighbour[i]);
            }
        }
    }
    return -1;
}

function Bidir(startNode, endNode) {
    sQueue.push(startNode);
    sVisited.push(startNode);
    sParent.set(startNode, -1);
    tQueue.push(endNode);
    tVisited.push(endNode);
    tParent.set(endNode, -1);
    while (sQueue.length && tQueue.length) {
        BFS1();
        BFS2();
        let inter = isInter(startNode);
        // console.log(inter);
        if (inter !== -1) {
            path.push(inter);
            let i = inter;
            while (i !== startNode) {
                path.push(sParent.get(i));
                i = sParent.get(i);
            }
            path.reverse();
            i = inter;
            while (i !== endNode) {
                path.push(tParent.get(i));
                i = tParent.get(i);
            }

            i = 0;
            let j = 0, f = 0;
            while (i < sVisited.length && j < tVisited.length) {
                if (f === 0) {
                    Visited.push(sVisited[i]);
                    i++;
                    f = 1;
                } else {
                    Visited.push(tVisited[j]);
                    j++;
                    f = 0;
                }
            }

            while (i < sVisited.length) {
                Visited.push(sVisited[i]);
                i++;
            }

            while (j < tVisited.length) {
                Visited.push(tVisited[j]);
                j++;
            }

            return { path, Visited };
        }
    }
    return { path, Visited, error: "no path found" };
}

export default Bidir;