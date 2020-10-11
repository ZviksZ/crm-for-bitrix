import cn                                     from "classnames";
import {useState}                             from "react";
import * as React                             from 'react';
import {numberWithSpace}                      from "../../../../../helpers/utils.js";
import s                                      from '../MPTable.module.scss'
import {MPTableItemSecond} from "./MPTableItemSecond.jsx";

export const MPTableItemFirst = ({item}) => {
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
         <td>{numberWithSpace(item.timeFact)}</td>
         <td>{numberWithSpace(item.payment)}</td>
      </tr>
      {
         item.projects.map(project => <MPTableItemSecond isOpen={showProjects} item={project} key={project.id} />)
      }
   </>;
}

