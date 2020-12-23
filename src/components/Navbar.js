import React from 'react';
import "bootswatch/dist/lux/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from 'react-bootstrap'

const Navbar = ({ visualizePath, visualzeShortestPath, initialiseGrid, changeAlgo, clearNodes }) => {

    return (
        <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <ReactBootStrap.Navbar.Brand href="#home">React-Bootstrap</ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                <ReactBootStrap.Nav className="mr-auto">
                    <ReactBootStrap.Nav.Link onClick={visualizePath}>Visualize</ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link onClick={clearNodes} >Clear</ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link >Start Node</ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link href="#pricing">End Node</ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link href="#pricing">Wall</ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link href="#pricing">Weighted Wall</ReactBootStrap.Nav.Link>
                    <ReactBootStrap.NavDropdown title="Algorithms" id="collasible-nav-dropdown">
                        <ReactBootStrap.NavDropdown.Item onClick={() => { changeAlgo(1) }}>A*</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item onClick={() => { changeAlgo(2) }}>DFS</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item onClick={() => { changeAlgo(3) }}>Greedy-Best-First-Search</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item onClick={() => { changeAlgo(4) }}>Bidirectional swarm</ReactBootStrap.NavDropdown.Item>
                    </ReactBootStrap.NavDropdown>
                </ReactBootStrap.Nav>
                <ReactBootStrap.Nav>
                    <ReactBootStrap.Nav.Link href="#deets">About</ReactBootStrap.Nav.Link>
                </ReactBootStrap.Nav>
            </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>


    );
}

export default Navbar;