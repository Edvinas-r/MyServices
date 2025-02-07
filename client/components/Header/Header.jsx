import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log('Current user:', user);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <div className="d-flex align-items-center">
          <Button variant="outline-light" onClick={handleBack} className="me-5">
            Back
          </Button>

          <Navbar.Brand
            as={Link}
            to="/"
            className="logo me-3"
            style={{ pointerEvents: user ? 'none' : 'auto', opacity: user ? 0.5 : 1 }}
          >
            MyServices
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/auth" className="nav-link">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="nav-link">
                  Sign Up
                </Nav.Link>
              </>
            )}
            {user && user.role_id === 1 && (
              <>
                <Nav.Link as={Link} to="/user" className="nav-link">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/user/add-service" className="nav-link">
                  Add Service
                </Nav.Link>

                <Button variant="outline-light" onClick={logout} className="ms-5">
                  Logout
                </Button>
              </>
            )}
            {user && user.role_id === 2 && (
              <>
                {/* <Nav.Link as={Link} to="/admin/add-service" className="nav-link">
                  Add Service
                </Nav.Link> */}
                {user?.role_id === 2 && (
  <Nav.Link as={Link} to="/admin/add-category" className="nav-link">
    Add Category
  </Nav.Link>
)}

                <Nav.Link as={Link} to="/admin" className="nav-link">
                  Home
                </Nav.Link>
                <Button variant="outline-light" onClick={logout} className="ms-2">
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
