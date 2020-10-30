import cn                                                                from "classnames";
import React, {useState}                                                 from 'react';
import {connect}                                                         from "react-redux";
import {useSort}                                                         from "../../../../helpers/useSort.hook.js";
import {openProjectMemberForm}                                           from "../../../../redux/enumsReducer.js";
import {downloadAdditionalProjectPages, getGroupInfo, projectEnumFilter} from "../../../../redux/thunk/enumsThunks.js";
import ProjectFilter                                                     from "../../../common/EnumsFilters/ProjectFilter/ProjectFilter.jsx";
import {PeriodForm}                                                      from "../../../common/EnumsForms/PeriodForm/PeriodForm.jsx";
import {PaginationBlock}                                                 from "../../../common/PaginationBlock/PaginationBlock.jsx";
import styles                                              from './ProjectTable.module.scss'
import {ProjectTableItem}                                       from "./ProjectTableItem.jsx";

export const ProjectTable = (props) => {
   const {
      sortedData, sortField,
      sort, onSort, count,
      pages, setItemCount, currentPage, setCurrentPage
   } = useSort(props?.enum || [], props?.projectFilterPeriod?.pageCount || 50, props.downloadAdditionalProjectPages, props.projectFilter)

   const [showFilter, setShowFilter] = useState(false)


   return (
      <>
            <div className={styles.filterBlock}>
               <PeriodForm defPeriod={1}
                           filter={props.projectFilter}
                           isProjectForm={true}
                           projectFilterPeriod={props.projectFilterPeriod}
                           setFilter={props.projectEnumFilter}/>
               <button className="btn btn-filter ml1 mb1" onClick={() => setShowFilter(true)}>
                  <span>Фильтр</span>
                  {props?.enum?.data?.length > 0 && <span className="count">{props?.enum?.size}</span>}
                  <i className="icon-filter-list-default"></i>
               </button>
            </div>



         {showFilter && <ProjectFilter showFilter={showFilter} setShowFilter={setShowFilter}/>}

         {!props?.enum?.data?.length
            ? <p>Нет данных</p>
            : <>
               <div className="table__wrapper">
                  <table className={cn(styles.projectTable, 'custom-table')}>
                        <thead>
                        <tr>
                           <th onClick={onSort.bind(null, 'title', true)} className={styles.projectColumn}>
                     <span>
                        Проект
                        {sortField === 'title' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                     </span>
                           </th>
                           <th onClick={onSort.bind(null, 'client', true)} className={styles.clientColumn}>
                     <span>
                        клиент
                        {sortField === 'client' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                     </span>
                           </th>
                           <th onClick={onSort.bind(null, 'start', true)}>
                     <span>
                        Период
                        {sortField === 'start' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                     </span>
                           </th>
                           <th onClick={onSort.bind(null, 'status', true)}>
                     <span>
                        Стадия
                        {sortField === 'status' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                     </span>
                           </th>
                           <th onClick={onSort.bind(null, 'budget', true)} className="budget">
                     <span>
                        бюджет
                        {sortField === 'budget' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                     </span>
                           </th>
                           <th onClick={onSort.bind(null, 'period', true)} >
                     <span>
                        периодичность
                        {sortField === 'period' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                     </span>
                           </th>
                           <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                           sortedData.map((item) => <ProjectTableItem item={item}
                                                                      getGroupInfo={props.getGroupInfo}
                                                                      key={item.id}
                                                                      groupEnum={props.groupEnum}
                                                                      projectStatuses={props.projectStatuses}
                                                                      openProjectMemberForm={props.openProjectMemberForm}
                           />)
                        }
                        </tbody>
                     </table>

            </div>
               <PaginationBlock pagesNum={pages}
                                      countOnPage={count}
                                      currentPage={currentPage}
                                      setCurrentPage={setCurrentPage}
                                      setItemCount={setItemCount}
                                       projectFilterPeriod={props.projectFilterPeriod}
                                      withCount={true}/>
           </>}


      </>
   );
}


let mapStateToProps = (state) => {
   return {
      enum: state.enum.enums.projectsEnum,
      projectStatuses: state.enum.projectStatuses,
      groupEnum: state.enum.enums.groupEnum,
      projectFilter: state.enum.projectFilter,
      projectFilterPeriod: state.enum.projectFilterPeriod,
   }
}

export default connect(mapStateToProps, {
   downloadAdditionalProjectPages, projectEnumFilter, openProjectMemberForm, getGroupInfo
})(ProjectTable);
