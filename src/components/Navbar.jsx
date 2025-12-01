import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "../styles/landingPage.css";
import logo from "../assets/images/logo.png";
import { Link } from 'react-router-dom'

const NavbarComp = () => {
  return (
    <>
      <Navbar expand="lg" bg="white" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img
              src={logo}
              alt="Logo Binusian Talks"
              width={130}
              height={25}
              className="d-inline-block align-top me-2"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="navbar-nav">
            {/* Menu tengah */}
            <Nav className="mx-auto gap-4">
              <Nav.Link href="#forum" className="text-dark">
                Forum
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="text-dark mx-3">
                About
              </Nav.Link>
              <Nav.Link href="#profile" className="text-dark">
                Profile
              </Nav.Link>
            </Nav>

            {/* Button kanan */}
            <Button href="#signin" className="btn-signin">
              Sign in
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
