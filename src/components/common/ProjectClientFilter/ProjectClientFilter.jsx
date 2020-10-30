import ClickAwayListener            from "@material-ui/core/ClickAwayListener";
import Grid                         from "@material-ui/core/Grid";
import Slider                       from "@material-ui/core/Slider";
import TextField                                       from "@material-ui/core/TextField";
import Typography                                      from "@material-ui/core/Typography";
import Autocomplete                                                            from "@material-ui/lab/Autocomplete";
import cn                                                                      from "classnames";
import React, {useEffect, useState}                                            from 'react';
import {useForm}                                                               from "react-hook-form";
import {connect}                                                               from "react-redux";
import {NumberFormatCustom}                                                    from "../../../helpers/formFields.jsx";
import {getProjectClientFilter}                                                from "../../../redux/projectsReducer.js";
import {getMinMaxProjectClient, getProjectsClientList, getProjectsClientNames} from "../../../redux/selectors/projectsSelectors.js";
import styles                                                                  from "../../common/EnumsFilters/EnumsFilters.module.scss";

const noop = () => {
};


const ProjectClientFilter = ({
                                projects, clients,names,showFilter,
                                getProjectClientFilter,budgets,setShowFilter,
                                projectFilter
                                    }) => {

  const {register, handleSubmit, setValue, errors, reset} = useForm({
      defaultValues: {
         name: projectFilter?.name || [],
         client: projectFilter?.client || []
      }
   })

   const [client, setClient] = useState(null);
   const [name, setName] = useState(null);

   const [min, setMin] = useState(+budgets.min);
   const [minVal, setMinVal] = useState(projectFilter?.budgetMin || budgets.min);
   const [max, setMax] = useState(budgets.max === 0 ? +projectFilter.budgetMax : +budgets.max);
   const [maxVal, setMaxVal] = useState(projectFilter?.budgetMax || budgets.max);
   const [budget, setBudget] = useState([0, 999999]);


   let defName = projectFilter.name || [];
   let defClient = projectFilter.client || [];

   useEffect(() => {
      if (projects?.data) {
         if (projectFilter.budgetMin || projectFilter.budgetMax) {
            setBudget([projectFilter.budgetMin, projectFilter.budgetMax])
         } else {
            if (max === 0) {
               setBudget([min, projectFilter.budgetMax])
            } else {
               setBudget([+min, +max])
            }

         }
         setClient(projectFilter.client || []);
         setName(projectFilter.name || []);
      }
   }, [projects?.data, projectFilter])


   const handleChange = (event, newValue) => {
      setBudget(newValue);
      setMinVal(newValue[0])
      setMaxVal(newValue[1])
   };

   const onSubmit = (data, e) => {
      e.preventDefault();

      getProjectClientFilter({...projectFilter, page: 1, client, name, budgetMin: budget[0], budgetMax: budget[1]})

      setShowFilter(false)
   };

   const handleMinChange = (e) => {
      let val = e.target.value.replace(/\s/g, '')

      if (e.target.value !== '') {
         if (+val <= budget[1] && +val >= budget[0]) {
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
         if (+val <= +max && +val >= +min) {
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
         name: "",
      });
      setClient(null)
      setName(null)
      setBudget([min, max])

      getProjectClientFilter({...projectFilter, page: 1, client: null, name: null, budgetMin: null, budgetMax: null})
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
                           /*options={enums?.groupEnum.sort((a, b) => a.title > b.title ? 1 : -1)}*/
                           options={names.sort((a, b) => a.title > b.title ? 1 : -1)}
                           multiple
                           limitTags={2}
                           getOptionLabel={option => option.title}
                           onChange={(e, data) => {
                              setName(data || null);
                              setValue("name", data ? data : '');
                           }}
                           onInputChange={async (e, data) => {
                              /* setLoading(true);
                               await updateContractorEnum(data)
                               setLoading(false);*/
                           }}
                           freeSolo
                           forcePopupIcon={true}
                           defaultValue={defName}
                           ListboxProps={
                              {
                                 style: {
                                    maxHeight: '190px'
                                 }
                              }
                           }
                           renderInput={params => <TextField {...params}
                                                             label={"Название проекта"}
                                                             margin="normal"
                                                             inputRef={register}
                                                             className="form-input"
                                                             error={!!errors.name}
                                                             helperText={errors.name ? errors.name.message : ''}
                                                             variant="outlined" name={"name"} fullWidth
                                                             value={params}/>}
                        />
                     </Grid>
                     <Grid item xs={12} sm={12}>
                        <Autocomplete
                           /*options={enums?.groupEnum.sort((a, b) => a.title > b.title ? 1 : -1)}*/
                           options={clients.sort((a, b) => a.title > b.title ? 1 : -1)}
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
                     <Typography gutterBottom>Бюджет проекта</Typography>
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
      clients: getProjectsClientList(state),
      names: getProjectsClientNames(state),
      budgets: getMinMaxProjectClient(state),
      projects: state.projects.projectsClient,
      projectFilter: state.projects.projectsClientFilter
   }
}

export default connect(mapStateToProps, {getProjectClientFilter})(ProjectClientFilter);



