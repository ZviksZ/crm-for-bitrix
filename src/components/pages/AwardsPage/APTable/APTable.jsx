import cn                                        from "classnames";
import * as React                                from "react";
import {useEffect, useState}                     from "react";
import {connect}                                 from "react-redux";
import {getDatePeriod}                           from "../../../../helpers/getDatePeriod.js";
import {useSort}                                 from "../../../../helpers/useSortRes.hook.js";
import {getAwardsData, getAwardsFilter}          from "../../../../redux/membersReducer.js";
import {getAwardsProjectsSize, getAwardsSummary} from "../../../../redux/selectors/membersSelectors.js";
import {getProjectsClientsSize}                  from "../../../../redux/selectors/projectsSelectors.js";
import AwardsFilter                              from "../../../common/AwardsFilter/AwardsFilter.jsx";
import {PeriodForm}                              from "../../../common/EnumsForms/PeriodForm/PeriodForm.jsx";
import {Loader}                                  from "../../../common/Loader/Loader.jsx";

import styles             from "./APTable.module.scss";
import {APTableItemFirst} from "./APTableItems/APTableItemFirst.jsx";

const APTable = (props) => {
   const {sortedData, sortField, sort, onSort} = useSort(props?.awards?.data?.awards || [])

   const [showFilter, setShowFilter] = useState(false)


   useEffect(() => {
      if (props.isEnumsLoaded) {
         let {dateFrom, dateTo} = getDatePeriod(8);
         props.getAwardsData({
            member: null,
            project: null,
            start: dateFrom,
            finish: dateTo,
            page: 1
         })
      }
   }, [props.isEnumsLoaded, props.getAwardsData])

   return (
      <>
         <div className="filterBlock">
            <PeriodForm defPeriod={8} filter={props.awardsFilter} setFilter={props.getAwardsFilter}/>
            <button className="btn btn-filter ml1 mb1" onClick={() => setShowFilter(true)}>
               <span>Фильтр</span>
               {props?.awards?.data?.awards.length > 0 && <span className="count">{props.size}</span>}
               <i className="icon-filter-list-default"></i>
            </button>
         </div>


         {showFilter && <AwardsFilter showFilter={showFilter} setShowFilter={setShowFilter}/>}
         {
            !props?.awards ? <div className="table__wrapper mt3"><Loader/></div> : <>
               <div className="table__wrapper">
                  <table className={cn(styles.projectClientTable, 'custom-table fixed-table')}>
                     <thead>
                     <tr>
                        <th onClick={onSort.bind(null, 'title', false, true)}>
                  <span>
                     сотрудник / проект
                     {sortField === 'title' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'budget', true, true)}>
                  <span>
                     бюджет
                     {sortField === 'budget' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'expenses', true, true)}>
                  <span>
                     Расходы, всего
                     {sortField === 'expenses' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'share', true, true)}>
                  <span>
                    Участие, руб
                     {sortField === 'share' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'rest', true, true)}>
                  <span>
                     Остаток бюджета
                     {sortField === 'rest' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'sharePercent', true, true)}>
                  <span>
                     Участие, %
                     {sortField === 'sharePercent' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'award', true, true)}>
                  <span>
                     Премия, руб
                     {sortField === 'award' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'awardAdditional', true, true)}>
                  <span>
                     Доп премия
                     {sortField === 'awardAdditional' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'payoff', true, true)}>
                  <span>
                     К выплате:
                     {sortField === 'payoff' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>

                     </tr>
                     </thead>
                     <tbody>
                     {
                        sortedData.map((item, index) => <APTableItemFirst item={item} key={item.id}/>)
                     }
                     </tbody>
                  </table>
                  <table className="custom-table table-summary fixed-table mt3">
                     <tbody>
                     <tr>
                        <td>ИТОГО</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{props.awardsSummary.award}</td>
                        <td>{props.awardsSummary.awardAdditional}</td>
                        <td>{props.awardsSummary.payoff}</td>
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
      awards: state.members.awards,
      awardsFilter: state.members.awardsFilter,
      size: getAwardsProjectsSize(state),
      awardsSummary: getAwardsSummary(state)
   }
}

export default connect(mapStateToProps, {getAwardsData, getAwardsFilter})(APTable);

