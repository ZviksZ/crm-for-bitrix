import cn                from "classnames";
import React, {useState} from 'react';
import styles            from './ExpenseTable.module.scss'

export const ExpenseTableItem = ({item, openExpenseForm, sortedData, updateExpenseItem}) => {
   const [showCategories, setShowCategories] = useState(false);

   const toggleMainRow = (e) => {
      e.stopPropagation()
      e.preventDefault()

      setShowCategories(!showCategories)
   }

   const setIncome = (e, item) => {
      e.stopPropagation()
      e.preventDefault()
      let data = {...item, income: !item.income}

      updateExpenseItem(data)
   }
   const setConsumption = (e, item) => {
      e.stopPropagation()
      e.preventDefault()
      let data = {...item, consumption: !item.consumption}

      updateExpenseItem(data)
   }
   return (
      <>
         <tr key={item.id} className={styles.mainTableRow} onClick={() => openExpenseForm(null, item)}>
            <td>
               {
                  sortedData.find(category => category.parent === item.id) && <div className={styles.moreBtn} onClick={toggleMainRow}>
                     {
                        showCategories
                           ? <i className="icon-outline-remove-circle-outline-24px-default"></i>
                           : <i className="icon-outline-add-circle-outline-24px-default"></i>
                     }
                  </div>
               }
               <span>{item.title}</span>
            </td>
            <td>
               <div className={styles.checkboxWrap}>
                  <div className={styles.checkboxWrap} onClick={(e) => setConsumption(e, item)}>
                        <span className={cn({[styles.checkboxIconChecked]: item.consumption}, styles.checkboxIcon)}>
                           <i className="icon-check"></i>
                        </span>
                     <span className={styles.checkboxText}>в расходе</span>
                  </div>
                  <div className={styles.checkboxWrap} onClick={(e) => setIncome(e, item)}>
                        <span className={cn({[styles.checkboxIconChecked]: item.income}, styles.checkboxIcon)}>
                           <i className="icon-check"></i>
                        </span>
                     <span className={styles.checkboxText}>в доходе</span>
                  </div>
               </div>
            </td>
            <td className="hoverText">
               <span>Изменить <i className="icon-baseline-edit-24px-default"></i></span>
            </td>
         </tr>
         {
            sortedData.map(category => {
               if (category.parent === item.id) {
                  return <tr onClick={() => openExpenseForm(item, category)} key={category.id} className={cn({[styles.showTableRow]: showCategories}, styles.tableRow)}>
                     <td>{category.title}</td>
                     <td>
                        <div className={styles.checkboxWrap}>
                           <div className={styles.checkboxWrap} onClick={(e) => setConsumption(e, category)}>
                        <span className={cn({[styles.checkboxIconChecked]: category.consumption}, styles.checkboxIcon)}>
                           <i className="icon-check"></i>
                        </span>
                              <span className={styles.checkboxText}>в расходе</span>
                           </div>
                           <div className={styles.checkboxWrap} onClick={(e) => setIncome(e, category)}>
                        <span className={cn({[styles.checkboxIconChecked]: category.income}, styles.checkboxIcon)}>
                           <i className="icon-check"></i>
                        </span>
                              <span className={styles.checkboxText}>в доходе</span>
                           </div>
                        </div>
                     </td>
                     <td className="hoverText">
                        <span>Изменить <i className="icon-baseline-edit-24px-default"></i></span>
                     </td>
                  </tr>
               }
            })
         }
      </>
   );
}

