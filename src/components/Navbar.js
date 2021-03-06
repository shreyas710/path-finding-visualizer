import React from 'react';
import "bootswatch/dist/lux/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from 'react-bootstrap';

const Navbar = ({ visualizePath, visualzeShortestPath, initialiseGrid, changeAlgo, clearNodes, buttons }) => {

    return (
        <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <ReactBootStrap.Navbar.Brand href="#home">Path Finding Visualizer</ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                <ReactBootStrap.Nav className="mr-auto">
                    <ReactBootStrap.Nav.Link onClick={visualizePath}>Visualize</ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link onClick={clearNodes}>Clear</ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link onClick={() => { buttons(1) }}>Start Node</ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link onClick={() => { buttons(2) }}>End Node</ReactBootStrap.Nav.Link>
                    <ReactBootStrap.NavDropdown title="Walls" id="collasible-nav-dropdown">
                        <ReactBootStrap.NavDropdown.Item onClick={() => { buttons(3) }}>Wall</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item onClick={() => { buttons(5) }}>Weighted Wall</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item onClick={() => { buttons(4) }}>Random Walls</ReactBootStrap.NavDropdown.Item>
                    </ReactBootStrap.NavDropdown>
                    <ReactBootStrap.NavDropdown title="Algorithms" id="collasible-nav-dropdown">
                        <ReactBootStrap.NavDropdown.Item onClick={() => { changeAlgo(1) }}>A*</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item onClick={() => { changeAlgo(2) }}>DFS</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item onClick={() => { changeAlgo(3) }}>Greedy-Best-First-Search</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item onClick={() => { changeAlgo(4) }}>Bidirectional swarm</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item onClick={() => { changeAlgo(5) }}>BFS</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item onClick={() => { changeAlgo(6) }}>Dijkstra</ReactBootStrap.NavDropdown.Item>
                    </ReactBootStrap.NavDropdown>
                </ReactBootStrap.Nav>
            </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>
    );
}

export default Navbar;