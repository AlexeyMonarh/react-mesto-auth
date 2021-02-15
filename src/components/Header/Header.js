import { React } from 'react';
import logo from '../../images/vector/logo.svg';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

function Header(props) {
  return (
    <>
      <Navbar className="p-0" collapseOnSelect expand="md" variant="dark">
        <Container className="header mw-100 pr-0 pl-0">
          <Navbar.Brand className="p-0 m-0" href="/">
            <img src={logo}
              alt="Логотип"
              className="header__logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle className="p-0 border-0" style={{marginRight: '30px'}} aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
            <Nav className="text-center">
              <div className="header__auth_mobile">{props.email}</div>
              <Link className="header__auth" onClick={props.onClick} to={props.to}>{props.title}</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;