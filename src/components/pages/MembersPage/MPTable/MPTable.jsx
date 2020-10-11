import cn                                 from "classnames";
import {useEffect}                        from "react";
import * as React                         from "react";
import {useState}                         from "react";
import {connect}                          from "react-redux";
import {getDatePeriod}                    from "../../../../helpers/getDatePeriod.js";
import {useSort}                          from "../../../../helpers/useSortRes.hook.js";
import {getMembersData, getMembersFilter} from "../../../../redux/membersReducer.js";
import {getMembersSummary}                from "../../../../redux/selectors/membersSelectors.js";
import {getProjectsClientsSize}           from "../../../../redux/selectors/projectsSelectors.js";
import {PeriodForm}                       from "../../../common/EnumsForms/PeriodForm/PeriodForm.jsx";
import {Loader}                           from "../../../common/Loader/Loader.jsx";
import MembersFilter                      from "../../../common/MembersFilter/MembersFilter.jsx";
import {PaginationBlock}                  from "../../../common/PaginationBlock/PaginationBlock.jsx";

import styles             from "./MPTable.module.scss";
import {MPTableItemFirst} from "./MPTableItems/MPTableItemFirst.jsx";

const MPTable = (props) => {

   const {sortedData, sortField, sort, onSort} = useSort(props?.members?.data?.members || [])

   const [showFilter, setShowFilter] = useState(false)


   useEffect(() => {
      if (props.isEnumsLoaded) {
         let {dateFrom, dateTo} = getDatePeriod(8);
         props.getMembersData({
            client: null,
            name: null,
            budgetMin: null,
            budgetMax: null,
            start: dateFrom,
            finish: dateTo,
            page: 1
         })
      }
   }, [props.isEnumsLoaded])
  /* if (!props?.members) {
      return <div className="table__wrapper mt3"><Loader/></div>
   }*/

   return (
      <>
        <div className="filterBlock">
            <PeriodForm defPeriod={8} filter={props.membersFilter} setFilter={props.getMembersFilter}/>
            <button className="btn btn-filter ml1 mb1" onClick={() => setShowFilter(true)}>
               <span>Фильтр</span>
               {props?.members?.data?.members.length > 0 && <span className="count">{props.members.data.members.length}</span>}
               <i className="icon-filter-list-default"></i>
            </button>
         </div>


         {showFilter && <MembersFilter showFilter={showFilter} setShowFilter={setShowFilter}/>}
         {
            !props?.members ? <div className="table__wrapper mt3"><Loader/></div> : <>
               <div className="table__wrapper">
                  <table className={cn(styles.projectClientTable, 'custom-table fixed-table-members')}>
                     <thead>
                     <tr>
                        <th onClick={onSort.bind(null, 'title', false, true)}>
                  <span>
                     сотрудник / проект
                     {sortField === 'title' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th>
                  <span>
                     клиент
                     {sortField === 'client' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'timeFact', true, true)}>
                  <span>
                    Время (ч)
                     {sortField === 'timeFact' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                        <th onClick={onSort.bind(null, 'payment', true, true)}>
                  <span>
                     к оплате (₽)
                     {sortField === 'payment' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                        </th>
                     </tr>
                     </thead>
                     <tbody>
                     {
                        sortedData.map((item, index) => <MPTableItemFirst item={item} key={item.id}/>)
                     }
                     </tbody>
                  </table>
                  <table className="custom-table table-summary fixed-table-members mt3">
                     <tbody>
                        <tr>
                           <td>ИТОГО</td>
                           <td></td>
                           <td>{props.membersSummary.timeFact}</td>
                           <td>{props.membersSummary.payment}</td>
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
      members: state.members.members,
      membersFilter: state.members.membersFilter,
      size: getProjectsClientsSize(state),
      membersSummary: getMembersSummary(state)
   }
}

export default connect(mapStateToProps, {getMembersData, getMembersFilter})(MPTable);

