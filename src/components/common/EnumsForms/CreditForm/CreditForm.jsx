import CircularProgress                                                                                                     from "@material-ui/core/CircularProgress";
import Divider                                                                                                              from "@material-ui/core/Divider";
import Grid                                                                                                                 from "@material-ui/core/Grid";
import TextField                                                                                                            from "@material-ui/core/TextField";
import Typography                                                                                                           from "@material-ui/core/Typography";
import Autocomplete                                                                                                         from "@material-ui/lab/Autocomplete";
import React, {useEffect, useState}                                                                                         from 'react';
import {useForm}                                                                                                            from "react-hook-form";
import {connect}                                                                                                            from "react-redux";
import {NumberFormatCustom}                                                                                                 from "../../../../helpers/formFields.jsx";
import {creditShema}                                                                                                        from "../../../../helpers/validationShemas.js";
import {closeCreditForm}                                                                                                    from "../../../../redux/enumsReducer.js";
import {addCreditItem, deleteCreditItem, getMyContractorEnum, updateContractorEnum, updateContractorName, updateCreditItem} from "../../../../redux/thunk/enumsThunks.js";
import styles                                                                                                               from '../EnumsForms.module.scss'


export const CreditForm = ({
                              contractorEnum, creditForm, creditAccountEnum,
                              closeCreditForm, updateContractorEnum,
                              updateContractorName, getMyContractorEnum, myCreditEnum,
                              updateCreditItem, addCreditItem, creditAdditional,
                              creditAdditionalBasic, deleteCreditItem
                           }) => {
   const {register, handleSubmit, setValue, errors} = useForm({
      validationSchema: creditShema
   });


   let entityDef = creditForm.entityTitle;

   let typeDef = '';
   let currencyDef = '';
   let statusDef = '';

   if (creditForm?.itemData) {
      typeDef = creditForm?.itemData?.type !== 0 && creditAdditionalBasic?.type && creditAdditionalBasic?.type[creditForm.itemData.type];
      currencyDef = creditForm?.itemData?.currency !== 0 && creditAdditionalBasic?.currency && creditAdditionalBasic?.currency[creditForm.itemData.currency];
      statusDef = creditForm?.itemData?.status !== 0 && creditAdditionalBasic?.statuses && creditAdditionalBasic?.statuses[creditForm.itemData.status];
   }

   const [loading, setLoading] = useState(false)
   const [entity, setEntity] = useState(creditForm?.itemData?.entity || null);
   const [type, setType] = useState(creditForm?.itemData?.type || null);
   const [currency, setCurrency] = useState(creditForm?.itemData?.currency || null);
   const [status, setStatus] = useState(creditForm?.itemData?.status || null);


   const [currencyIcon, setCurrencyIcon] = useState(1);

   const onDelete = () => {
      deleteCreditItem(creditForm.itemData.id);
      closeCreditForm();
   }

   const onSubmit = (data, e) => {
      e.preventDefault();
      let newData;
      if (Object.keys(creditForm.itemData).length === 0) {
         newData = {...data, entity, type, currency, status}
         addCreditItem(newData)
      } else {
         newData = {...data, entity, type, currency, status, id: creditForm.itemData.id}
         updateCreditItem(newData)
      }
      closeCreditForm()
   }


   useEffect(() => {
      /* if (creditForm?.itemData?.entity) {
          updateContractorName(creditForm.itemData.entity).then(res => setValue('entity', res))
       }*/
      setEntity(creditForm?.itemData?.entity || '')
      setType(creditForm?.itemData?.type || '')
      setCurrency(creditForm?.itemData?.currency || '')
      setStatus(creditForm?.itemData?.status || '')
   }, [creditForm.itemData])

   useEffect(() => {
      getMyContractorEnum()
   }, [creditForm.isOpen])

   if (!creditForm.isOpen) {
      return false
   }

   return (
      <div className={styles.addModal}>
         <div className={styles.addModalWrap}>
            <div className="close-modal-btn" onClick={closeCreditForm}>
               <i className="icon-close-default"></i>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <Grid container>
                  <Typography component="h4" variant="h5" className={styles.formTitle}>
                     {Object.keys(creditForm?.itemData).length === 0 ? 'Добавить счет' : 'Изменить счет'}
                  </Typography>
                  <Divider className={styles.divider}/>
               </Grid>
               <Grid container spacing={2}>
                  <Divider/>
               </Grid>
               <Grid container>
                  <Grid item xs={12} sm={12}>
                     <TextField
                        className="form-input"
                        label="Наименование счета"
                        inputRef={register}
                        name='title'
                        margin="normal"
                        variant="outlined"
                        defaultValue={creditForm?.itemData.title || ''}
                        error={!!errors.title}
                        helperText={errors.title ? errors.title.message : ''}
                     />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                     <Autocomplete
                        options={myCreditEnum}
                        getOptionLabel={option => option.title || entityDef || ''}
                        onChange={(e, data) => {
                           setEntity(data?.id || null)
                           setValue("entity", data ? data : '');
                        }}
                        onInputChange={async (e, data) => {
                           /*setLoading(true);
                           await updateContractorEnum(data)
                           setLoading(false);*/
                        }}
                        loading={loading}
                        freeSolo
                        forcePopupIcon={true}
                        defaultValue={entityDef}
                        ListboxProps={
                           {
                              style: {
                                 maxHeight: '190px'
                              }
                           }
                        }
                        renderInput={params => <TextField {...params}
                                                          InputProps={{
                                                             ...params.InputProps,
                                                             endAdornment: (
                                                                <>
                                                                   {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                                                   {params.InputProps.endAdornment}
                                                                </>
                                                             ),
                                                          }}
                                                          label={"Юрлицо"}
                                                          margin="normal"
                                                          inputRef={register}
                                                          className="form-input"
                                                          error={!!errors.entity}
                                                          helperText={errors.entity ? errors.entity.message : ''}
                                                          variant="outlined" name={"entity"} fullWidth
                                                          value={params}/>}
                     />
                  </Grid>

               </Grid>
               <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                     <Autocomplete
                        options={creditAdditional.type}
                        getOptionLabel={option => option.title || typeDef || ''}
                        onChange={(e, data) => {
                           setType(data?.id || null)
                           setValue("type", data ? data : '');
                        }}
                        freeSolo forcePopupIcon={true}
                        defaultValue={typeDef}
                        ListboxProps={
                           {
                              style: {
                                 maxHeight: '190px'
                              }
                           }
                        }
                        renderInput={params => <TextField {...params}
                                                          label={"Тип счета"}
                                                          margin="normal"
                                                          inputRef={register}
                                                          className="form-input"
                                                          error={!!errors.type}
                                                          helperText={errors.type ? errors.type.message : ''}
                                                          variant="outlined" name={"type"} fullWidth
                                                          value={params}/>}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <Autocomplete
                        options={creditAdditional.statuses}
                        getOptionLabel={option => option.title || statusDef || ''}
                        onChange={(e, data) => {
                           setStatus(data?.id || null)
                           setValue("status", data ? data : '');
                        }}
                        freeSolo forcePopupIcon={true}
                        defaultValue={statusDef}
                        ListboxProps={
                           {
                              style: {
                                 maxHeight: '190px'
                              }
                           }
                        }
                        renderInput={params => <TextField {...params}
                                                          label={"Статус счета"}
                                                          margin="normal"
                                                          inputRef={register}
                                                          className="form-input"
                                                          error={!!errors.status}
                                                          helperText={errors.status ? errors.status.message : ''}
                                                          variant="outlined" name={"status"} fullWidth
                                                          value={params}/>}/>
                  </Grid>
               </Grid>
               <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                     <Autocomplete
                        options={creditAdditional.currency}
                        getOptionLabel={option => option.title || currencyDef || ''}
                        onChange={(e, data) => {
                           setCurrency(data?.id || null)
                           setCurrencyIcon(data?.id)
                           setValue("currency", data ? data : '');
                        }}
                        freeSolo forcePopupIcon={true}
                        defaultValue={currencyDef}
                        ListboxProps={
                           {
                              style: {
                                 maxHeight: '190px'
                              }
                           }
                        }
                        renderInput={params => <TextField {...params}
                                                          label={"Валюта"}
                                                          margin="normal"
                                                          inputRef={register}
                                                          className="form-input"
                                                          error={!!errors.currency}
                                                          helperText={errors.currency ? errors.currency.message : ''}
                                                          variant="outlined" name={"currency"} fullWidth
                                                          value={params}/>}/>
                  </Grid>
                  <Grid item xs={12} sm={6} className={styles.withIcon}>
                     <TextField
                        className="form-input"
                        label="Остаток"
                        inputRef={register}
                        name='balance'
                        margin="normal"
                        variant="outlined"
                        defaultValue={creditForm?.itemData.balance || ''}
                        error={!!errors.balance}
                        helperText={errors.balance ? errors.balance.message : ''}
                        InputProps={{
                           inputComponent: NumberFormatCustom,
                        }}
                     />

                     {
                        currencyIcon == 1 ? <i className="icon-ruble"></i> : <i className="icon-attach-money-default"></i>
                     }
                  </Grid>

               </Grid>
               <Grid item xs={12} sm={12}>
                  <TextField
                     className="form-input"
                     label="Комментарий"
                     inputRef={register}
                     name='comment'
                     margin="normal"
                     variant="outlined"
                     defaultValue={creditForm?.itemData.comment || ''}
                     error={!!errors.comment}
                     helperText={errors.comment ? errors.comment.message : ''}
                  />
               </Grid>
               <Divider className={styles.divider}/>
               <Grid container direction="row"
                     justify={Object.keys(creditForm?.itemData).length > 0 ? 'space-between' : 'flex-end'}
                     alignItems="center">
                  {
                     Object.keys(creditForm?.itemData).length > 0 && <div className="button-group">
                        <button onClick={onDelete} className="btn btn-red">Удалить</button>
                     </div>
                  }
                  <div className="button-group">
                     <button onClick={closeCreditForm} className={styles.cancelBtn}>Отмена</button>
                     <button type="submit" className="btn btn-green">
                        {Object.keys(creditForm?.itemData).length === 0 ? 'Добавить' : 'Изменить'}
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
      creditForm: state.enum.creditForm,
      creditAccountEnum: state.enum.enums.creditAccountEnum,
      contractorEnum: state.enum.enums.contractorEnum,
      myCreditEnum: state.enum.myCreditEnum,
      creditAdditional: state.enum.creditAdditional,
      creditAdditionalBasic: state.enum.creditAdditionalBasic
   }
}

export default connect(mapStateToProps, {getMyContractorEnum, deleteCreditItem, closeCreditForm, updateCreditItem, updateContractorName, addCreditItem, updateContractorEnum})(CreditForm);
