import Checkbox                                               from "@material-ui/core/Checkbox";
import Divider                                                from "@material-ui/core/Divider";
import FormControlLabel                                       from "@material-ui/core/FormControlLabel";
import Grid                                                   from "@material-ui/core/Grid";
import TextField                                              from "@material-ui/core/TextField";
import Typography                                             from "@material-ui/core/Typography";
import Autocomplete                                           from "@material-ui/lab/Autocomplete";
import React, {useState}                                      from 'react';
import {useForm}                                              from "react-hook-form";
import {connect}                                              from "react-redux";
import {expenseShema}                                         from "../../../../helpers/validationShemas.js";
import {closeExpenseForm}                                     from "../../../../redux/enumsReducer.js";
import {addExpenseItem, deleteExpenseItem, updateExpenseItem} from "../../../../redux/thunk/enumsThunks.js";
import styles                                                 from '../EnumsForms.module.scss'

export const ExpenseForm = ({
                               deleteExpenseItem, expenseForm, expenseItemEnum,
                               closeExpenseForm, addExpenseItem, updateExpenseItem
                            }) => {

   let isParentWithChilds = expenseItemEnum.find(i => i.parent == expenseForm?.itemData?.id);

   let expenseParents = expenseItemEnum.filter(item => item.parent === 0);
   let expenseTitle = expenseForm?.itemData?.parent === 0 ? '' : expenseForm.expenseData.title;

   const [parent, setParent] = useState(expenseForm?.itemData?.parent || null);

   const {register, handleSubmit, setValue, errors} = useForm({
      validationSchema: expenseShema
   });

   const onDelete = () => {
      deleteExpenseItem(expenseForm.itemData.id);
      closeExpenseForm();
   }

   const onSubmit = data => {
      let newData;
      let par = parent === null ? expenseForm.itemData.parent : parent;
      if (Object.keys(expenseForm.itemData).length === 0) {
         par = parent || 0;
         newData = {...data, parent: par}
         addExpenseItem(newData)
      } else {
         par = parent === null ? expenseForm.itemData.parent : parent;
         newData = {...data, parent: par, id: expenseForm.itemData.id}
         updateExpenseItem(newData)
      }
      closeExpenseForm()
   }


   if (!expenseForm.isOpen) {
      return false
   }

   return (
      <div className={styles.addModal}>
         <div className={styles.addModalWrap}>
            <div className="close-modal-btn" onClick={closeExpenseForm}>
               <i className="icon-close-default"></i>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <Grid container>
                  <Typography component="h4" variant="h5" className={styles.formTitle}>
                     {Object.keys(expenseForm?.itemData).length === 0 ? 'Добавить статью' : 'Изменить статью'}

                  </Typography>
                  <Divider className={styles.divider}/>
                  <span className={styles.formTitle}>

                     </span>
               </Grid>
               <Grid container spacing={2}>
                  <Divider/>
               </Grid>
               <Grid container>
                  <Grid item xs={12} sm={12}>
                     <TextField
                        className="form-input"
                        label="Название"
                        inputRef={register}
                        name='title'
                        margin="normal"
                        variant="outlined"
                        defaultValue={expenseForm?.itemData.title || ''}
                        error={!!errors.title}
                        helperText={errors.title ? errors.title.message : ''}
                     />

                  </Grid>
                  <Grid item xs={12} sm={12}>
                     <Autocomplete
                        options={expenseParents}
                        getOptionLabel={option => option.title || expenseTitle}
                        onChange={(e, data) => {
                           setParent(data?.id || null)
                           setValue("parent", data ? data : '');
                        }}
                        freeSolo forcePopupIcon={true}
                        defaultValue={expenseForm?.expenseData || ''}
                        ListboxProps={
                           {
                              style: {
                                 maxHeight: '190px'
                              }
                           }
                        }
                        renderInput={params => <TextField {...params}
                                                          label={"Родительская категория"}
                                                          margin="normal"
                                                          inputRef={register}
                                                          className="form-input"
                                                          error={!!errors.parent}
                                                          helperText={errors.parent ? errors.parent.message : ''}
                                                          variant="outlined" name={"parent"} fullWidth
                                                          value={params}/>}/>
                  </Grid>
               </Grid>
               <Grid container spacing={1}>
                  <Grid item xs={12} sm={12}>
                     <p className={styles.subtitle}>Показывать в списке категорий</p>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <FormControlLabel
                        control={<Checkbox icon={<span className={styles.checkboxIcon}>
                                                <i className="icon-check"></i>
                                             </span>}
                                           checkedIcon={<span className={styles.checkboxIconChecked}>
                                                <i className="icon-check"></i>
                                             </span>}
                                           defaultChecked={expenseForm?.itemData.consumption || ''}
                                           inputRef={register}
                                           name="consumption"/>}
                        label="в расходе"
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <FormControlLabel
                        control={<Checkbox icon={<span className={styles.checkboxIcon}>
                                                <i className="icon-check"></i>
                                             </span>}
                                           checkedIcon={<span className={styles.checkboxIconChecked}>
                                                <i className="icon-check"></i>
                                             </span>}
                                           defaultChecked={expenseForm?.itemData.income || ''}
                                           inputRef={register}
                                           name="income"/>}
                        label="в доходе"
                     />
                  </Grid>
               </Grid>
               <Divider className={styles.divider}/>
               <Grid container direction="row"
                     justify={Object.keys(expenseForm?.itemData).length > 0 ? 'space-between' : 'flex-end'}
                     alignItems="center">


                  {
                     Object.keys(expenseForm?.itemData).length > 0 && <div className="button-group">
                        <button onClick={onDelete}
                                disabled={isParentWithChilds}
                                title={isParentWithChilds && 'Невозможно удалить, т.к. есть дочерние статьи'}
                                className="btn btn-red">
                           Удалить
                        </button>
                     </div>
                  }
                  <div className="button-group">
                     <button onClick={closeExpenseForm} className={styles.cancelBtn}>Отмена</button>
                     <button type="submit" className="btn btn-green">
                        {Object.keys(expenseForm?.itemData).length === 0 ? 'Добавить' : 'Изменить'}
                     </button>
                  </div>
               </Grid>
            </form>
         </div>
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      expenseForm: state.enum.expenseForm,
      expenseItemEnum: state.enum.enums.expenseItemEnum
   }
}

export default connect(mapStateToProps, {deleteExpenseItem, closeExpenseForm, addExpenseItem, updateExpenseItem})(ExpenseForm);
