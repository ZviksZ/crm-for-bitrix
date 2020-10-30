import React     from 'react';
import {NavLink} from "react-router-dom";
import styles    from '../Sidebar.module.scss'

export const SidebarUserMenu = ({menuOpen, logoutUser}) => {

   return (
      <>
         {
            menuOpen && <div className={styles.sidebarUserMenu}>
             {/*  <NavLink to='/profile' className={styles.sidebarUserMenuLink}
                        activeClassName={styles.activeLink}>
                  <i className="icon-outline-person-24px-default"></i>
                  <span>Профиль</span>
               </NavLink>
               <NavLink to='/settings' className={styles.sidebarUserMenuLink}
                        activeClassName={styles.activeLink}>
                  <i className="icon-settings-default"></i>
                  <span>Настройки</span>
               </NavLink>
               <NavLink to='/account' className={styles.sidebarUserMenuLink}
                        activeClassName={styles.activeLink}>
                  <i className="icon-briefcasecustom"></i>
                  <span>Аккаунт</span>
               </NavLink>*/}
               <NavLink to='/' className={styles.sidebarUserMenuLink}
                        activeClassName={styles.activeLink} onClick={logoutUser}>
                  <i className="icon-open-in-new-default"></i>
                  <span>Выйти</span>
               </NavLink>
            </div>
         }
      </>
   )
}

