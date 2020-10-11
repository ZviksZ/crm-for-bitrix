import {useState}           from "react";
import * as React           from 'react';
import {numberWithSpace}    from "../../../../../helpers/utils.js";
import {ProjectTableStatus} from "../../../EnumsPage/ProjectTable/ProjectTableStatus.jsx";
import s                    from "../MPTable.module.scss";
import {MPTableItemThird}   from "./MPTableItemThird.jsx";
import cn                   from "classnames";

export const MPTableItemSecond = ({item, isOpen}) => {
   const [showTasks, setShowTasks] = useState(false);
   return <>
      <tr className={cn({[s.showTableRow]: isOpen},{[s.rotateIcon]: showTasks}, s.projectRow)} onClick={() => setShowTasks(prev => !prev)}>
         <td>
            <div className={s.name}>
               <i className="icon-outline-keyboard-arrow-down-24px-default"></i>
               <span>{item.title}</span>
            </div>
         </td>
         <td className={s.client}>{item.client}</td>
         <td>{numberWithSpace(item.timeFact)}</td>
         <td>{numberWithSpace(item.payment)}</td>
      </tr>
      {
         item.tasks.map(task => <MPTableItemThird isParentOpen={isOpen} isOpen={showTasks} item={task} key={task.id} />)
      }
   </>;
}

