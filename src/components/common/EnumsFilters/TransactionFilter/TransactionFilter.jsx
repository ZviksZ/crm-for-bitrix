import ClickAwayListener            from "@material-ui/core/ClickAwayListener";
import FormControlLabel             from "@material-ui/core/FormControlLabel";
import Grid                         from "@material-ui/core/Grid";
import Switch                       from "@material-ui/core/Switch";
import TextField                    from "@material-ui/core/TextField";
import Autocomplete                 from "@material-ui/lab/Autocomplete";
import cn                           from "classnames";
import React, {useEffect, useState} from 'react';
import {useForm}                    from "react-hook-form";
import {connect}                    from "react-redux";
import {transEnumFilter}            from "../../../../redux/thunk/enumsThunks.js";
import styles                       from "../EnumsFilters.module.scss";

const typeArray = [
   {id: 1, title: 'Поступление'},
   {id: 2, title: 'Расход'},
   {id: 3, title: 'Перевод'},
   {id: 4, title: 'Долг'},
]


export const TransactionFilter = ({
                                     showFilter, enums, transEnumFilter,
                                     setShowFilter, transFilter
                                  }) => {

   const {register, handleSubmit, setValue, errors, reset} = useForm({
      defaultValues: {
         contragent: enums.contractorEnum.find(i => i.id === transFilter?.contragent)?.title || null,
         type: typeArray.find(i => i.id === transFilter?.type)?.title || null,
         bank_account_in: enums.creditAccountEnum.find(i => i.id === transFilter?.bank_account_in)?.title || null
      }
   });

   const [type, setType] = useState(null);
   const [contractor, setContractor] = useState(null);
   const [creditAccount, setCreditAccount] = useState(null);
   const [planed, setPlaned] = useState(null);


   /* let defStatus = projectStatusesArr.find(i => i.id === projectFilter?.status)?.title || '';
    let defClient = enums?.groupEnum.find(i => i.id === projectFilter?.client)?.title || '';*/

   let defType = typeArray.find(i => i.id === transFilter?.type)?.title || null;
   let defContractor = enums.contractorEnum.find(i => i.id === transFilter?.contragent)?.title || null;
   let defBankIn = enums.creditAccountEnum.find(i => i.id === transFilter?.bank_account_in)?.title || null;


   useEffect(() => {
      if (enums?.transactionEnum?.data) {

         setType(typeArray.find(i => i.id === transFilter?.type)?.title || null)
         setContractor(enums.contractorEnum.find(i => i.id === transFilter?.contragent)?.title || null)
         setCreditAccount(enums.creditAccountEnum.find(i => i.id === transFilter?.bank_account_in)?.title || null)


      }
   }, [enums.transactionEnum.data, transFilter])


   const onSubmit = (data, e) => {
      e.preventDefault();


      transEnumFilter({
         ...transFilter,
         page: 1,
         contragent: contractor,
         type,
         bank_account_in: creditAccount,
         plan: planed
      })


      setShowFilter(false)
   }

   const clearFilter = (e) => {
      e.preventDefault();

      reset({
         client: "",
         status: ""
      });

      transEnumFilter({
         ...transFilter,
         page: 1,
         contragent: null,
         type: null,
         bank_account_in: null,
         plan: null
      })
      setShowFilter(false)
   }

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
                           options={[
                              {id: 1, title: 'Поступление'},
                              {id: 2, title: 'Расход'},
                              {id: 3, title: 'Перевод'},
                              {id: 4, title: 'Долг'},
                           ]}
                           getOptionLabel={option => option.title || defType || ''}
                           onChange={(e, data) => {
                              setType(data?.id || null)
                              setValue("status", data ? data : '');
                           }}
                           onInputChange={async (e, data) => {
                              /* setLoading(true);
                               await updateContractorEnum(data)
                               setLoading(false);*/
                           }}
                           freeSolo
                           forcePopupIcon={true}
                           defaultValue={defType || ''}
                           ListboxProps={
                              {
                                 style: {
                                    maxHeight: '190px'
                                 }
                              }
                           }
                           renderInput={params => <TextField {...params}
                                         label={"Тип транзакции"}
                                         margin="normal"
                                         inputRef={register}
                                         className="form-input"
                                         error={!!errors.type}
                                         helperText={errors.type ? errors.type.message : ''}
                                         variant="outlined" name={"type"} fullWidth
                                         value={params}/>}
                           />
                     </Grid>
                     <Grid item xs={12} sm={12}>
                        <Autocomplete
                           options={enums.contractorEnum.sort((a, b) => a.title > b.title ? 1 : -1)}
                           getOptionLabel={option => option.title || defContractor || ""}
                           onChange={(e, data) => {
                              setContractor(data?.id || null)
                              setValue("contragent", data ? data : '');
                           }}
                           onInputChange={async (e, data) => {
                              /*setLoading(true);
                              await updateContractorEnum(data)
                              setLoading(false);*/
                           }}
                           freeSolo forcePopupIcon={true}
                           defaultValue={defContractor || ""}
                           ListboxProps={
                              {
                                 style: {
                                    maxHeight: '190px'
                                 }
                              }
                           }
                           renderInput={params => <TextField {...params}
                                                             label={"Контрагент"}
                                                             margin="normal"
                                                             inputRef={register}
                                                             className="form-input"
                                                             error={!!errors.contragent}
                                                             helperText={errors.contragent ? errors.contragent.message : ''}
                                                             variant="outlined" name={"contragent"} fullWidth
                                                             value={params}/>}/>
                     </Grid>
                     <Grid item xs={12} sm={12}>
                        <Autocomplete
                           options={enums.creditAccountEnum}
                           getOptionLabel={option => option.title || defBankIn || ""}
                           onChange={(e, data) => {
                              setCreditAccount(data?.id || null)
                              setValue("bank_account_in", data ? data : '');
                           }}
                           freeSolo forcePopupIcon={true}
                           defaultValue={defBankIn || ""}
                           ListboxProps={
                              {
                                 style: {
                                    maxHeight: '190px'
                                 }
                              }
                           }
                           renderInput={params => <TextField {...params}
                                                             label={"Счет зачисления"}
                                                             margin="normal"
                                                             inputRef={register}
                                                             className="form-input"
                                                             error={!!errors.bank_account_in}
                                                             helperText={errors.bank_account_in ? errors.bank_account_in.message : ''}
                                                             variant="outlined" name={"bank_account_in"} fullWidth
                                                             value={params}/>}/>
                     </Grid>
                     <Grid item xs={12} sm={12}>
                        <FormControlLabel
                           control={
                              <Switch
                                 name="plan"
                                 className="form-checkbox"
                                 color="primary"
                                 inputRef={register}
                                 onChange={(event, val) => {
                                    setPlaned(+val)
                                 }}
                                 defaultChecked={transFilter.plan || false}
                              />
                           }
                           label="Планируемая операция"
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
      enums: state.enum.enums,
      transFilter: state.enum.transFilter
   }
}

export default connect(mapStateToProps, {transEnumFilter})(TransactionFilter);



