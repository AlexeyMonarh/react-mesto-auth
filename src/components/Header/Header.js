import { React } from 'react';
import logo from '../../images/vector/logo.svg';
import { Link } from 'react-router-dom';
// import { Navbar } from 'react-bootstrap';

function Header(props) {
  return (
    <header className={`header `}>
      <img src={logo} alt="Лого (Место - Россия)" className="header__logo" />
      <div className={props.headerMob} style={{ display: 'flex' }}>
        <div style={{ marginRight: '15px' }}>{props.email}</div>
        <Link className="header__auth header__auth_mobile" onClick={props.onClick} to={props.to}>{props.title}</Link>
      </div>
    </header>
  );
}

export default Header;

// {/* <>
// <Navbar collapseOnSelect expand="md" bg="dark" variant="">
//   <Container className="header">
//     <Navbar.Brand href="/">
//       <img src={logo} alt="Лого (Место - Россия)" className="header__logo" />
//     </Navbar.Brand>
//     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//     <Navbar.Collapse id="responsive-navbar-nav">
//       <Nav style={{ display: 'flex', marginRight: 'auto', }}>
//         {/* <div style={{ marginRight: '15px' }}>{props.email}</div>
//         <Link className="header__auth header__auth_mobile" onClick={props.onClick} to={props.to}>{props.title}</Link> */}
//       </Nav>
//     </Navbar.Collapse>
//   </Container>
// </Navbar>
// </> */}