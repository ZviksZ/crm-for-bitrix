import {useState}           from "react";
import * as React           from 'react';
import {numberWithSpace}    from "../../../../../helpers/utils.js";
import {ProjectTableStatus} from "../../../EnumsPage/ProjectTable/ProjectTableStatus.jsx";
import s                    from "../APTable.module.scss";
import cn                   from "classnames";

export const APTableItemSecond = ({item, isOpen}) => {
   const [showTasks, setShowTasks] = useState(false);
   return <>
      <tr className={cn({[s.showTableRow]: isOpen},{[s.rotateIcon]: showTasks}, s.projectRow)} onClick={() => setShowTasks(prev => !prev)}>
         <td>
            <div className={s.name}>
               <span>{item.title}</span>
            </div>
         </td>
         <td>{numberWithSpace(item.budget)}</td>
         <td>{numberWithSpace(item.expenses)}</td>
         <td>{numberWithSpace(item.share)}</td>
         <td>{numberWithSpace(item.rest)}</td>
         <td>{numberWithSpace(item.sharePercent)}</td>
         <td>{numberWithSpace(item.award)}</td>
         <td>{numberWithSpace(item.awardAdditional)}</td>
         <td>{numberWithSpace(item.payoff)}</td>
      </tr>
   </>;
}

