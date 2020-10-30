import cn                                           from "classnames";
import {useEffect}                                  from "react";
import * as React                                   from "react";
import {useState}                                   from "react";
import {connect}                                    from "react-redux";
import {getDatePeriod}                              from "../../../../helpers/getDatePeriod.js";
import {useSort}                                    from "../../../../helpers/useSortRes.hook.js";
import {getProjectClient, getProjectClientFilter}   from "../../../../redux/projectsReducer.js";
import {getProjectsClientsSize, getProjectsSummary} from "../../../../redux/selectors/projectsSelectors.js";
import {PeriodForm}                                 from "../../../common/EnumsForms/PeriodForm/PeriodForm.jsx";
import {Loader}                                     from "../../../common/Loader/Loader.jsx";
import {PaginationBlock}                            from "../../../common/PaginationBlock/PaginationBlock.jsx";
import ProjectClientFilter                          from "../../../common/ProjectClientFilter/ProjectClientFilter.jsx";

import styles                                     from "./PPTable.module.scss";
import {PPTableItemFirst}                         from "./PPTableItems/PPTableItemFirst.jsx";

const PPTable = (props) => {
   const {sortedData, sortField, sort, onSort} = useSort(props?.projects?.data?.clients || [], false, true)

   const [showFilter, setShowFilter] = useState(false)

   useEffect(() => {
      if (props.isEnumsLoaded) {
         let {dateFrom, dateTo} = getDatePeriod(8);

         props.getProjectClient({
            client: null,
            name: null,
            budgetMin: null,
            budgetMax: null,
            start: dateFrom,
            finish: dateTo,
            page: 1
         })
      }

   }, [props.isEnumsLoaded, props.getProjectClient])

   return (
      <>
        <div className="filterBlock">
            <PeriodForm defPeriod={8} filter={props.projectsFilter} setFilter={props.getProjectClientFilter}/>
            <button className="btn btn-filter ml1 mb1" onClick={() => setShowFilter(true)}>
               <span>Фильтр</span>
               {props?.projects?.data?.clients.length > 0 && <span className="count">{props.size}</span>}
               <i className="icon-filter-list-default"></i>
            </button>
         </div>


         {showFilter && <ProjectClientFilter showFilter={showFilter} setShowFilter={setShowFilter}/>}
         {
            !props?.projects ? <div className="table__wrapper mt3"><Loader/></div> : <>
               <div className="table__wrapper">
                  <table className={cn(styles.projectClientTable, 'custom-table fixed-table')}>
                     <thead>
                     <tr>
                        <th onClick={onSort.bind(null, 'title', false, true)}>
                  <span>
                     Название
                     {sortField === 'title' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'budget', true, true)}>
                  <span>
                     Бюджет
                     {sortField === 'budget' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'expenses', true, true)}>
                  <span>
                     Затраты (всего)
                     {sortField === 'expenses' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'expensesPeriod', true, true)}>
                  <span>
                    Затраты (период)
                     {sortField === 'expensesPeriod' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'rest', true, true)}>
                  <span>
                     Остаток (всего)
                     {sortField === 'rest' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th>
                  <span>
                     Готовность
                     {sortField === 'balance' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'cost', true, true)}>
                  <span>
                     Стоимость
                     {sortField === 'cost' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'paid', true, true)}>
                  <span>
                     Оплачено
                     {sortField === 'paid' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'profit', true, true)}>
                  <span>
                     Прибыль, ₽
                     {sortField === 'profit' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'profitPercent', true, true)}>
                  <span>
                     Прибыль, %
                     {sortField === 'profitPercent' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>

                     </tr>
                     </thead>
                     <tbody>
                     {
                        sortedData.map((item, index) => <PPTableItemFirst item={item} key={item.id}/>)
                     }
                     </tbody>
                  </table>
                  <table className="custom-table table-summary fixed-table mt3">
                     <tbody>
                        <tr>
                           <td>ИТОГО</td>
                           <td>{props.projectsSummary.budget}</td>
                           <td>{props.projectsSummary.expenses}</td>
                           <td>{props.projectsSummary.expensesPeriod}</td>
                           <td>{props.projectsSummary.rest}</td>
                           <td></td>
                           <td>{props.projectsSummary.cost}</td>
                           <td>{props.projectsSummary.paid}</td>
                           <td>{props.projectsSummary.profit}</td>
                           <td></td>
                        </tr>
                     </tbody>

                  </table>
               </div>
               {/*<PaginationBlock pagesNum={pages}
                                countOnPage={count}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                setItemCount={setItemCount}
                                withCount={true}/>*/}


            </>
         }
      </>
   );
}

let mapStateToProps = (state) => {
   return {
      isEnumsLoaded: state.common.isEnumsLoaded,
      projects: state.projects.projectsClient,
      projectsFilter: state.projects.projectsClientFilter,
      size: getProjectsClientsSize(state),
      projectsSummary: getProjectsSummary(state)
   }
}

export default connect(mapStateToProps, {getProjectClient, getProjectClientFilter})(PPTable);

