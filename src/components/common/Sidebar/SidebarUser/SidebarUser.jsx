import Avatar            from "@material-ui/core/Avatar";
import Divider           from "@material-ui/core/Divider";
import cn                from "classnames";
import React, {useState} from 'react';
import {OutsideAlerter}  from "../../../hoc/OutsideAlerter.jsx";
import styles            from '../Sidebar.module.scss'
import {SidebarUserMenu} from "./SidebarUserMenu.jsx";

export const SidebarUser = ({name, img, logoutUser}) => {
   const [menuOpen, setMenuOpen] = useState(false)

   return (
      <div className={styles.sidebarUser}>
         <Avatar alt="Remy Sharp" src={img} className={styles.sidebarUserAvatar}/>
         <OutsideAlerter onOutside={() => setMenuOpen(false)}>
            <div className={cn({[styles.sidebarUserNameOpen]: menuOpen}, styles.sidebarUserName)} onClick={() => setMenuOpen(!menuOpen)}>
               <span className={styles.userName}>{name}</span>
               {
                  menuOpen ? <i className='icon-outline-keyboard-arrow-up-24px-default'></i> : <i className='icon-outline-keyboard-arrow-down-24px-default'></i>

               }
               <SidebarUserMenu menuOpen={menuOpen} logoutUser={logoutUser}/>
            </div>
         </OutsideAlerter>
         <Divider className={styles.sidebarUserDivider}/>
      </div>
   );
}

