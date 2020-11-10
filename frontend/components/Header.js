import  React,{ useState } from 'react';
import Router from 'next/router';
import  NProgress  from 'nprogress';
import 'bootstrap/dist/css/bootstrap.min.css';
import {APP_NAME} from '../config';
import {signout, isAuth} from '../actions/auth';
import Private from './auth/Private';
import Search from './blog/search';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  
} from 'reactstrap';
import Link from 'next/link';
import '.././node_modules/nprogress/nprogress.css'
Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Header = (props) => {
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  // const toggleDrop = () => setDropdownOpen(!dropdownOpen);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
    //console.log(APP_NAME,'k')
  return (
    <React.Fragment>
      <Navbar color="light" light expand="md">
        <Link href="/blogs">
        <NavLink className="font-weight-bold" style={{cursor: 'pointer'}}>{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
        
         {/* <React.Fragment>
              <NavItem>
                  <Link href="/blogs">
                    <NavLink style={{cursor: 'pointer'}}>
                      Blogs
                    </NavLink>
                  </Link>
            </NavItem>
          </React.Fragment> */}
          {/* <Dropdown nav isOpen={dropdownOpen} toggle={toggleDrop}>
          <DropdownToggle nav caret>
            Dropdown
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Categories</DropdownItem>
            <DropdownItem >Action</DropdownItem>
            <DropdownItem divider />
            <DropdownItem disabled>Tags</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
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
                 {`Dashboard`}
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
      <Search/>
    </React.Fragment>
  );
}

export default Header;