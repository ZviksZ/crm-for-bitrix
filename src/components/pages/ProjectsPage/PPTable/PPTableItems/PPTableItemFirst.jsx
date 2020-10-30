import cn                  from "classnames";
import {useState}          from "react";
import * as React          from 'react';
import {numberWithSpace}   from "../../../../../helpers/utils.js";
import s                   from '../PPTable.module.scss'
import {PPTableItemSecond} from "./PPTableItemSecond.jsx";

export const PPTableItemFirst = ({item}) => {
   const [showProjects, setShowProjects] = useState(false);

   return <>
      <tr className={cn({[s.rotateIcon]: showProjects}, s.clientRow)} onClick={() => setShowProjects(prev => !prev)}>
         <td>
            <div className={s.name}>
               <i className="icon-outline-keyboard-arrow-down-24px-default"></i>
               <span>{item.name}</span>
            </div>
         </td>
         <td>{numberWithSpace(item.budget)}</td>
         <td>{numberWithSpace(item.expenses)}</td>
         <td>{numberWithSpace(item.expensesPeriod)}</td>
         <td>{numberWithSpace(item.rest)}</td>
         <td></td>
         <td>{numberWithSpace(item.cost)}</td>
         <td>{numberWithSpace(item.paid)}</td>
         <td>{numberWithSpace(item.profit)}</td>
         <td>{numberWithSpace(item.profitPercent)}</td>
      </tr>
      {
         showProjects && item.projects.map(project => <PPTableItemSecond isOpen={showProjects} item={project} key={project.id} />)
      }
   </>;
}

