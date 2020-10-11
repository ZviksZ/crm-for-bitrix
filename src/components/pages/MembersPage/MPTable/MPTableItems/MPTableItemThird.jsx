import * as React           from 'react';
import {numberWithSpace}    from "../../../../../helpers/utils.js";
import {ProjectTableStatus} from "../../../EnumsPage/ProjectTable/ProjectTableStatus.jsx";
import s                    from "../MPTable.module.scss";
import cn                   from "classnames";

export const MPTableItemThird = ({item, isOpen, isParentOpen}) => {

   return (
      <tr className={cn({[s.showTableRow]: isOpen && isParentOpen}, s.taskRow)}>
         <td className="open-link">
            <div className={s.name}>
               <a href={item.link} onClick={event => event.stopPropagation()} target="_blank" rel="noopener noreferrer">{item.title} <i className="icon-open-in-new-default"></i></a>
            </div>
         </td>
         <td></td>
         <td>{numberWithSpace(item.timeFact)}</td>
         <td>{numberWithSpace(item.payment)}</td>
      </tr>
   );
}

