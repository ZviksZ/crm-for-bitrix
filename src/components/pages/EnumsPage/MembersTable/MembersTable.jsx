import cn                       from "classnames";
import React                    from 'react';
import {connect}                from "react-redux";
import {useSort}                from "../../../../helpers/useSortRes.hook.js";
import {numberWithSpace}        from "../../../../helpers/utils.js";
import { openProjectMemberForm} from "../../../../redux/enumsReducer.js";
import {membersEnumFilter}      from "../../../../redux/thunk/enumsThunks.js";
import styles                   from './MembersTable.module.scss'

const MembersTable = (props) => {
   const {sortedData, sortField, sort, onSort} = useSort(props.enum)

   if (!props.enum.length) {
      return <p>Нет данных</p>
   }

   return (
      <>
         {/*<PeriodForm setFilter={props.membersEnumFilter}/>*/}
         <div className="table__wrapper">
            <table className={cn(styles.projectTable, 'custom-table')}>
               <thead>
               <tr>
                  <th onClick={onSort.bind(null, 'unit')}>
                  <span>
                     подразделение
                     {sortField === 'unit' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                  </th>
                  <th onClick={onSort.bind(null, 'name')}>
                  <span>
                     Сотрудник
                     {sortField === 'name' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                  </th>
                  <th onClick={onSort.bind(null, 'budget')}  className="budget">
                  <span>
                     Стоимость часа
                     {sortField === 'budget' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                  </th>
                  <th></th>
               </tr>
               </thead>
               <tbody>
               {
                  sortedData.map((item) => {
                     let budget = numberWithSpace(item.budget)

                     return (
                        <tr key={item.id} onClick={() => props.openProjectMemberForm(item, 'changeMemberPrice', 'Изменить ставку')}>
                           <td>
                              {item.unit}
                           </td>
                           <td className="open-link">
                              <a href={item.link} onClick={event => event.stopPropagation()} target="_blank" rel="noopener noreferrer">{item.name} <i className="icon-open-in-new-default"></i></a>

                           </td>
                           <td className="budget" >

                              {budget} &#8381;
                           </td>
                           <td className="hoverText hoverTextBig">
                              <span><i className="icon-baseline-edit-24px-default"></i> Изменить ставку</span>
                           </td>
                        </tr>
                     )
                  })
               }
               </tbody>
            </table>
         </div>



      </>
   )
}


let mapStateToProps = (state) => {
   return {
      enum: state.enum.enums.membersEnum
   }
}

export default connect(mapStateToProps, {membersEnumFilter, openProjectMemberForm})(MembersTable);
