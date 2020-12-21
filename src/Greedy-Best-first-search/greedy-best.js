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

function greedy_best(startNode, endNode, rows, cols) {
    var priorityQueue = new PriorityQueue();
    let visited = [];
    let path = [];
    const vis = [];
    for (let i = 0; i < rows; i++) {
        const temp = [];
        for (let j = 0; j < cols; j++) {
            temp.push(0);
        }
        vis.push(temp);
    }
    priorityQueue.enqueue(startNode, 0);
    vis[startNode.x][startNode.y] = 1;
    visited.push(startNode);
    while (!priorityQueue.isEmpty()) {
        let node = priorityQueue.dequeue().element;
        console.log(node);
        if (node === endNode) {
            break;
        }
        for (let i = 0; i < node.neighbours.length; i++) {
            let cur = node.neighbours[i];
            if (vis[cur.x][cur.y] === 0 && !cur.isWall) {
                visited.push(cur);
                cur.previous = node;
                vis[cur.x][cur.y] = 1;
                priorityQueue.enqueue(cur, 0);
            }
        }
    }
    let cur = endNode;
    while (cur.previous !== undefined) {
        path.push(cur);
        cur = cur.previous;
    }
    path.push(cur);
    path.reverse();
    return { path, visited, text: "no path found" };
}

export default greedy_best;