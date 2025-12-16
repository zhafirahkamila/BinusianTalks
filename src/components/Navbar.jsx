import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "../styles/landingPage.css";
import logo from "../assets/images/logo.png";

const NavbarComp = ({ 
  showMenu = true,           // Tampilkan menu tengah (Forum, About, Profile)
  showAuthButton = true,     // Tampilkan tombol auth (Sign In / Register)
  authButtonType = "signin", // "signin" atau "register"
  showProfile = false,       // Tampilkan link Profile di menu
  customButton = null,       // Custom button (contoh: Sign Out, Back, dll)
  variant = "white"          // Variant navbar (white, dark, dll)
}) => {
  return (
    <>
      <Navbar expand="lg" bg={variant} className="shadow-sm">
        <Container className="position-relative">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src={logo}
              alt="Logo Binusian Talks"
              width={130}
              height={25}
              className="d-inline-block align-top me-2"
            />
          </Navbar.Brand>
          
          {(showMenu || showAuthButton || customButton) && (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                {/* Menu tengah - benar-benar di tengah halaman */}
                {showMenu && (
                  <Nav className="position-absolute start-50 translate-middle-x gap-4">
                    <Nav.Link as={Link} to="/forum" className="text-dark">
                      Forum
                    </Nav.Link>
                    <Nav.Link as={Link} to="/about" className="text-dark">
                      About
                    </Nav.Link>
                    {showProfile && (
                      <Nav.Link as={Link} to="/profile" className="text-dark">
                        Profile
                      </Nav.Link>
                    )}
                  </Nav>
                )}

                {/* Auth Button - di kanan */}
                {showAuthButton && (
                  <div className="ms-auto">
                    {authButtonType === "signin" ? (
                      <Button as={Link} to="/login" className="btn-signin">
                        Sign in
                      </Button>
                    ) : (
                      <Button as={Link} to="/register" className="btn-signin">
                        Register
                      </Button>
                    )}
                  </div>
                )}

                {/* Custom button - di kanan */}
                {customButton && (
                  <div className="ms-auto">{customButton}</div>
                )}
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;