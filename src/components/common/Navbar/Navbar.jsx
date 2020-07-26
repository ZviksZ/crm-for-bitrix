import Divider                            from "@material-ui/core/Divider";
import React                              from 'react';
import AppBar                             from '@material-ui/core/AppBar';
import Toolbar                            from '@material-ui/core/Toolbar';
import Button                             from '@material-ui/core/Button';
import {connect}                          from "react-redux";
import {NavLink}                          from "react-router-dom";
import {openAddModalWithData, toggleMenu} from "../../../redux/appReducer.js";
import styles                             from './Navbar.module.scss'
import logo                               from '../../../assets/img/logo.svg'
import {NavbarAdd}                        from "./NavbarAdd/NavbarAdd.jsx";
import {NavbarMessages}                   from "./NavbarMessages/NavbarMessages.jsx";

const Navbar = ({sidebarIsOpen, toggleMenu, openAddModal, openAddModalWithData, isAuth}) => {

   return (
      <AppBar position="fixed" className="navbar">
         <Toolbar className={styles.navbar}>
            <Button color="inherit" onClick={toggleMenu} className={styles.burgerBtn}>
               {sidebarIsOpen ? <i className="icon-close-default"/> : <i className="icon-view-headline-default"/>}
            </Button>
            <NavLink to='/' className={styles.logo}>
               <img src={logo} alt="logo"/>
            </NavLink>

            {
               isAuth && <>
                  <NavbarMessages messages={['1', '2']}/>
                  <Divider orientation="vertical" flexItem className={styles.divider}/>
                  <NavbarAdd clickHandler={openAddModalWithData}/>
               </>
            }


         </Toolbar>
      </AppBar>
   );
}

let mapStateToProps = (state) => {
   return {
      sidebarIsOpen: state.common.sidebarIsOpen,
      isAuth: state.auth.isAuth
   }
}

export default connect(mapStateToProps, {toggleMenu, openAddModalWithData})(Navbar);


