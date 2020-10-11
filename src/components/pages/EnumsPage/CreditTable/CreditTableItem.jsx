import cn                                    from "classnames";
import React, {useEffect, useMemo, useState} from 'react';
import {numberWithSpace}                     from "../../../../helpers/utils.js";
import styles                                from './CreditTable.module.scss'

export const CreditTableItem = ({item, types,currency, openCreditForm, statuses, contractorEnum, updateContractorName}) => {

   const [showIncoices, setShowInvoices] = useState(true);
   const [itemTitle, setItemTitle] = useState(null)
   const [didMount, setDidMount] = useState(false)

   useEffect(() => {
      let value = contractorEnum.find(i => i.id == item.entity)
      let mounted = false;

      if (value) {
         setItemTitle(value.title)
      } else {
         setItemTitle("");
      }

      return () => {mounted = true};
   }, [item])

   let balance = numberWithSpace(item.balance);
   let typeTitle = 'Тип не выбран';
   let currencyTitle = 'Валюта не выбрана';
   let statusTitle = 'Статус не выбран';
   if (item.type !== 0) {
      typeTitle = types[item.type - 1]?.title
   }
   if (item.currency !== 0) {
      currencyTitle = currency[item.currency - 1]?.title
   }
   if (item.status !== 0) {
      statusTitle = statuses[item.status - 1]?.title
   }

   return (
      <tr onClick={() => openCreditForm(item, item, itemTitle)} key={item.id} className={cn({[styles.showTableRow]: showIncoices}, styles.tableRow)}>
         <td>{item.title}</td>
         <td>{itemTitle}</td>
         <td>{typeTitle}</td>
         <td>{currencyTitle}</td>
         <td>{statusTitle}</td>
         <td className="budget" >
            {balance}
         </td>
         <td className="hoverText">
            <span>Изменить <i className="icon-baseline-edit-24px-default"></i></span>
         </td>
      </tr>
   )
}

