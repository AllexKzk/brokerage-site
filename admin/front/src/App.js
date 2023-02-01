import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
//BOOTSTRAP:
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//ROUTE:
import Brokers from './pages/Brokers'
import Stock from "./pages/Stock";
import Settings from "./pages/Settings";

export default function NavBar() {
    return (
        <Router class = 'navbar'>
            <Navbar bg="dark" variant="dark" >
                <Container>
                    <Navbar.Brand href="/">EXchange</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/brokers'>Brokers</Nav.Link>
                            <Nav.Link as={Link} to="/stock">Stock</Nav.Link>
                            <Nav.Link as={Link} to="/setting">Settings</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/" element={<Brokers/>} />
                <Route path="/brokers" element={<Brokers/>} />
                <Route path="/stock" element={<Stock/>} />
                <Route path="/setting" element={<Settings />} />
            </Routes>
        </Router>
    );
}
