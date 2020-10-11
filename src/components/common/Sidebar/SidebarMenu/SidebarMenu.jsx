import Divider   from "@material-ui/core/Divider";
import cn        from "classnames";
import React     from 'react'
import styles    from '../Sidebar.module.scss'
import {NavLink} from 'react-router-dom'

export const SidebarMenu = ({toggleMenu, logoutUser}) => {

   return (
      <div className={cn({[styles.sidebarOpen]: true}, styles.sidebarNav)}>
         <nav>
            <NavLink to='/' className={styles.links} onClick={toggleMenu}
                     activeClassName={styles.activeLink}>
               <i className="icon-outline-home-24px-default"></i>
               <span>Главная</span>
            </NavLink>
            {/* <NavLink to='/money'
                     className={styles.links} onClick={toggleMenu}
                     activeClassName={styles.activeLink}>
               <i className="icon-briefcasecustom"></i>
               <span>Деньги</span>
            </NavLink>
            <NavLink to='/projects'
                     className={styles.links} onClick={toggleMenu}
                     activeClassName={styles.activeLink}>
               <i className="icon-bar-chart"></i>
               <span>Проекты</span>
            </NavLink>
            <NavLink to='/members'
                     className={styles.links} onClick={toggleMenu}
                     activeClassName={styles.activeLink}>
               <i className="icon-userscustom"></i>
               <span>Сотрудники</span>
            </NavLink>
            <NavLink to='/tasks'
                     className={styles.links} onClick={toggleMenu}
                     activeClassName={styles.activeLink}>
               <i className="icon-access-time-default"></i>
               <span>Задачи</span>
            </NavLink>*/}
            <NavLink to='/enums'
                     className={styles.links} onClick={toggleMenu}
                     activeClassName={styles.activeLink}>
               <i className="icon-outline-calendar-today-24px-default"></i>
               <span>Справочники</span>
            </NavLink>
            <NavLink to='/transactions'
                     className={styles.links} onClick={toggleMenu}
                     activeClassName={styles.activeLink}>
               <i className="icon-briefcasecustom"></i>
               <span>Транзакции</span>
            </NavLink>

            <NavLink to='/projects'
                     className={styles.links} onClick={toggleMenu}
                     activeClassName={styles.activeLink}>
               <i className="icon-bar-chart"></i>
               <span>Проекты</span>
            </NavLink>

            <NavLink to='/members'
                     className={styles.links} onClick={toggleMenu}
                     activeClassName={styles.activeLink}>
               <i className="icon-userscustom"></i>
               <span>Сотрудники</span>
            </NavLink>

            <NavLink to='/awards'
                     className={styles.links} onClick={toggleMenu}
                     activeClassName={styles.activeLink}>
               <i className="icon-outline-receipt-24px-default"></i>
               <span>Премии</span>
            </NavLink>

           {/* <NavLink to='/demo-graph'
                     className={styles.links} onClick={toggleMenu}
                     activeClassName={styles.activeLink}>
               <i className="icon-outline-contact-support-24px-default"></i>
               <span>Демо графиков</span>
            </NavLink>
*/}
            <Divider className={styles.divider}/>

            {/* <NavLink to='/sales' onClick={toggleMenu}
                     className={cn(styles.links, styles.linksGray)}
                     activeClassName={styles.activeLink}>
               <i className="icon-outline-receipt-24px-default"></i>
               <span>Продажи</span>
            </NavLink>
            <NavLink to='/support' onClick={toggleMenu}
                     className={cn(styles.links, styles.linksGray)}
                     activeClassName={styles.activeLink}>
               <i className="icon-outline-contact-support-24px-default"></i>
               <span>Поддержка</span>
            </NavLink>
            <NavLink to='/documents' onClick={toggleMenu}
                     className={cn(styles.links, styles.linksGray)}
                     activeClassName={styles.activeLink}>
               <i className="icon-outline-calendar-today-24px-default"></i>
               <span>Документы</span>
            </NavLink>*/}
            {/*<NavLink to='/' onClick={logoutUser} className={cn(styles.links, styles.linksGray)}
                     activeClassName={styles.activeLink}>
               <i className="icon-outline-keyboard-arrow-left-24px-default"></i>
               <span>Выйти</span>
            </NavLink>*/}
            {/*<a onClick={logoutUser} className={cn(styles.links, styles.linksGray)} >
               <i className="icon-outline-keyboard-arrow-left-24px-default"></i>
               <span>Выйти</span>
            </a>*/}
         </nav>
      </div>
   );
};



