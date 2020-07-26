import cn     from "classnames";
import React  from 'react';
import styles from './ProjectTable.module.scss'

export const ProjectTableStatus = ({status, projectStatuses}) => {
   return (
      <>
         <span className={cn(styles['stat' + status], styles.status)}>{projectStatuses[status]}</span>
      </>
   );
}

