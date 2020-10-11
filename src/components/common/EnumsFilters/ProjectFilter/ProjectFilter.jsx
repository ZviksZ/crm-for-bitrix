import ClickAwayListener                          from "@material-ui/core/ClickAwayListener";
import Grid                                       from "@material-ui/core/Grid";
import Slider                                     from "@material-ui/core/Slider";
import TextField                                  from "@material-ui/core/TextField";
import Typography                                 from "@material-ui/core/Typography";
import Autocomplete                                                     from "@material-ui/lab/Autocomplete";
import cn                                                               from "classnames";
import React, {useEffect, useState}                                                          from 'react';
import {useForm}                                                                             from "react-hook-form";
import {connect}                                                                             from "react-redux";
import {NumberFormatCustom}                                                                  from "../../../../helpers/formFields.jsx";
import {removeDigits}                                                                        from "../../../../helpers/utils.js";
import {getFilterClientsEnum, getFilterStatusEnum, getMinMaxBudget, getProjectStatusesArray} from "../../../../redux/selectors/enumsSelectors.js";
import {projectEnumFilter}                                                                   from "../../../../redux/thunk/enumsThunks.js";
import styles                                                                                from "../EnumsFilters.module.scss";

const noop = () => {
};


export const ProjectFilter = ({
                                 showFilter, enums, projectEnumFilter,
                                 projectStatuses, projectStatusesArr, budgets,
                                 setShowFilter, projectFilter, clientsEnum
                              }) => {
   const {register, handleSubmit, setValue, errors, reset} = useForm({
      defaultValues: {
         status: projectFilter.status || [],
         client: projectFilter.client || []
      }
   })

   const [client, setClient] = useState(null);
   const [status, setStatus] = useState(null);
   const [period, setPeriod] = useState(null);

   const [min, setMin] = useState(budgets.min);
   const [minVal, setMinVal] = useState(projectFilter.budgetMin || budgets.min);
   const [max, setMax] = useState(budgets.max === 0 ? projectFilter.budgetMax : budgets.max);
   const [maxVal, setMaxVal] = useState(projectFilter.budgetMax || budgets.max);
   const [budget, setBudget] = useState([0, 999999]);

   let defStatus = [];
   if (JSON.stringify(projectFilter.status) === JSON.stringify(projectStatusesArr.slice(0, 3))) {
      defStatus = projectStatusesArr.slice(0, 3)
   } else {
      defStatus = projectFilter.status || [];
   }
   let defPeriod = projectFilter.period || [];

   let defClient = projectFilter.client || [];

   useEffect(() => {
      if (enums?.projectsEnum?.data) {
         if (projectFilter.budgetMin || projectFilter.budgetMax) {
            setBudget([projectFilter.budgetMin, projectFilter.budgetMax])
         } else {
            if (max === 0) {
               setBudget([min, projectFilter.budgetMax])
            } else {
               setBudget([min, max])
            }

         }
         setClient(projectFilter.client || []);
         setStatus(projectFilter.status || []);
      }
   }, [enums.projectsEnum.data, projectFilter])



   const handleChange = (event, newValue) => {
      setBudget(newValue);
      setMinVal(newValue[0])
      setMaxVal(newValue[1])
   };

   const onSubmit = (data, e) => {
      e.preventDefault();

      projectEnumFilter({...projectFilter, page: 1, client, status, period, budgetMin: budget[0], budgetMax: budget[1]})

      setShowFilter(false)
   };

   const handleMinChange = (e) => {
      let val = e.target.value.replace(/\s/g, '')

      if (e.target.value !== '') {
         if (+val <= budget[1] && +val >= budget[0] ) {
            setMinVal(e.target.value)
            setBudget([+val, budget[1]])
         } else if (+val >= budget[1]) {
            setMinVal(budget[1])
            setBudget([budget[1], +budget[1]])
         } else {
            setMinVal(min)
            setBudget([+min, +budget[1]])
         }
      } else {
         setMinVal(e.target.value)
         setBudget([null, budget[1]])
      }

   }
   const handleMaxChange = (e) => {

      let val = e.target.value.replace(/\s/g, '')

      if (e.target.value !== '') {
         if (+val <= +max && +val >= +min ) {
            setMaxVal(e.target.value)
            setBudget([+budget[0], +val])
         } else {
            setMaxVal(max)
            setBudget([+budget[0], +max])
         }
      } else {
         setMaxVal(e.target.value)
         setBudget([budget[0], null])
      }

   }

   const clearFilter = (e) => {
      e.preventDefault();

      reset({
         client: "",
         status: ""
      });
      setClient(null)
      setStatus(null)
      setBudget([min, max])

      projectEnumFilter({...projectFilter, page: 1, client: null, status: null, budgetMin: null, budgetMax: null})
      setShowFilter(false)
   };

   return (
      <div className={styles.addModal}>
         <ClickAwayListener onClickAway={() => setShowFilter(false)}>
            <div className={cn(styles.addModalWrap, {[styles.addModalWrapOpen]: showFilter})}>
               <div className="close-modal-btn">
                  <button className={styles.cancelBtn} onClick={() => setShowFilter(false)}>Закрыть</button>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container className={styles.filterHeader}>
                     <h5 className={styles.formTitle}>
                        Фильтр
                     </h5>
                  </Grid>
                  <Grid container>
                     <Grid item xs={12} sm={12}>
                        <Autocomplete
                           options={projectStatusesArr}
                           multiple
                           limitTags={2}
                           getOptionLabel={option => option.title}
                           onChange={(e, data) => {
                              setStatus(data || null);
                              setValue("status", data ? data : '');
                           }}
                           onInputChange={async (e, data) => {
                              /* setLoading(true);
                               await updateContractorEnum(data)
                               setLoading(false);*/
                           }}
                           freeSolo
                           defaultValue={defStatus}
                           forcePopupIcon={true}
                           ListboxProps={
                              {
                                 style: {
                                    maxHeight: '190px'
                                 }
                              }
                           }
                           renderInput={params => <TextField {...params}
                                                             label={"Стадия проекта"}
                                                             margin="normal"
                                                             inputRef={register}
                                                             className="form-input"
                                                             error={!!errors.status}
                                                             helperText={errors.status ? errors.status.message : ''}
                                                             variant="outlined" name={"status"} fullWidth
                                                             value={params}/>}
                        />
                     </Grid>
                     <Grid item xs={12} sm={12} >
                        <Autocomplete
                           /*options={enums?.groupEnum.sort((a, b) => a.title > b.title ? 1 : -1)}*/
                           options={clientsEnum.sort((a, b) => a.title > b.title ? 1 : -1)}
                           multiple
                           limitTags={2}
                           getOptionLabel={option => option.title}
                           onChange={(e, data) => {
                              setClient(data || null);
                              setValue("client", data ? data : '');
                           }}
                           onInputChange={async (e, data) => {
                              /* setLoading(true);
                               await updateContractorEnum(data)
                               setLoading(false);*/
                           }}
                           freeSolo
                           forcePopupIcon={true}
                           defaultValue={defClient}
                           ListboxProps={
                              {
                                 style: {
                                    maxHeight: '190px'
                                 }
                              }
                           }
                           renderInput={params => <TextField {...params}
                                                             label={"Клиент"}
                                                             margin="normal"
                                                             inputRef={register}
                                                             className="form-input"
                                                             error={!!errors.client}
                                                             helperText={errors.client ? errors.client.message : ''}
                                                             variant="outlined" name={"client"} fullWidth
                                                             value={params}/>}
                        />
                     </Grid>
                     <Grid item xs={12} sm={12} className={styles.mb}>
                        <Autocomplete
                           options={[{id: 1, title: 'Разовый'}, {id: 2, title: 'Ежемесячный'}]}
                           multiple
                           limitTags={2}
                           getOptionLabel={option => option.title}
                           onChange={(e, data) => {
                              setPeriod(data || null);
                              setValue("period", data ? data : '');
                           }}
                           onInputChange={async (e, data) => {
                              /* setLoading(true);
                               await updateContractorEnum(data)
                               setLoading(false);*/
                           }}
                           freeSolo
                           defaultValue={defPeriod}
                           forcePopupIcon={true}
                           ListboxProps={
                              {
                                 style: {
                                    maxHeight: '190px'
                                 }
                              }
                           }
                           renderInput={params => <TextField {...params}
                                                             label={"Периодичность"}
                                                             margin="normal"
                                                             inputRef={register}
                                                             className="form-input"
                                                             error={!!errors.period}
                                                             helperText={errors.period ? errors.period.message : ''}
                                                             variant="outlined" name={"period"} fullWidth
                                                             value={params}/>}
                        />
                     </Grid>
                     <Typography gutterBottom>Бюджет</Typography>
                     <Grid container spacing={2} alignItems="center">
                        <Grid item className={cn(styles.budgetAmountLeft, styles.budgetAmount)}>
                           <TextField
                              className="form-input"
                              label="min"
                              inputRef={register}
                              name='min'
                              margin="normal"
                              variant="outlined"
                              onChange={handleMinChange}
                              value={minVal}
                              /*defaultValue={removeDigits(budget[0], 3)}*/
                              error={!!errors.min}
                              helperText={errors.min ? errors.min.message : ''}
                              InputProps={{
                                 inputComponent: NumberFormatCustom,
                              }}
                           />
                        </Grid>

                       {/* <Grid item className={cn(styles.budgetAmountLeft, styles.budgetAmount)}>
                           <span>{removeDigits(budget[0], 3)} тыс. ₽</span>
                        </Grid>*/}
                        <Grid item xs>
                           <Slider
                              value={budget}
                              onChange={handleChange}
                              min={min}
                              max={max}
                           />
                        </Grid>
                        <Grid item className={cn(styles.budgetAmountLeft, styles.budgetAmount)}>
                           <TextField
                              className="form-input"
                              label="max"
                              inputRef={register}
                              name='max'
                              value={maxVal}
                              onChange={handleMaxChange}
                              margin="normal"
                              variant="outlined"
                              /*defaultValue={removeDigits(budget[1], 3)}*/
                              error={!!errors.max}
                              helperText={errors.max ? errors.max.message : ''}
                              InputProps={{
                                 inputComponent: NumberFormatCustom,
                              }}
                           />
                        </Grid>
                        {/*<Grid item className={cn(styles.budgetAmountRight, styles.budgetAmount)}>
                           <span>{removeDigits(budget[1], 3)} тыс. ₽</span>
                        </Grid>*/}
                     </Grid>
                  </Grid>
                  <Grid container direction="column"
                        justify='center'
                        alignItems="center" className={styles.btnGroup}>
                     <button type="submit" className="btn btn-green btn-width">
                        Применить
                     </button>
                     <button onClick={clearFilter} className="btn btn-secondary btn-width mt1">Очистить фильтр</button>
                  </Grid>
               </form>
            </div>
         </ClickAwayListener>
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      enums: state.enum.enums,
      clientsEnum: getFilterClientsEnum(state),
      projectStatusesArr: getFilterStatusEnum(state),
      /*projectStatuses: state.enum.projectStatuses,
      projectStatusesArr: getProjectStatusesArray(state),*/
      budgets: getMinMaxBudget(state),
      projectFilter: state.enum.projectFilter
   }
}

export default connect(mapStateToProps, {projectEnumFilter})(ProjectFilter);



