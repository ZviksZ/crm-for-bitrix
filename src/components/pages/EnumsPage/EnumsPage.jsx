import cn                from "classnames";
import React, {useState} from 'react';
import {useSelector}     from "react-redux";
import AppBar            from '@material-ui/core/AppBar';
import Tabs              from '@material-ui/core/Tabs';
import Tab               from '@material-ui/core/Tab';
import CreditForm        from "../../common/EnumsForms/CreditForm/CreditForm.jsx";
import ExpenseForm       from "../../common/EnumsForms/ExpenseForm/ExpenseForm.jsx";
import ProjectMemberForm from "../../common/EnumsForms/ProjectMemberForm/ProjectMemberForm.jsx";
import {Loader}          from "../../common/Loader/Loader.jsx";
import CreditTable       from "./CreditTable/CreditTable.jsx";
import ExpenseTable      from "./ExpenseTable/ExpenseTable.jsx";
import MembersTable      from "./MembersTable/MembersTable.jsx";
import ProjectTable      from "./ProjectTable/ProjectTable.jsx";
import styles            from './EnumsPage.module.scss'


export const EnumsPage = () => {
   const {isLoading} = useSelector(state => ({
      isLoading: state.common.isLoading
   }))

   function tabsProps(index) {
      return {
         id: `simple-tab-${index}`,
         'aria-controls': `simple-tabpanel-${index}`,
      };
   }

   const [value, setValue] = useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   if (isLoading) {
      return <Loader/>
   }

   return (
      <div className="section">
         <h1 className="h1 mb25">
            Справочники
         </h1>

         <AppBar position="static" className={styles.tabWrap}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs" className="tabs">
               <Tab label="проекты" {...tabsProps(0)} className={styles.tab}/>
               <Tab label="сотрудники" {...tabsProps(1)} className={styles.tab}/>
               <Tab label="счета" {...tabsProps(2)} className={styles.tab}/>
               <Tab label="статьи" {...tabsProps(3)} className={styles.tab}/>
            </Tabs>
         </AppBar>
         <div className={cn({[styles.showTab]: value === 0}, styles.hideTab)}>
            <ProjectTable />
         </div>
         <div className={cn({[styles.showTab]: value === 1}, styles.hideTab)}>
            <MembersTable />
         </div>
         <div className={cn({[styles.showTab]: value === 2}, styles.hideTab)}>
            <CreditTable />
         </div>
         <div className={cn({[styles.showTab]: value === 3}, styles.hideTab)}>
            <ExpenseTable />
         </div>

         <ProjectMemberForm/>
         <CreditForm/>
         <ExpenseForm/>
      </div>
   );
}



