import Divider           from "@material-ui/core/Divider";
import cn                from "classnames";
import React             from 'react'
import {useSelector}     from "react-redux";
import {getUniqueRoutes} from "../../../../helpers/utils.js";
import styles            from '../Sidebar.module.scss'
import {NavLink}         from 'react-router-dom'

export const SidebarMenu = ({toggleMenu}) => {
   const {accessItems} = useSelector(state => ({
      accessItems: state.auth.acl
   }))

   return (
      <div className={cn({[styles.sidebarOpen]: true}, styles.sidebarNav)}>
         <nav>
            {
               accessItems.includes(2) &&   <NavLink to='/' className={styles.links} onClick={toggleMenu}
                                                           activeClassName={styles.activeLink}>
                  <i className="icon-outline-home-24px-default"></i>
                  <span>Главная</span>
               </NavLink>
            }

            {
               accessItems.includes(3) &&    <NavLink to='/enums'
                                                            className={styles.links} onClick={toggleMenu}
                                                            activeClassName={styles.activeLink}>
                  <i className="icon-outline-calendar-today-24px-default"></i>
                  <span>Справочники</span>
               </NavLink>
            }
            {
               accessItems.includes(1) &&   <NavLink to='/transactions'
                                                           className={styles.links} onClick={toggleMenu}
                                                           activeClassName={styles.activeLink}>
                  <i className="icon-briefcasecustom"></i>
                  <span>Транзакции</span>
               </NavLink>
            }
            {
               accessItems.includes(4) &&   <NavLink to='/projects'
                                                           className={styles.links} onClick={toggleMenu}
                                                           activeClassName={styles.activeLink}>
                  <i className="icon-bar-chart"></i>
                  <span>Проекты</span>
               </NavLink>
            }
            {
               accessItems.includes(5) &&   <NavLink to='/members'
                                                           className={styles.links} onClick={toggleMenu}
                                                           activeClassName={styles.activeLink}>
                  <i className="icon-userscustom"></i>
                  <span>Сотрудники</span>
               </NavLink>
            }
            {
               accessItems.includes(6) &&   <NavLink to='/awards'
                                                           className={styles.links} onClick={toggleMenu}
                                                           activeClassName={styles.activeLink}>
                  <i className="icon-outline-receipt-24px-default"></i>
                  <span>Премии</span>
               </NavLink>
            }
            {
               accessItems.includes(9) &&    <NavLink to='/kanban'
                                                            className={styles.links} onClick={toggleMenu}
                                                            activeClassName={styles.activeLink}>
                  <i className="icon-outline-receipt-24px-default"></i>
                  <span>Канбан</span>
               </NavLink>
            }


            <Divider className={styles.divider}/>

         </nav>
      </div>
   );
};



