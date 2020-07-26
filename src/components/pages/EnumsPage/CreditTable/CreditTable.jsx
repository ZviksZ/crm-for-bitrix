import cn                     from "classnames";
import React                  from 'react';
import {connect}              from "react-redux";
import {useSort}              from "../../../../helpers/useSortRes.hook.js";
import {openCreditForm}       from "../../../../redux/enumsReducer.js";
import {getUniqueEntity}      from "../../../../redux/selectors/enumsSelectors.js";
import {updateContractorName} from "../../../../redux/thunk/enumsThunks.js";
import styles                 from './CreditTable.module.scss'
import {CreditTableItem}      from "./CreditTableItem.jsx";

export const CreditTable = (props) => {
   const {sortedData, sortField, sort, onSort} = useSort(props.enum)
   let uniqueEntity = [];


   sortedData.forEach(item => {
      if (!uniqueEntity.includes(item.entity)) {
         uniqueEntity.push(item.entity);
      }
   })

   return (
      <>
         <div className={styles.btnWrap}>
            <button className="btn btn-blue " onClick={() => props.openCreditForm({}, {})}>Добавить счет</button>
         </div>
         {
            props.enum.length ? <div className="table__wrapper">
               <table className={cn(styles.projectTable, 'custom-table')}>
                  <thead>
                  <tr>
                     <th onClick={onSort.bind(null, 'entity')}>
                  <span>
                     Наименование счета
                     {sortField === 'entity' ? <i className={cn({['sort-icon-rotate']: sort === 'asc'}, 'sort-icon', 'icon-outline-arrow-downward-24px-default')}/> : null}
                  </span>
                     </th>
                     <th>
                        <span>тип счета</span>
                     </th>
                     <th>
                        <span>валюта</span>
                     </th>
                     <th>
                        <span>статус счета</span>
                     </th>
                     <th className="budget">
                        <span>остаток</span>
                     </th>
                     <th></th>
                  </tr>
                  </thead>
                  <tbody>

                  {
                     uniqueEntity.map(item => <CreditTableItem sortedData={sortedData}
                                                               key={item}
                                                               item={item}
                                                               types={props.types}
                                                               updateContractorName={props.updateContractorName}
                                                               statuses={props.statuses}
                                                               currency={props.currency}
                                                               contractorEnum={props.contractorEnum}
                                                               openCreditForm={props.openCreditForm}/>)
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
      enum: state.enum.enums.creditAccountEnum,
      uniqueEntity: getUniqueEntity(state),
      types: state.enum.creditAdditional.type,
      statuses: state.enum.creditAdditional.statuses,
      currency: state.enum.creditAdditional.currency,
      contractorEnum: state.enum.enums.contractorEnum
   }
}

export default connect(mapStateToProps, {openCreditForm, updateContractorName})(CreditTable);
