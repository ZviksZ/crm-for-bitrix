import CircularProgress from "@material-ui/core/CircularProgress";
import cn               from "classnames";
import React            from 'react';
import styles           from './Loader.module.scss'

export const Loader = (props) => {
   return (
      <div className={cn(styles.loader, 'custom-loader')}>
         <CircularProgress/>
      </div>
   );
}

