import DateFnsUtils                          from "@date-io/date-fns";
import FormControl                           from "@material-ui/core/FormControl";
import ListSubheader                         from "@material-ui/core/ListSubheader";
import MenuItem                              from "@material-ui/core/MenuItem";
import Select                                from "@material-ui/core/Select";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import cn                                    from "classnames";
import React, {useEffect, useState}          from 'react';
import {useDispatch}                         from "react-redux";
import {Cookie}                              from "../../../../helpers/cookie.js";
import {getDatePeriod}                       from "../../../../helpers/getDatePeriod.js";
import {formatDate}                          from "../../../../helpers/utils.js";
import {setProjectPeriodFilter}              from "../../../../redux/enumsReducer.js";
import styles                                from './PeriodForm.module.scss';
import ruLocale                              from "date-fns/locale/ru";


export const PeriodForm = ({setFilter, filter, defPeriod, isProjectForm = false, projectFilterPeriod = null}) => {
   const [customPeriod, showCustomPeriod] = useState(false)
   const [dateFrom, setDateFrom] = useState(new Date())
   const [dateTo, setDateTo] = useState(new Date())
   const [period, setPeriod] = useState(defPeriod)
   const [isSetPeriod, setIsSetPeriod] = useState(false)

   const dispatch = useDispatch();

   useEffect(() => {
      if (isProjectForm && projectFilterPeriod) {
         let jsonResponse = JSON.stringify({...projectFilterPeriod, dateFrom, dateTo, period})
         Cookie.setCookie('projectEnumPeriodFilter', jsonResponse, {expires: 2147483647});
         dispatch(setProjectPeriodFilter({...projectFilterPeriod, dateFrom, dateTo, period}))
      }
   }, [dateTo, dateFrom, period]);

   useEffect(() => {
      if (isProjectForm && projectFilterPeriod && !isSetPeriod) {
         projectFilterPeriod.dateFrom && setDateFrom(projectFilterPeriod.dateFrom)
         projectFilterPeriod.dateTo && setDateTo(projectFilterPeriod.dateTo)
         projectFilterPeriod.period && setPeriod(projectFilterPeriod.period)
         setIsSetPeriod(true)
         if (projectFilterPeriod.period == 7) {
            showCustomPeriod(true)
         }
      }
   }, [projectFilterPeriod])


   const handleDateChangeFrom = (date) => {
      setDateFrom(date)
      if (date < dateTo) {
         setFilter({...filter, page: 1,start: formatDate(date, true), finish: formatDate(dateTo, true)}, true)


      }
   };
   const handleDateChangeTo = (date) => {
      setDateTo(date)
      if (dateFrom < date) {
         setFilter({...filter, start: formatDate(dateFrom, true), finish: formatDate(date, true)}, true)
      }
      setDateTo(date)
   };
   const handlePeriodChange = (event) => {
      setPeriod(event.target.value);

      if (event.target.value === 7) {
         showCustomPeriod(true);
      } else {
         showCustomPeriod(false);
         let {dateFrom, dateTo} = getDatePeriod(event.target.value);

         setFilter({...filter, start: dateFrom, finish: dateTo}, true)
      }

   };

   return (
      <div className={styles.periodForm}>
         <span className={styles.text}>Период: </span>

         <form>
            {
               customPeriod && <>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale} >
                     <div className={styles.withIcon}>
                        <DatePicker
                           autoOk
                           disableToolbar
                           variant="inline"
                           inputVariant="outlined"
                           format="dd.MM.yyyy"
                           className="filter-input"
                           value={dateFrom}
                           onChange={handleDateChangeFrom}
                           name='from'
                        />
                        <i className="icon-outline-keyboard-arrow-down-24px-default"></i>
                     </div>
                  </MuiPickersUtilsProvider>
                  <span className={styles.defis}></span>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                     <div className={styles.withIcon}>
                        <DatePicker
                           autoOk
                           disableToolbar
                           variant="inline"
                           inputVariant="outlined"
                           format="dd.MM.yyyy"
                           className="filter-input"
                           value={dateTo}
                           onChange={handleDateChangeTo}
                           name='to'
                        />
                        <i className="icon-outline-keyboard-arrow-down-24px-default"></i>
                     </div>
                  </MuiPickersUtilsProvider>
               </>
            }

               <FormControl variant="outlined" className={cn(styles.periodSelect, 'pagination-select')}>
                  <Select
                     labelId="demo-simple-select-outlined-label"
                     id="demo-simple-select-outlined"
                     value={period}
                     onChange={handlePeriodChange}
                     label="Age"
                     IconComponent={props => (
                        <i {...props} className="icon-outline-keyboard-arrow-down-24px-default"></i>
                     )}
                  >
                     <MenuItem value={1}>Текущий месяц</MenuItem>
                     <MenuItem value={2}>Текущий квартал</MenuItem>
                     <MenuItem value={3}>Текущий год</MenuItem>
                     <ListSubheader></ListSubheader>
                     <MenuItem value={4}>Прошлый месяц</MenuItem>
                     <MenuItem value={5}>Прошлый квартал</MenuItem>
                     <MenuItem value={6}>Прошлый год</MenuItem>
                     <ListSubheader></ListSubheader>
                     <MenuItem value={7}>Произвольный период</MenuItem>
                     <ListSubheader></ListSubheader>
                     <MenuItem value={8}>Все время</MenuItem>
                  </Select>
               </FormControl>


         </form>
      </div>
   )
}

