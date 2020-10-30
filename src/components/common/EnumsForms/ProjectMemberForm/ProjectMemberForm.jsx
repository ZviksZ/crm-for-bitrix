import DateFnsUtils                          from '@date-io/date-fns';
import Divider                               from "@material-ui/core/Divider";
import Grid                                  from "@material-ui/core/Grid";
import TextField                             from "@material-ui/core/TextField";
import Typography                            from "@material-ui/core/Typography";
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import ruLocale                              from "date-fns/locale/ru";
import React, {useEffect, useState}          from 'react';
import {useForm}                             from "react-hook-form";
import {connect}                             from "react-redux";
import {NumberFormatCustom}                  from "../../../../helpers/formFields.jsx";
import {projectMemberShema}                  from "../../../../helpers/validationShemas.js";
import {closeProjectMemberForm}              from "../../../../redux/enumsReducer.js";
import {changeBudget, changeMemberPrice}     from "../../../../redux/thunk/enumsThunks.js";
import styles                                from '../EnumsForms.module.scss'
import {FormHistory}                         from "./FormHistory.jsx";
/*import buildLocalizeFn                                           from 'date-fns/locale/_lib/buildLocalizeFn';


ruLocale.localize.month = buildLocalizeFn({
   values: monthValues,
   defaultWidth: 'wide',
   defaultFormattingWidth: 'wide'
})*/


const ProjectMemberForm = ({formData, closeProjectMemberForm, changeBudget, changeMemberPrice, userId, membersEnum}) => {

   const {register, handleSubmit, errors, setValue} = useForm({
      validationSchema: projectMemberShema
   });

   const [selectedDate, setSelectedDate] = useState(new Date());

   const handleDateChange = (date, e) => {
      setSelectedDate(date);
   };

   const onSubmit = data => {
      data = {...data, author: userId}
      if (formData.apiMethod === 'changeBudget') {
         changeBudget(formData.itemId, data)
      } else if (formData.apiMethod === 'changeMemberPrice') {
         changeMemberPrice(formData.itemId, data)
      }
      closeProjectMemberForm()
   }

   useEffect(() => {
      setSelectedDate(new Date())
   }, [])

   if (!formData.isOpen) {
      return false
   }

   return (
      <div className={styles.addModal}>
         <div className={styles.addModalWrap}>
            <div className="close-modal-btn" onClick={closeProjectMemberForm}>
               <i className="icon-close-default"></i>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <Grid container spacing={10}>
                  <Grid item xs={12} sm={12}>
                     <Typography component="h4" variant="h5" className={styles.formTitle}>
                        {formData.title}
                     </Typography>
                     <Divider className={styles.divider}/>
                  </Grid>
               </Grid>
               <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} className={styles.withIcon}>
                     <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                        <DatePicker
                           autoOk
                           disableToolbar
                           variant="outlined"
                           inputVariant="outlined"
                           format="dd.MM.yyyy"
                           margin="normal"
                           id="date-picker-inline"
                           label="Дата"
                           className="form-input date-input"
                           okLabel="Выбрать"
                           cancelLabel="Отмена"
                           value={selectedDate}
                           onChange={handleDateChange}
                           error={!!errors.date}
                           helperText={errors.date ? errors.date.message : ''}
                           name='date'
                           inputRef={register}
                        />
                     </MuiPickersUtilsProvider>
                     <i className="icon-outline-calendar-today-24px-default"></i>
                  </Grid>
                  <Grid item xs={12} sm={6} className={styles.withIcon}>
                     <TextField
                        className="form-input"
                        label={formData.apiMethod === 'changeBudget' ? "Сумма" : "Стоимость часа"}
                        inputRef={register}
                        name='budget'
                        error={!!errors.budget}
                        helperText={errors.budget ? errors.budget.message : ''}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                           inputComponent: NumberFormatCustom,
                        }}
                     />
                     <i className="icon-ruble"></i>
                  </Grid>
               </Grid>
               <Grid container>
                  <Grid item xs={12} sm={12}>
                     <TextField fullWidth inputRef={register}
                                name='comment' id="outlined-basic"
                                error={!!errors.comment}
                                helperText={errors.comment ? errors.comment.message : ''}
                                className="form-input"
                                margin="normal" label="Комментарий" variant="outlined"/>
                  </Grid>

                  {formData.budgetHistory.length > 0 && <FormHistory history={formData.budgetHistory} membersEnum={membersEnum}/>}
               </Grid>
               <Divider className={styles.divider}/>
               <Grid container direction="row"
                     justify="flex-end"
                     alignItems="center">
                  <div className="button-group">
                     <button onClick={closeProjectMemberForm} className={styles.cancelBtn}>Отмена</button>
                     <button type="submit" className="btn btn-green">Добавить</button>
                  </div>
               </Grid>
            </form>
         </div>
      </div>
   );
}


let mapStateToProps = (state) => {
   return {
      formData: state.enum.projectMemberForm,
      membersEnum: state.enum.enums.membersEnum,
      userId: state.auth.userId
   }
}

export default connect(mapStateToProps, {closeProjectMemberForm, changeBudget, changeMemberPrice})(ProjectMemberForm);


