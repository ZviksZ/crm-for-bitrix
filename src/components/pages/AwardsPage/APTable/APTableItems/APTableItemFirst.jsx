import cn                  from "classnames";
import {useState}          from "react";
import * as React          from 'react';
import {numberWithSpace}   from "../../../../../helpers/utils.js";
import s                   from '../APTable.module.scss'
import {APTableItemSecond} from "./APTableItemSecond.jsx";

export const APTableItemFirst = ({item}) => {
   const [showProjects, setShowProjects] = useState(false);

   return <>
      <tr className={cn({[s.rotateIcon]: showProjects}, s.clientRow)} onClick={() => setShowProjects(prev => !prev)}>
         <td>
            <div className={s.name}>
               <i className="icon-outline-keyboard-arrow-down-24px-default"></i>
               <span>{item.title}</span>
            </div>
         </td>
         <td></td>
         <td></td>
         <td></td>
         <td></td>
         <td></td>
         <td></td>
         <td></td>
         <td></td>
      </tr>
      {
         showProjects && item.projects.map(project => <APTableItemSecond isOpen={showProjects} item={project} key={project.id} />)
      }
   </>;
}

