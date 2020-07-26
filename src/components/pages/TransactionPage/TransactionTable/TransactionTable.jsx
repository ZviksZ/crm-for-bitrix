import cn                                                                    from "classnames";
import React, {useState}                                                     from 'react';
import {connect}                                                             from "react-redux";
import {useSort}                                                             from "../../../../helpers/useSort.hook.js";
import {openAddModalWithData}                                                from "../../../../redux/appReducer.js";
import {downloadAdditionalTransPages, transEnumFilter, updateContractorName} from "../../../../redux/thunk/enumsThunks.js";
import TransactionFilter                                                     from "../../../common/EnumsFilters/TransactionFilter/TransactionFilter.jsx";
import {PeriodForm}                                                          from "../../../common/EnumsForms/PeriodForm/PeriodForm.jsx";
import {PaginationBlock}                                                     from "../../../common/PaginationBlock/PaginationBlock.jsx";
import styles                                                                from './TransactionTable.module.scss'
import {TransactionTableItem}                          from "./TransactionTableItem.jsx";

export const TransactionTable = (props) => {
   const {
      sortedData, sortField,
      sort, onSort, count,
      pages, setItemCount, currentPage, setCurrentPage
   } = useSort(props.enum, 50, props.downloadAdditionalTransPages, props.transFilter)

   const [showFilter, setShowFilter] = useState(false)

   return (
      <>
         <div className={styles.filterBlock}>
            <PeriodForm defPeriod={8} filter={props.transFilter} setFilter={props.transEnumFilter}/>
            <button className="btn btn-filter ml1 mb1" onClick={() => setShowFilter(true)}>
               <span>Фильтр</span>
               {props?.enum?.data?.length > 0 && <span className="count">{props?.enum?.size}</span>}
               <i className="icon-filter-list-default"></i>
            </button>
         </div>

         {showFilter && <TransactionFilter showFilter={showFilter} setShowFilter={setShowFilter}/>}

         {!props?.enum?.data?.length
            ? <p>Нет данных</p>
            : <>
               <div className="table__wrapper">
                  <table className={cn(styles.transactionTable, 'custom-table')}>
                     <thead>
                     <tr>
                        <th onClick={onSort.bind(null, 'date')} className={styles.date}>
                  <span>
                     Дата
                     {sortField === 'date' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'type')} className={styles.typeColumn}>
                  <span>
                     Тип
                     {sortField === 'type' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'amount')} className={styles.budget}>
                  <span>
                     Сумма
                     {sortField === 'amount' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'comment')}>
                  <span>
                     Комментарий
                     {sortField === 'comment' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th>
                        </th>
                     </tr>
                     </thead>
                     <tbody>
                     {
                        sortedData.map(item => <TransactionTableItem updateContractorName={props.updateContractorName} enums={props.allEnums} key={item.id}
                                                                     openAddModalWithData={props.openAddModalWithData} item={item}/>)
                     }
                     </tbody>
                  </table>
               </div>

               <PaginationBlock pagesNum={pages}
                                countOnPage={count}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                setItemCount={setItemCount}
                                withCount={true}/> </>}
      </>
   );
}


let mapStateToProps = (state) => {
   return {
      enum: state.enum.enums.transactionEnum,
      allEnums: state.enum.enums,
      transFilter: state.enum.transFilter
   }
}

export default connect(mapStateToProps, {
   transEnumFilter, downloadAdditionalTransPages, openAddModalWithData, updateContractorName
})(TransactionTable);
