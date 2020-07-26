import Button            from "@material-ui/core/Button";
import React, {useState} from 'react';
import {OutsideAlerter}  from "../../../hoc/OutsideAlerter.jsx";
import styles            from "../Navbar.module.scss";

export const NavbarMessages = ({messages}) => {
   const [showMessages, setShowMessages] = useState(false)

   return (
      <div className={styles.messages}>
      <OutsideAlerter onOutside={() => setShowMessages(false)}>
         <>
            <Button color="inherit" onClick={() => setShowMessages(!showMessages)}>
               <i className="icon-outline-drafts-24px-default"></i>
               {messages && <span className={styles.messages__numb}>{messages.length}</span>}

            </Button>
            {/*{
               showMessages && <div>1111</div>
            }*/}
         </>
      </OutsideAlerter>
      </div>
   );
}

