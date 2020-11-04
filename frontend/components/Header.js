import  React,{ useState } from 'react';
import Router from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import {APP_NAME} from '../config';
import {signout, isAuth} from '../actions/auth';
import Private from './auth/Private';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import Link from 'next/link';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
    console.log(APP_NAME,'k')
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
        <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>

            {!isAuth() && <React.Fragment>
              <NavItem>
                  <Link href="/signin">
                    <NavLink style={{cursor: 'pointer'}}>
                      Sign-in
                    </NavLink>
                  </Link>
            </NavItem>
            <NavItem>
              
                  <Link href="/signup">
                    <NavLink style={{cursor: 'pointer'}}>
                      Sign-up
                    </NavLink>
                  </Link>
              
            </NavItem>
            </React.Fragment>}
            
            
            {isAuth() && isAuth().role===0 && (
              <NavItem>
                <NavLink href='/user' style={{cursor: 'pointer'}}>
                 {`${isAuth().name}'s Dashboard`}
                </NavLink>
            </NavItem>
            )}
            {isAuth() && isAuth().role===1 &&(
              <NavItem>
                <NavLink href='/admin' style={{cursor: 'pointer'}}>
                 {`${isAuth().name}'s admin Dashboard`}
                </NavLink>
            </NavItem>
            )}
            {isAuth() && (<NavItem>
                <NavLink style={{cursor: 'pointer'}} onClick = {() => signout(()=> Router.replace('/signin'))}>
                  Signout
                </NavLink>
              
          
        </NavItem>)}
          </Nav>
          <NavbarText>The E-Guardians</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;