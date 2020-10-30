import cn                 from "classnames";
import * as React         from 'react';
import s                  from '../KanbanPage.module.scss'

export const KanbanItem = ({item, type, openMobile}) => {
   let isOvertime = +item.dayLimitSecond < +item.dayTimeSecond;
   let isDelegate = +item.userId !== +item.responsibleId;

   return (
      <a href={`https://internetlab.bitrix24.ru/company/personal/user/${item.userId}/tasks/task/view/${item.id}/`}
         className={cn({
            [s.columnItemShow]: openMobile},
            {[s.overtime]: isOvertime},
            {[s.nextDay]: item.next},
            {[s.prevDay]: item.prev},
            {[s.deferred]: type === 'pause'},
            s.columnItem)}
         target={'_blank'}
         rel="noopener noreferrer">
         <div className={s.columnItemHeader}>
            <div className={s.photo}
                 style={{backgroundImage: `url(${item.creator})`}}></div>
            <div className={s.headerInfo}>
               <div className={s.deadline}>{item.deadline}</div>
               <div className={cn({[s.finish]: item.status == '5'},s.time)}>{

                  item.timeSpentInLogs ? <>{item.timeSpentInLogs} {item.timeEstimate && `/ ${item.timeEstimate}`}</>
                        : <>{item.timeEstimate && `${item.timeEstimate}`}</>
               }
               </div>
            </div>
         </div>
         <div className={s.columnItemInfo}>
            <div className={s.project}>{item.group}</div>
            {
               type === 'day' &&  <div className={s.sometime}>
                  <div className={s.time}>{item.dayTime} {item.dayLimit && `/ ${item.dayLimit}`}</div>
               </div>
            }

         </div>
         <div className={s.columnItemName}>
            {item.title}
         </div>
         {
            isDelegate && <div className={s.taskDelegate}>
               <div className={s.from}>
                  <div className={s.photo}
                       style={{backgroundImage: `url(${item.userPhoto}`}}></div>
               </div>
               <div className={s.to}>
                  <div className={s.photo}
                       style={{backgroundImage: `url(${item.responsible})`}}></div>
               </div>
            </div>
         }

      </a>
   );
}

