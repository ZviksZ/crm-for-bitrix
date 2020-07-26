import CircularProgress from "@material-ui/core/CircularProgress";
import React            from 'react';
import styles           from './Loader.module.scss'

export const Loader = (props) => {
   return (
      <div className={styles.loader}>
         <CircularProgress/>
      </div>
   );
}

