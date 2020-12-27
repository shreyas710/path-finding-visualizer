import "bootswatch/dist/lux/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

const Footer = () => {
    return (
        <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ height: 100 + 'px', marginTop: 10 + 'px' }}>
            <ReactBootStrap.Navbar.Brand href="#home" style={{ position: 'relative', bottom: 11 + 'px', left: 60 + 'px' }}>Made By:</ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav" style={{ position: 'relative', top: 15 + 'px' }}>
                <Nav className="justify-content-center" activeKey="/home">
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled style={{ color: '#ddd' }}>
                            Shreyas Kulkarni
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled style={{ color: '#ddd' }}>
                            Kunal Kolambe
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled style={{ color: '#ddd' }}>
                            Sanket Varpe
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>
    );
}

export default Footer;