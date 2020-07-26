import cn            from "classnames";
import React         from 'react';
import {connect}     from "react-redux";
import {toggleMenu}  from "../../../redux/appReducer.js";
import {logoutUser}  from "../../../redux/authReducer.js";
import styles        from './Sidebar.module.scss'
import {SidebarMenu} from "./SidebarMenu/SidebarMenu.jsx";
import {SidebarUser} from "./SidebarUser/SidebarUser.jsx";

const Sidebar = ({sidebarIsOpen, toggleMenu, logoutUser, name, img}) => {
   return (
      <div className={cn({[styles.sidebarShow]: sidebarIsOpen}, styles.sidebar)}>
         <SidebarUser name={name} img={img} logoutUser={logoutUser}/>
         <SidebarMenu toggleMenu={toggleMenu} logoutUser={logoutUser}/>
      </div>
   );
}

let mapStateToProps = (state) => {
   return {
      sidebarIsOpen: state.common.sidebarIsOpen,
      name: state.auth.name,
      img: state.auth.img
   }
}

export default connect(mapStateToProps, {toggleMenu, logoutUser})(Sidebar);
