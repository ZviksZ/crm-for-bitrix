import ClickAwayListener                     from "@material-ui/core/ClickAwayListener";
import Grid                                  from "@material-ui/core/Grid";
import TextField                             from "@material-ui/core/TextField";
import Autocomplete                          from "@material-ui/lab/Autocomplete";
import cn                                    from "classnames";
import React, {useEffect, useState}          from 'react';
import {useForm}                             from "react-hook-form";
import {connect}                             from "react-redux";
import {getAwardsFilter}                     from "../../../redux/membersReducer.js";
import {getAwardsMembers, getAwardsProjects} from "../../../redux/selectors/membersSelectors.js";
import styles                                from "../../common/EnumsFilters/EnumsFilters.module.scss";


const AwardsFilter = ({
                         awards, projects, membersList, showFilter,
                         getAwardsFilter, setShowFilter,
                         awardsFilter
                      }) => {

   const {register, handleSubmit, setValue, errors, reset} = useForm({
      defaultValues: {
         project: awardsFilter?.name || [],
         member: awardsFilter?.member || [],
      }
   })

   const [project, setProject] = useState(null);
   const [member, setMember] = useState(null);


   let defProject = awardsFilter.project || [];
   let defMember = awardsFilter.member || [];

   useEffect(() => {
      if (projects?.data) {
         setProject(awardsFilter.project || []);
         setMember(awardsFilter.member || []);
      }
   }, [projects?.data, awardsFilter])

   const onSubmit = (data, e) => {
      e.preventDefault();

      getAwardsFilter({...awardsFilter, page: 1, project, member})

      setShowFilter(false)
   };

   const clearFilter = (e) => {
      e.preventDefault();

      reset({
         project: "",
         member: ""
      });
      setProject(null)
      setMember(null)

      getAwardsFilter({...awardsFilter, page: 1, project: null, member: null})
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
                           options={membersList.sort((a, b) => a.title > b.title ? 1 : -1)}
                           multiple
                           limitTags={2}
                           getOptionLabel={option => option.title}
                           onChange={(e, data) => {
                              setMember(data || null);
                              setValue("name", data ? data : '');
                           }}
                           freeSolo
                           forcePopupIcon={true}
                           defaultValue={defMember}
                           ListboxProps={
                              {
                                 style: {
                                    maxHeight: '190px'
                                 }
                              }
                           }
                           renderInput={params => <TextField {...params}
                                                             label={"Сотрудник"}
                                                             margin="normal"
                                                             inputRef={register}
                                                             className="form-input"
                                                             error={!!errors.member}
                                                             helperText={errors.member ? errors.member.message : ''}
                                                             variant="outlined" name={"member"} fullWidth
                                                             value={params}/>}
                        />
                     </Grid>
                     <Grid item xs={12} sm={12}>
                        <Autocomplete
                           options={projects.sort((a, b) => a.title > b.title ? 1 : -1)}
                           multiple
                           limitTags={2}
                           getOptionLabel={option => option.title}
                           onChange={(e, data) => {
                              setProject(data || null);
                              setValue("name", data ? data : '');
                           }}
                           freeSolo
                           forcePopupIcon={true}
                           defaultValue={defProject}
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
                                                             error={!!errors.project}
                                                             helperText={errors.project ? errors.project.message : ''}
                                                             variant="outlined" name={"project"} fullWidth
                                                             value={params}/>}
                        />
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
      projects: getAwardsProjects(state),
      membersList: getAwardsMembers(state),
      awards: state.members.awards,
      awardsFilter: state.members.awardsFilter
   }
}

export default connect(mapStateToProps, {getAwardsFilter})(AwardsFilter);



