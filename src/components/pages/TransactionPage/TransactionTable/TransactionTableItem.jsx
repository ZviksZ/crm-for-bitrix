import React, {useCallback, useEffect, useState}      from 'react';
import {formatDate, getRoutesChilds, numberWithSpace} from "../../../../helpers/utils.js";
import styles                                         from './TransactionTable.module.scss'

export const TransactionTableItem = ({item, openAddModalWithData, enums, updateContractorName, accessItems}) => {

   let isEditable = accessItems.includes(8);

   let amount = numberWithSpace(item.amount)
   let defValues = {
      bankInName: '',
      bankOutName: '',
      costItemName: '',
      considerTitle: '',
      considerIdTitle: item.projectName || '',
      documentTitle: '',
      contractor: item.contractorName || ''
   }

   const [itemTitle, setItemTitle] = useState('')

   defValues.considerTitle = item.consider === 0 ? 'не учитывать' : item.consider === 1 ? 'везде' : item.consider === 2 ? 'в выбранном проекте' : ''

   if (item?.document) {
      enums.documentEnum.map(val => {
         if (val.id == item.document) {
            defValues.documentTitle = val.title
         }
      })
   }
   if (item?.bank_account_in || item?.bank_account_out) {
      enums.creditAccountEnum.map(val => {
         if (val.id == item.bank_account_in) {
            defValues.bankInName = val.title
         }
         if (val.id == item.bank_account_out) {
            defValues.bankOutName = val.title
         }
      })
   }
   if (item?.cost_item) {
      enums.expenseItemEnum.map(val => {
         if (val.id == item.cost_item) {
            defValues.costItemName = val.title
         }
      })
   }
   useCallback(() => {
      defValues.considerTitle = item.consider === 0 ? 'не учитывать' : item.consider === 1 ? 'везде' : item.consider === 2 ? 'в выбранном проекте' : ''

      if (item?.document) {
         enums.documentEnum.map(val => {
            if (val.id == item.document) {
               defValues.documentTitle = val.title
            }
         })
      }
      if (item?.bank_account_in || item?.bank_account_out) {
         enums.creditAccountEnum.map(val => {
            if (val.id == item.bank_account_in) {
               defValues.bankInName = val.title
            }
            if (val.id == item.bank_account_out) {
               defValues.bankOutName = val.title
            }
         })
      }
      if (item?.cost_item) {
         enums.expenseItemEnum.map(val => {
            if (val.id == item.cost_item) {
               defValues.costItemName = val.title
            }
         })
      }
   }, [item, defValues, enums.allProjects])

   useEffect(() => {
      if (item.contractorName) {
         setItemTitle(item.contractorName)
      } else {
         if (item?.contragent) {
            let value = enums.contractorEnum.find(i => i.id == item.contragent)

            if (value) {
               setItemTitle(value.title)
            } else {
               if (item.contragent !== 0) {
                  updateContractorName(item.contragent).then(res => setItemTitle(res?.data?.title || ''))
               }
            }
         }
      }

      return () => {
         return false
      }
   }, [item, setItemTitle])


   const openTransactionModal = () => {
      if (isEditable) {
         openAddModalWithData(typeString, 'updateTransaction', item, {...defValues, contractor: itemTitle})
      }
   }

   let date = formatDate(item.date);
   let typeString = '' + item.type;
   return (
      <tr key={item.id} onClick={openTransactionModal}>
         <td>
            {date}
         </td>
         <td>
            {item.type === 1 ? 'Поступление' : item.type === 2 ? 'Расход' : item.type === 3 ? "Перевод" : item.type === 4 ? 'Долг' : 'Другое'}
         </td>
         <td className={styles.budget}>
            {amount} &#8381;
         </td>
         <td>
            RUB
         </td>
         <td>
            {defValues.considerIdTitle}
         </td>
         <td>
            {itemTitle}
         </td>
         <td>
            {item.comment}
         </td>
         <td className="hoverText">
            {
               isEditable && <span><i className="icon-baseline-edit-24px-default"></i> Изменить</span>
            }
         </td>
      </tr>
   );
}

