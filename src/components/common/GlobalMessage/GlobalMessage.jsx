import Alert         from "@material-ui/lab/Alert";
import React         from 'react';
import {useSelector} from "react-redux";
import styles        from './GlobalMessage.module.scss'


/**
 * Глобальное сообщение
 * @param { Object } type - тип алерта (error, success)
 */
export const GlobalMessage = () => {
   const {message, type} = useSelector(state => ({
      message: state.common.globalErrorMessage.message,
      type: state.common.globalErrorMessage.type
   }))

   if (!message) {
      return false
   }

   return (
      <div className={styles.globalMessage}>
         <Alert severity={type}>{message}</Alert>
      </div>
   );
}

