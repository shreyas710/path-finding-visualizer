import React, { useState, useEffect } from 'react';
import Astar from '../astarAlgorithm/astar'
import bfs from '../bfsAlgorithm/bfs';
import Node from './Node'
import "bootswatch/dist/lux/bootstrap.min.css";
import './Pathfind.css'
import Navbar from './Navbar'
import './Node.css'

const rows = 15;
const cols = 35;

const NODE_START_ROW = 0;
const NODE_START_COL = 0;
const NODE_END_ROW = rows - 1;
const NODE_END_COL = cols - 1;
let algo = -1;
let Name = "Select an Algorithm";

const Pathfind = () => {
    const [Grid, setGrid] = useState([]);
    const [Path, setPath] = useState([]);
    const [VisitedNodes, setVisited] = useState([]);

    useEffect(() => {
        initialiseGrid();
    }, []);

    // create grid
    const initialiseGrid = () => {
        const grid = new Array(rows);

        for (let i = 0; i < rows; ++i) {
            grid[i] = new Array(cols);
        }

        createSpot(grid);
        setGrid(grid);
        clearNodes();
        addNeighbours(grid);

        const startNode = grid[NODE_START_ROW][NODE_START_COL];
        const endNode = grid[NODE_END_ROW][NODE_END_COL];
        startNode.isWall = false;
        endNode.isWall = false;

        setPath([]);
        setVisited([]);
    };

    const clearNodes = () => {
        for (let i = 0; i < VisitedNodes.length; ++i) {
            const node = VisitedNodes[i];
            document.getElementById(`node-${node.x}-${node.y}`).className = "node";
        }
    }

    const changeAlgo = (val) => {
        const startNode = Grid[NODE_START_ROW][NODE_START_COL];
        const endNode = Grid[NODE_END_ROW][NODE_END_COL];
        let path;
        algo = val;
        switch (val) {
            case 1:
                path = Astar(startNode, endNode);
                Name = 'A* Algorithm'
                break;
            case 2:
                Name = "Dijkstra's Algorithm";
                break;
            case 3:
                path = bfs(startNode,endNode);
                Name = "BFS Algorithm";
                break;
            case 4:
                Name = "Floyd Warshall"
                break;
            default:
                path = Astar(startNode, endNode);
        }
        setPath(path.path);
        setVisited(path.visited);
    }

    // create spot
    const createSpot = (grid) => {
        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j < cols; ++j) {
                grid[i][j] = new Spot(i, j);
            }
        }
    };

    // add neighbours 
    const addNeighbours = (grid) => {
        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j < cols; ++j) {
                grid[i][j].addneighbours(grid);
            }
        }
    }

    // spot constructor
    function Spot(i, j) {
        this.x = i;
        this.y = j;
        this.g = 0;
        this.f = 0;
        this.h = 0;
        this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
        this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
        this.neighbours = [];
        this.isWall = false;
        if (Math.random(1) < 0.2) {
            this.isWall = true;
        }
        this.previous = undefined;
        this.addneighbours = function (grid) {
            let i = this.x;
            let j = this.y;
            if (i > 0) this.neighbours.push(grid[i - 1][j]);
            if (i < rows - 1) this.neighbours.push(grid[i + 1][j]);
            if (j > 0) this.neighbours.push(grid[i][j - 1]);
            if (j < cols - 1) this.neighbours.push(grid[i][j + 1]);
        };

    }

    // create grid with node
    const gridwithNode = (
        <div>
            {Grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="rowWrapper">
                        {row.map((col, colIndex) => {
                            const { isStart, isEnd, isWall } = col;
                            return (
                                <Node key={colIndex} isStart={isStart} isEnd={isEnd} row={rowIndex} col={colIndex} isWall={isWall}></Node>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )

    const visualzeShortestPath = (shortestPath) => {
        for (let i = 0; i < shortestPath.length; ++i) {
            setTimeout((
                () => {
                    const node = shortestPath[i];
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path";
                }
            ), 20 * i);
        }
    }

    const visualizePath = () => {
        if (VisitedNodes.length === 0) {
            alert(`Select an Algorithm`);

        } else {
            for (let i = 0; i <= VisitedNodes.length; ++i) {
                if (i === VisitedNodes.length) {
                    setTimeout((
                        () => {
                            visualzeShortestPath(Path);
                        }
                    ), 10 * i);
                } else {
                    setTimeout((
                        () => {
                            const node = VisitedNodes[i];
                            document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited";
                        }
                    ), 10 * i);
                }
            }
        }
    }

    return (
        <div className>
            <Navbar visualizePath={visualizePath} initialiseGrid={initialiseGrid} visualzeShortestPath={visualzeShortestPath} changeAlgo={changeAlgo} />
            <div className="Wrapper">
                <h1 style={{ marginTop: 30 + 'px' }}>{Name}</h1>
                {gridwithNode}
            </div>

        </div>
    )
}

export default Pathfind;
