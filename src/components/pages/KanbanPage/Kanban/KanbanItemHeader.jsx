import cn         from "classnames";
import * as React from 'react';
import s          from "../KanbanPage.module.scss";

export const KanbanItemHeader = ({item, type, setOpenMobile}) => {
   let day;
   let timeFact;
   let timePlan;
   let isOvertime = item.timeEstimate > 28800;
   switch (type) {
      case 'pause':
         day = 'Отложенные'
         timeFact = item.fact
         timePlan = item.plan
         break;
      case 'assessment':
         day = 'Оценка'
         timePlan = item.time
         break;
      case 'day':
         day = item.dateText
         timeFact = item.fact
         timePlan = item.plan
         break;
   }

   return (
      <>
         <div className={cn(s.columnHeader, {[s.weekday]: type === 'day'}, {[s.overtime]: isOvertime})} onClick={() => setOpenMobile(prev => !prev)}>
            <div className={s.day}>{day}</div>
            <div className={s.time}>
               {timeFact && <div className={cn(s.finish)}>{timeFact}</div>}
               {timePlan && <div className={cn(s.start)}>{timePlan}</div>}
            </div>
         </div>
      </>
   );
}

