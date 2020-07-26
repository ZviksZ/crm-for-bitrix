import cn                                    from "classnames";
import React, {useEffect, useMemo, useState} from 'react';
import {numberWithSpace}                     from "../../../../helpers/utils.js";
import styles                                from './CreditTable.module.scss'

export const CreditTableItem = ({item, types,currency, openCreditForm, statuses, sortedData, contractorEnum, updateContractorName}) => {

   const [showIncoices, setShowInvoices] = useState(false);
   const [itemTitle, setItemTitle] = useState(null)
   const [didMount, setDidMount] = useState(false)

   const toggleMainRow = (e) => {
      e.stopPropagation()
      e.preventDefault()

      setShowInvoices(!showIncoices)
   }

   useEffect(() => {
      let value = contractorEnum.find(i => i.id == item)
      let mounted = false;

      if (value) {
         setItemTitle(value.title)
      } else {
         setItemTitle("БЕЗ ЮР.ЛИЦА");
      }

      return () => {mounted = true};

   }, [])

   return (
      <>
         <tr className={styles.mainTableRow} onClick={toggleMainRow}>
            <td colSpan={5}>
               <div className={styles.moreBtn}>
                  {
                     showIncoices
                        ? <i className="icon-outline-remove-circle-outline-24px-default"></i>
                        : <i className="icon-outline-add-circle-outline-24px-default"></i>
                  }
               </div>
               <span>{itemTitle}</span>
            </td>
            <td>

            </td>
         </tr>
         {
            sortedData.map(invoice => {
               let balance = numberWithSpace(invoice.balance);
               let typeTitle = 'Тип не выбран';
               let currencyTitle = 'Валюта не выбрана';
               let statusTitle = 'Статус не выбран';
               if (invoice.type !== 0) {
                  typeTitle = types[invoice.type - 1]?.title
               }
               if (invoice.currency !== 0) {
                  currencyTitle = currency[invoice.currency - 1]?.title
               }
               if (invoice.status !== 0) {
                  statusTitle = statuses[invoice.status - 1]?.title
               }
               //let typeTitle = types[invoice.type - 1] ||

               if (invoice.entity === item) {
                  return (
                     <tr onClick={() => openCreditForm(item, invoice, itemTitle)} key={invoice.id} className={cn({[styles.showTableRow]: showIncoices}, styles.tableRow)}>
                        <td>{invoice.title}</td>
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
            })
         }
      </>
   );
}

