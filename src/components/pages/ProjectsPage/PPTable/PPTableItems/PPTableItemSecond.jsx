import {useState}           from "react";
import * as React           from 'react';
import {useSelector}        from "react-redux";
import {numberWithSpace}    from "../../../../../helpers/utils.js";
import {ProjectTableStatus} from "../../../EnumsPage/ProjectTable/ProjectTableStatus.jsx";
import s                    from "../PPTable.module.scss";
import {PPTableItemThird}   from "./PPTableItemThird.jsx";
import cn                   from "classnames";

export const PPTableItemSecond = ({item, isOpen}) => {
   const [showTasks, setShowTasks] = useState(false);
   const {projectStatuses} = useSelector(state =>  ({
      projectStatuses: state.enum.projectStatuses
   }));
   return <>
      <tr className={cn({[s.showTableRow]: isOpen},{[s.rotateIcon]: showTasks}, s.projectRow)} onClick={() => setShowTasks(prev => !prev)}>
         <td>
            <div className={s.name}>
               <i className="icon-outline-keyboard-arrow-down-24px-default"></i>
               <span>{item.title}</span>
            </div>
         </td>
         <td>{numberWithSpace(item.budget)}</td>
         <td>{numberWithSpace(item.expenses)}</td>
         <td>{numberWithSpace(item.expensesPeriod)}</td>
         <td>{numberWithSpace(item.rest)}</td>
         <td><ProjectTableStatus status={item.status} projectStatuses={projectStatuses}/></td>
         <td>{numberWithSpace(item.cost)}</td>
         <td>{numberWithSpace(item.paid)}</td>
         <td>{numberWithSpace(item.profit)}</td>
         <td>{numberWithSpace(item.profitPercent)}</td>
      </tr>
      {
         item?.tasks && item.tasks.map(task => <PPTableItemThird isParentOpen={isOpen} isOpen={showTasks} item={task} key={task.id} projectStatuses={projectStatuses}/>)
      }
      {
         item?.transactions && item.transactions.map(transaction => <PPTableItemThird isParentOpen={isOpen} isOpen={showTasks} item={transaction} projectStatuses={projectStatuses} key={transaction.id}/>)
      }
      {
         item?.indirect && <tr className={cn({[s.showTableRow]: showTasks && isOpen}, s.taskRow)}>
            <td >
               <div className={s.name}>
                  <span> Косвенные расходы</span>
               </div>
            </td>
            <td></td>
            <td>{item?.indirect?.expenses}</td>
            <td>{item?.indirect?.expensesPeriod}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
         </tr>
      }

   </>;
}

