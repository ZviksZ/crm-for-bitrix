import cn                 from "classnames";
import React, {useState}  from 'react';
import {useSort}          from "../../../../helpers/useSortRes.hook.js";
import {numberWithSpace} from "../../../../helpers/utils.js";
import styles             from '../EnumsForms.module.scss'

export const FormHistory = ({history, membersEnum}) => {
   const [showHistory, setShowHistory] = useState(false)
   const {sortedData, sortField, sort, onSort} = useSort(history)

   const showHistoryFn = (e) => {
      e.preventDefault()
      setShowHistory(!showHistory)
   }
   return (
      <>
         <button onClick={showHistoryFn} className={styles.historyBtn}>
            <span>История изменений</span>
            {
               showHistory ? <i className="icon-outline-keyboard-arrow-up-24px-default"></i> : <i className="icon-outline-keyboard-arrow-down-24px-default"></i>
            }
         </button>

         <div className="history-table">
            {
               showHistory && <table className="custom-table">
                  <thead>
                  <tr>
                     <th onClick={onSort.bind(null, 'date')}>
                        <span>
                           Дата
                           {sortField === 'date' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                        </span>
                     </th>
                     <th onClick={onSort.bind(null, 'budget')}>
                        <span>
                           Сумма
                           {sortField === 'budget' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                        </span>
                     </th>
                     <th onClick={onSort.bind(null, 'comment')}>
                        <span>
                           Комментарий
                           {sortField === 'comment' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                        </span>
                     </th>
                     <th onClick={onSort.bind(null, 'author')}>
                        <span>
                           Автор
                           {sortField === 'author' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                        </span>
                     </th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                     sortedData.map((item, index) => {
                        let budget = numberWithSpace(item.budget);
                        let author = membersEnum.find(i => i.id === item.author)?.name || '';

                        return <tr key={index}>
                           <td>{item.date}</td>
                           <td>{budget}</td>
                           <td>{item.comment}</td>
                           <td>{author}</td>
                        </tr>
                     })
                  }
                  </tbody>
               </table>
            }
         </div>
      </>
   );
}

