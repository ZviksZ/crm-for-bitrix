import * as React           from 'react';
import {numberWithSpace}    from "../../../../../helpers/utils.js";
import {ProjectTableStatus} from "../../../EnumsPage/ProjectTable/ProjectTableStatus.jsx";
import s                    from "../PPTable.module.scss";
import cn                from "classnames";

export const PPTableItemThird = ({item, projectStatuses, isOpen, isParentOpen}) => {

   return (
      <tr className={cn({[s.showTableRow]: isOpen && isParentOpen}, s.taskRow)}>
         <td className="open-link">
            <div className={s.name}>
               <a href={item.link} onClick={event => event.stopPropagation()} target="_blank" rel="noopener noreferrer">{item.title} <i className="icon-open-in-new-default"></i></a>
            </div>
         </td>
         <td></td>
         <td>{numberWithSpace(item.expenses)}</td>
         <td>{numberWithSpace(item.expensesPeriod)}</td>
         <td></td>
         <td>{item?.status ? <ProjectTableStatus status={item.status} projectStatuses={projectStatuses}/> : ''}</td>
         <td></td>
         <td></td>
         <td></td>
         <td></td>
      </tr>
   );
}

