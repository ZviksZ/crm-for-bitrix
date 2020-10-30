import {useState}         from "react";
import * as React         from 'react';
import s                  from '../KanbanPage.module.scss'
import {KanbanItem}       from "./KanbanItem.jsx";
import {KanbanItemHeader} from "./KanbanItemHeader.jsx";

export const KanbanColumn = ({item, type}) => {
   const [openMobile, setOpenMobile] = useState(false);
   return (
      <div className={s.column}>
         <KanbanItemHeader item={item} type={type} setOpenMobile={setOpenMobile}/>

         {
            item?.tasks && item.tasks.map((task, index) => {
               if (!task.id && !task.date) {
                  return ''
               }
               return <KanbanItem key={task.id + task.date + index}
                                  item={task}
                                  type={type}
                                  openMobile={openMobile}/>
            })
         }
      </div>
   );
}

