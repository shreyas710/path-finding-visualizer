class QElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

class PriorityQueue {

    constructor() {
        this.items = [];
    }
    enqueue(element, priority) {
        var qElement = new QElement(element, priority);
        var contain = false;

        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }

        if (!contain) {
            this.items.push(qElement);
        }
    };

    dequeue() {
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

function dijkstra(startNode, endNode, rows, cols) {
    let vis = [];
    let visited = [];
    let d = [];
    let path = [];
    for (let i = 0; i < rows; i++) {
        const temp = [], temp1 = [];
        for (let j = 0; j < cols; j++) {
            temp.push(0);
            temp1.push(100000000);
        }
        vis.push(temp);
        d.push(temp1);
    }
    var priorityQueue = new PriorityQueue();
    priorityQueue.enqueue(startNode, 0);
    vis[startNode.x][startNode.y] = 1;
    visited.push(startNode);
    d[startNode.x][startNode.y] = 0;
    let flag = 0;
    while (!priorityQueue.isEmpty()) {
        let node = priorityQueue.dequeue();
        console.log(node.priority);
        if (node.element === endNode) {
            flag = 1;
            break;
        }
        for (let i = 0; i < node.element.neighbours.length; i++) {
            let neighbour = node.element.neighbours[i];
            if (d[node.element.x][node.element.y] + neighbour.weight < d[neighbour.x][neighbour.y] && !node.element.neighbours[i].isWall) {
                vis[neighbour.x][neighbour.y] = 1;
                visited.push(neighbour);
                neighbour.previous = node.element;
                d[neighbour.x][neighbour.y] = d[node.element.x][node.element.y] + neighbour.weight;
                priorityQueue.enqueue(neighbour, neighbour.weight);
            }
        }
    }

    if (flag === 1) {
        let cur = endNode;
        while (cur.previous !== undefined) {
            path.push(cur);
            cur = cur.previous;
        }
        path.push(startNode);
        path.reverse();
    }
    console.log(d[endNode.x][endNode.y]);
    return { path, visited, error: "no path found" };
}

export default dijkstra;