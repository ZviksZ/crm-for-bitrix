import cn                                     from "classnames";
import React                                  from 'react';
import {connect}                              from "react-redux";
import {useSort}                              from "../../../../helpers/useSortRes.hook.js";
import {openExpenseForm}                      from "../../../../redux/enumsReducer.js";
import {deleteExpenseItem, updateExpenseItem} from "../../../../redux/thunk/enumsThunks.js";
import styles                                 from "./ExpenseTable.module.scss";
import {ExpenseTableItem}                     from "./ExpenseTableItem.jsx";

export const ExpenseTable = (props) => {
   const {sortedData, sortField, sort, onSort} = useSort(props.enum)



   return (
      <>
         <div className={styles.btnWrap}>
            <button className="btn btn-blue " onClick={() => props.openExpenseForm({}, {})}>Добавить статью</button>
         </div>
         {
            props.enum.length ? <div className="table__wrapper">
               <table className={cn(styles.projectTable, 'custom-table')}>
                  <thead>
                  <tr>
                     <th onClick={onSort.bind(null, 'title', false)}>
                  <span>
                     Название
                     {sortField === 'title' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                     </th>
                     <th className={styles.expenseColumnFixed}>
                        <span>Показывать в списке категорий</span>
                     </th>
                     <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                     sortedData.map((item) => {
                        if (item.parent === 0) {
                           return <ExpenseTableItem updateExpenseItem={props.updateExpenseItem} sortedData={sortedData} key={item.id} item={item} openExpenseForm={props.openExpenseForm}/>
                        }
                     })
                  }
                  </tbody>
               </table>
            </div> : <p>Данных пока нет</p>
         }

      </>
   );
}

let mapStateToProps = (state) => {
   return {
      enum: state.enum.enums.expenseItemEnum
   }
}

export default connect(mapStateToProps, {openExpenseForm, updateExpenseItem,deleteExpenseItem})(ExpenseTable);

