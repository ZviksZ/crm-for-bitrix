import cn                           from "classnames";
import React, {useEffect, useState} from 'react';
import {useSelector}                from "react-redux";
import AppBar                       from '@material-ui/core/AppBar';
import Tabs                         from '@material-ui/core/Tabs';
import Tab                          from '@material-ui/core/Tab';
import {Cookie}                     from "../../../helpers/cookie.js";
import CreditForm                   from "../../common/EnumsForms/CreditForm/CreditForm.jsx";
import ExpenseForm                  from "../../common/EnumsForms/ExpenseForm/ExpenseForm.jsx";
import ProjectMemberForm            from "../../common/EnumsForms/ProjectMemberForm/ProjectMemberForm.jsx";
import {Loader}                     from "../../common/Loader/Loader.jsx";
import CreditTable                  from "./CreditTable/CreditTable.jsx";
import ExpenseTable                 from "./ExpenseTable/ExpenseTable.jsx";
import MembersTable                 from "./MembersTable/MembersTable.jsx";
import ProjectTable      from "./ProjectTable/ProjectTable.jsx";
import styles            from './EnumsPage.module.scss'


export const EnumsPage = () => {
   const {isLoading, accessItems} = useSelector(state => ({
      isLoading: state.common.isLoading,
      accessItems: state.auth.acl,
   }))

   function tabsProps(index) {
      return {
         id: `simple-tab-${index}`,
         'aria-controls': `simple-tabpanel-${index}`,
      };
   }

   const [value, setValue] = useState(0);

   useEffect(() => {
      let tab = Cookie.getCookie('enumsActiveTab');
      let data = tab ? JSON.parse(tab + '') : null
      if (data) {
         setValue(data)
      }
   }, []);


   const handleChange = async (event, newValue) => {
      setValue(newValue);
      let jsonResponse = await JSON.stringify(newValue)
      await Cookie.setCookie('enumsActiveTab', jsonResponse, {expires: 2147483647});
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
               {accessItems.includes(10) && <Tab label="бюджеты" {...tabsProps(0)} className={styles.tab}/>}
               {accessItems.includes(11) && <Tab label="сотрудники" {...tabsProps(1)} className={styles.tab}/>}
               {accessItems.includes(12) && <Tab label="счета" {...tabsProps(2)} className={styles.tab}/>}
               {accessItems.includes(13) && <Tab label="статьи" {...tabsProps(3)} className={styles.tab}/>}
            </Tabs>
         </AppBar>
         {accessItems.includes(10) && <div className={cn({[styles.showTab]: value === 0}, styles.hideTab)}>
            <ProjectTable />
         </div>}
         {accessItems.includes(11) && <div className={cn({[styles.showTab]: value === 1}, styles.hideTab)}>
            <MembersTable />
         </div>}
         {accessItems.includes(12) && <div className={cn({[styles.showTab]: value === 2}, styles.hideTab)}>
            <CreditTable />
         </div>}
         {accessItems.includes(13) && <div className={cn({[styles.showTab]: value === 3}, styles.hideTab)}>
            <ExpenseTable />
         </div>}

         {(accessItems.includes(10) || accessItems.includes(11)) && <ProjectMemberForm/>}
         {accessItems.includes(12) && <CreditForm/>}
         {accessItems.includes(13) && <ExpenseForm/>}
      </div>
   );
}



