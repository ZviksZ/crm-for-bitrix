import DateFnsUtils                          from "@date-io/date-fns";
import FormControl                           from "@material-ui/core/FormControl";
import InputLabel                            from "@material-ui/core/InputLabel";
import MenuItem                              from "@material-ui/core/MenuItem";
import Select                                from "@material-ui/core/Select";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import cn                                    from "classnames";
import ruLocale                              from "date-fns/locale/ru";
import {useEffect}                           from "react";
import * as React                            from "react";
import {useState}                            from "react";
import {useDispatch, useSelector}            from "react-redux";
import {formatDate}                          from "../../../../helpers/utils.js";
import {getKanbanData}                       from "../../../../redux/membersReducer.js";
import {OutsideAlerter}                      from "../../../hoc/OutsideAlerter.jsx";
import s                                     from '../KanbanPage.module.scss'

export const KanbanHeader = ({members}) => {
   const userId = useSelector(state => state.auth.userId)
   const [date, setDate] = useState(new Date());
   const [member, setMember] = useState(members.length > 0 && members[0].id);
   const [open, setOpen] = useState(false);

   const dispatch = useDispatch()

   useEffect(() => {
      if (members && members.length > 0) {
         let user = members.find(item => item.id == userId);
         if (user && user.kanban === 1) {
            setMember(userId)
         }
      }
   }, [members]);

   const dateChange = (date) => {
      setDate(date)
      setOpen(false)

      dispatch(getKanbanData({id: member, start: formatDate(date, true)}))
   }
   const memberChange = (e) => {
      setMember(e.target.value)

      dispatch(getKanbanData({id: e.target.value, start: formatDate(date, true)}))
   }
   const refreshData = () => {
      dispatch(getKanbanData({id: member, start: formatDate(date, true)}))
   }

   return (
      <div className={s.kanbanHeader}>
         <FormControl variant="outlined" className={cn('members-select', s.memberSelect)}>
            <InputLabel id="member-label">Сотрудник</InputLabel>
            <Select
               labelId="member-label"
               value={member}
               onChange={memberChange}
               label="Сотрудник"
               IconComponent={props => (
                  <i {...props} className="icon-outline-keyboard-arrow-down-24px-default"></i>
               )}
            >
               {
                  members && members.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
               }
            </Select>
         </FormControl>
         <div className={cn({[s.dateInputActive]: open}, s.dateInput)}>
            <OutsideAlerter onOutside={() => setOpen(false)}>
               <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                  <DatePicker
                     autoOk
                     disableToolbar
                     variant="inline"
                     inputVariant="outlined"
                     format="dd.MM.yyyy"
                     margin="normal"
                     id="date-picker-inline"
                     label="Дата"
                     className="filter-input"
                     value={date ? date : new Date()}
                     onChange={dateChange}
                     name='date'
                     open={open}
                  />
               </MuiPickersUtilsProvider>
            </OutsideAlerter>


            <i className={cn('icon-outline-calendar-today-24px-default', s.dateIcon)} onClick={() => setOpen(true)}></i>
         </div>
         <div className={s.refreshBtn} title='Обновить данные'>
            <i className={cn('icon-outline-refresh-24px-default', s.refreshIcon)} onClick={refreshData}></i>
         </div>
      </div>
   );
}

