import React, { useState, useEffect } from 'react';
//import Astar from '../astarAlgorithm/astar'
import bfs from '../bfsAlgorithm/bfs';
//import Node from './Node'
import Astar from '../astarAlgorithm/astar';
import dfs from "../DFS/dfs";
import greedy_best from '../Greedy-Best-first-search/greedy-best';
import Bidir from '../bidirectional swarm/bidir';
import Node from './Node';
import "bootswatch/dist/lux/bootstrap.min.css";
import './Pathfind.css';
import Navbar from './Navbar';
import './Node.css';

const rows = 15;
const cols = 55;

let NODE_START_ROW = -1;
let NODE_START_COL = -1;
let NODE_END_ROW = -1;
let NODE_END_COL = -1;
let start = 0;
let end = 0;
let wall = 0;
let button = 0;
let weighted_wall = 0;
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
        addNeighbours(grid);
        setPath([]);
        setVisited([]);
    };

    const clearNodes = () => {
        // Name = "Select An Algorithm";
        // let grid = Grid;
        // for (let i = 0; i < rows; ++i) {
        //     for (let j = 0; j < cols; ++j) {
        //         document.getElementById(`node-${i}-${j}`).className = "node";
        //         grid[i][j].isWall = false;
        //     }
        // }
        // start = 0;
        // end = 0;
        // wall = 0;
        // weighted_wall = 0;
        // NODE_START_ROW = -1;
        // NODE_START_COL = -1;
        // NODE_END_ROW = -1;
        // NODE_END_COL = -1;
        // setPath([]);
        // setVisited([]);
        window.location.reload();
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
        button = 0;
        if (start === 0) {
            alert(`Select a Start Node!!`);
            return;
        } else if (end === 0) {
            alert(`Select a End Node!!`);
            return;
        } else {
            const startNode = Grid[NODE_START_ROW][NODE_START_COL];
            const endNode = Grid[NODE_END_ROW][NODE_END_COL];
            let path;
            switch (val) {
                case 1:
                    path = Astar(startNode, endNode);
                    Name = 'A* Algorithm';
                    break;
                case 2:
                    path = dfs(startNode, endNode, rows, cols);
                    Name = "DFS Algorithm";
                    break;
                case 3:
                    path = greedy_best(startNode, endNode, rows, cols);
                    Name = "Greedy-best-first-search";
                    break;
                case 4:
                    path = Bidir(startNode, endNode);
                    Name = "Bidirectional Swarm";
                    break;
                default:
                    Name = "Choose a Algorithm";
            }
            setPath(path.path);
            setVisited(path.visited);
        }
    }}

    // create spot
    const createSpot = (grid) => {
        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j < cols; ++j) {
                grid[i][j] = new Spot(i, j);
            }
        }
    };


    const onHover = (x, y) => {
        if ((wall === 1 && button === 3)) {
            if ((x !== NODE_START_ROW && y !== NODE_START_COL) || (x !== NODE_END_ROW && y !== NODE_END_COL)) {
                let grid = Grid;
                if (grid[x][y].isWall) {
                    document.getElementById(`node-${x}-${y}`).className = "node";
                } else {
                    document.getElementById(`node-${x}-${y}`).className = "node node-wall";
                }
                grid[x][y].isWall = !grid[x][y].isWall;
                setGrid(grid);
                wall = 1;
            }
        } else if (weighted_wall === 1 && button === 5) {
            let grid = Grid;
            if ((x !== NODE_START_ROW && y !== NODE_START_COL) && (x !== NODE_END_ROW && y !== NODE_END_COL)) {
                if (grid[x][y].isWall) {
                    grid[x][y].weight = 2;
                    document.getElementById(`node-${x}-${y}`).className = "node";
                } else {
                    grid[x][y].weight = 1;
                    document.getElementById(`node-${x}-${y}`).className = "node node-wall-weighted";
                }
                grid[x][y].isWall = !grid[x][y].isWall;
                setGrid(grid);
                weighted_wall = 1;
            }
        }
    }

    const changeWall = (x, y) => {
        let grid = Grid;
        if (button === 1 && (x !== NODE_END_ROW && y !== NODE_END_COL)) {
            if (start === 1) {
                document.getElementById(`node-${NODE_START_ROW}-${NODE_START_COL}`).className = "node";
                grid[NODE_START_ROW][NODE_START_COL].isStart = false;
            }
            document.getElementById(`node-${x}-${y}`).className = "node node-start";
            grid[x][y].isStart = true;
            setGrid(grid);
            NODE_START_ROW = x;
            NODE_START_COL = y;
            start = 1;
        } else if (button === 2 && (x !== NODE_START_ROW && y !== NODE_START_COL)) {
            if (end === 1) {
                document.getElementById(`node-${NODE_END_ROW}-${NODE_END_COL}`).className = "node";
                grid[NODE_END_ROW][NODE_END_COL].isEnd = false;
            }
            document.getElementById(`node-${x}-${y}`).className = "node node-end";
            grid[x][y].isEnd = true;
            setGrid(grid);
            NODE_END_ROW = x;
            NODE_END_COL = y;
            end = 1;
        } else if (button === 3) {
            if ((x !== NODE_START_ROW && y !== NODE_START_COL) && (x !== NODE_END_ROW && y !== NODE_END_COL)) {
                if (grid[x][y].isWall) {
                    document.getElementById(`node-${x}-${y}`).className = "node";
                } else {
                    document.getElementById(`node-${x}-${y}`).className = "node node-wall";
                }
                grid[x][y].isWall = !grid[x][y].isWall;
                setGrid(grid);
                wall = 1;
            }
        } else if (button === 5) {
            if ((x !== NODE_START_ROW && y !== NODE_START_COL) && (x !== NODE_END_ROW && y !== NODE_END_COL)) {
                if (grid[x][y].isWall) {
                    grid[x][y].weight = 2;
                    document.getElementById(`node-${x}-${y}`).className = "node";
                } else {
                    grid[x][y].weight = 1;
                    document.getElementById(`node-${x}-${y}`).className = "node node-wall-weighted";
                }
                grid[x][y].isWall = !grid[x][y].isWall;
                setGrid(grid);
                weighted_wall = 1;
            }
        }
    }

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
        this.weight = 1;
        this.isStart = false;
        this.isEnd = false;
        this.neighbours = [];
        this.isWall = false;
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
                                <Node key={colIndex} isStart={isStart} isEnd={isEnd} row={rowIndex} col={colIndex} isWall={isWall} changeWall={changeWall} onHover={onHover}></Node>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )

    const visualzeShortestPath = (shortestPath) => {
        for (let i = 1; i < shortestPath.length - 1; ++i) {
            setTimeout((
                () => {
                    const node = shortestPath[i];
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path";
                }
            ), 20 * i);
        }
    }

    const visualizePath = () => {
        button = 0;
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
                    if ((VisitedNodes[i].x === NODE_START_ROW && VisitedNodes[i].y === NODE_START_COL) || (VisitedNodes[i].x === NODE_END_ROW && VisitedNodes[i].y === NODE_END_COL)) {
                        continue;
                    }
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

    const buttons = (val) => {
        button = val;
        if (button === 4) {
            let grid = Grid;
            for (let i = 0; i < rows; ++i) {
                for (let j = 0; j < cols; ++j) {
                    if ((i !== NODE_START_ROW && j !== NODE_START_COL) && (i !== NODE_END_ROW && j !== NODE_END_COL)) {
                        if (Math.random(1) < 0.2) {
                            grid[i][j].isWall = !grid[i][j].isWall;
                            if (grid[i][j].isWall) {
                                document.getElementById(`node-${i}-${j}`).className = "node node-wall";
                            } else {
                                document.getElementById(`node-${i}-${j}`).className = "node";
                            }
                        }
                    }
                }
            }
        }
    }

    return (
        <div className>
            <Navbar visualizePath={visualizePath} initialiseGrid={initialiseGrid} visualzeShortestPath={visualzeShortestPath} changeAlgo={changeAlgo} clearNodes={clearNodes} buttons={buttons} />
            <div className="Wrapper">
                <h1 style={{ marginTop: 30 + 'px' }}>{Name}</h1>
                {gridwithNode}
            </div>

        </div>
    )
}

export default Pathfind;
