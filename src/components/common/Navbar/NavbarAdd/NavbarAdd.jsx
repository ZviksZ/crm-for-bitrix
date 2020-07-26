import Button            from "@material-ui/core/Button";
import React, {useState} from 'react';
import {OutsideAlerter}  from "../../../hoc/OutsideAlerter.jsx";
import cn                from "classnames";
import styles            from '../Navbar.module.scss'
import {NavbarAddMenu}   from "./NavbarAddMenu.jsx";

export const NavbarAdd = ({clickHandler}) => {
   const [showMenu, setShowMenu] = useState(false)

   return (
      <div className={styles.navbarAdd}>
         <OutsideAlerter onOutside={() => setShowMenu(false)}>
            <>
               <Button variant="contained"
                       color="primary"
                       onClick={() => setShowMenu(!showMenu)}
                       className={cn({[styles.sidebarOpen]: showMenu},styles.addBtn, 'btn', 'btn-green')}>
                  <span className={styles.addBtnText}>Добавить</span>
                  <i className="icon-add-default"></i>
               </Button>
               <NavbarAddMenu showMenu={showMenu} setShowMenu={setShowMenu} clickHandler={clickHandler}/>
            </>
         </OutsideAlerter>
      </div>

   );
}

