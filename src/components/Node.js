import React from 'react';
import './Node.css'
const Node = ({ isStart, isEnd, row, col, isWall,changeWall,onHover }) => {
    let classes = isStart ? "node-start" : isWall ? "node-wall" : isEnd ? "node-end" : "";

    return (
        <div className={`node ${classes}`} id={`node-${row}-${col}`} onClick={() => {changeWall(row,col)}} onMouseOver={() => {onHover(row,col)}}>

        </div>
    )
};

export default Node;