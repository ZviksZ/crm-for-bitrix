import {useEffect}                from "react";
import * as React                 from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getKanbanData}            from "../../../../redux/membersReducer.js";
import {getSortedMembers}         from "../../../../redux/selectors/enumsSelectors.js";
import {Loader}                   from "../../../common/Loader/Loader.jsx";
import s                          from '../KanbanPage.module.scss'
import {KanbanColumn}             from "./KanbanColumn.jsx";
import {KanbanHeader}             from "./KanbanHeader.jsx";

export const Kanban = () => {
   const dispatch = useDispatch()
   const isEnumsLoaded = useSelector(state => state.common.isEnumsLoaded)
   const kanbanData = useSelector(state => state.members.kanban)
   const members = useSelector(getSortedMembers)



   useEffect(() => {
      if (isEnumsLoaded) {
         dispatch(getKanbanData())
      }
   }, [isEnumsLoaded])


   return (
      <>
         <div className="filterBlock filter-block-with-title">
            <h1 className="h1">
               Канбан
            </h1>
            <KanbanHeader members={members}/>
         </div>
         {
            !kanbanData ? <div className="table__wrapper mt3"><Loader/></div> : <>
               <div className={s.kanbanBoard}>
                  <div className={s.kanbanWrapper}>
                     {
                        kanbanData.days && Object.keys(kanbanData.days).map(item => <KanbanColumn
                           key={item}
                           item={kanbanData.days[item]}
                           type={'day'}/>)
                     }
                     {kanbanData.pause && <KanbanColumn
                        key={'kanbanPause'}
                        item={kanbanData.pause}
                        type={'pause'}/>}
                     {kanbanData.assessment && <KanbanColumn
                        key={'kanbanAssessment'}
                        item={kanbanData.assessment}
                        type={'assessment'}/>}
                  </div>

               </div>
            </>
         }
      </>
   );
}

