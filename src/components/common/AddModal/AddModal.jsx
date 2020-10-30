import DateFnsUtils                                                                  from '@date-io/date-fns';
import CircularProgress                                                              from "@material-ui/core/CircularProgress";
import Divider                                                                       from "@material-ui/core/Divider";
import FormControlLabel                                                              from "@material-ui/core/FormControlLabel";
import Grid                                                                          from "@material-ui/core/Grid";
import Switch                                                                        from "@material-ui/core/Switch";
import TextField                                                                     from "@material-ui/core/TextField";
import Autocomplete                                                                  from '@material-ui/lab/Autocomplete';
import {DatePicker, MuiPickersUtilsProvider}                                         from '@material-ui/pickers';
import ruLocale                                                                      from "date-fns/locale/ru";
import React, {useEffect, useState}                                                  from 'react';
import {useForm}                                                                     from "react-hook-form";
import {connect}                                                                     from "react-redux";
import * as yup                                                                      from "yup";
import {NumberFormatCustom}                                                          from "../../../helpers/formFields.jsx";
import {sortExpenseEnum}                                                             from "../../../helpers/utils.js";
import {addTransaction, closeAddModalWithData, deleteTransaction, updateTransaction} from "../../../redux/appReducer.js";
import {updateContractorEnum, updateProjects}                                        from "../../../redux/thunk/enumsThunks.js";
import {OutsideAlerter}                                                              from "../../hoc/OutsideAlerter.jsx";
import styles                                                                        from './AddModal.module.scss';
import {AddModalHeader}                                                              from "./AddModalHeader.jsx";


const AddModal = ({
                     deleteTransaction, addModalIsOpen,
                     addModalData, updateContractorEnum,
                     closeAddModalWithData, enums,
                     updateTransaction, addTransaction, updateProjects, creditAdditional, transFilter
                  }) => {

   const addModalSchemaType = yup.object().shape({
      date: yup.string().required('Обязательное поле'),
      amount: yup.string().required('Обязательное поле'),
      ...(addModalData.type === '2' && {consider: yup.string().required('Обязательное поле')}),
      ...(addModalData.type === '1' && {cost_item: yup.string().required('Обязательное поле')}),
      ...(addModalData.type === '2' && {cost_item: yup.string().required('Обязательное поле')}),
      ...(addModalData.type !== '2' && {bank_account_in: yup.string().required('Обязательное поле')}),
      ...(addModalData.type !== '1' && {bank_account_out: yup.string().required('Обязательное поле')}),

   });

   const {register, handleSubmit, setValue, errors} = useForm({
      validationSchema: addModalSchemaType
   });

   useEffect(() => {
   }, [errors])

   let expenseList = []

   if (addModalData.type === '1') {
      expenseList = sortExpenseEnum(enums.expenseItemEnum).filter(item => item.income === true)
   } else if (addModalData.type === '2') {
      expenseList = sortExpenseEnum(enums.expenseItemEnum).filter(item => item.consumption === true)
   }


   let onlyActiveCreditEnum = enums.creditAccountEnum.filter(item => item.status != 1)
   const [showProjectList, setShowProjectList] = useState(false);
   const [showContractorList, setShowContractorList] = useState(false);
   const [showDocumentList, setDocumentList] = useState(false);

   const [loading, setLoading] = useState(false);

   const [selectedDate, setSelectedDate] = useState(new Date());
   const [creditAccount, setCreditAccount] = useState('');
   const [creditAccountOut, setCreditAccountOut] = useState('');
   const [expenseItem, setExpenseItem] = useState('');
   const [project, setProject] = useState('');
   const [contractor, setContractor] = useState('');
   const [document, setDocument] = useState('');
   const [consider, setConsider] = useState('');


   const [showProject, setShowProject] = useState(false);

   const handleDateChange = (date) => {
      setSelectedDate(date);
   };

   const onDelete = () => {
      deleteTransaction(addModalData?.editData?.id);
      closeAddModalWithData();
   }

   const onSubmit = data => {
      let newData;
      switch (addModalData.type) {
         case '1':
            newData = {...data, type: 1, plan: +data.plan, contragent: +contractor, bank_account_in: +creditAccount, cost_item: +expenseItem, document: +document, consider_id: +project}
            break
         case '2':
            newData = {
               ...data,
               type: 2,
               plan: +data.plan,
               contragent: +contractor,
               bank_account_out: +creditAccountOut,
               cost_item: +expenseItem,
               document: +document,
               consider_id: +project || null,
               consider: +consider
            }
            break
         case '3':
            newData = {...data, type: 3, plan: +data.plan, cashout: +data.cashout, contragent: +contractor, bank_account_out: +creditAccountOut, bank_account_in: +creditAccount}
            break
         case '4':
            newData = {...data, type: 4, plan: +data.plan, inner: +data.inner, contragent: +contractor, bank_account_out: +creditAccountOut, bank_account_in: +creditAccount}
            break
         default:
            break
      }

      if (addModalData.apiMethod === 'addTransaction') {
         addTransaction(newData)
      } else if (addModalData.apiMethod === 'updateTransaction') {
         newData.id = addModalData?.editData?.id
         updateTransaction(newData)
      }
      closeAddModalWithData()
   }

   useEffect(() => {
      if (addModalData?.editData?.date) {
         setShowProjectList(false)
         setShowContractorList(false)
         setDocumentList(false)
         if (addModalData?.editData?.consider === 2) {
            setShowProject(true)
         } else {
            setShowProject(false)
         }
         setCreditAccount(addModalData?.editData?.bank_account_in || '');
         setCreditAccountOut(addModalData?.editData?.bank_account_out || '');
         setExpenseItem(addModalData?.editData?.cost_item || '');
         setProject(addModalData?.editData?.consider_id || '');
         setContractor(addModalData?.editData?.contragent || '');
         setDocument(addModalData?.editData?.document || '');
         setConsider(addModalData?.editData?.consider || '');


         setSelectedDate(new Date(addModalData.editData.date))
      } else {
         setShowProjectList(false)
         setShowContractorList(false)
         setDocumentList(false)
         setSelectedDate(new Date())
      }
   }, [addModalData, addModalData.editData])

   if (!addModalIsOpen) {
      return false
   }

   return (
      <div className={styles.addModal}>
         <OutsideAlerter onOutside={() => false}>
            <div className={styles.addModalWrap}>
               <div className="close-modal-btn" onClick={closeAddModalWithData}>
                  <i className="icon-close-default"></i>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={10}>
                     <AddModalHeader type={addModalData.type}/>
                  </Grid>
                  <Grid container spacing={1}>
                     <Divider/>
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
                              okLabel="Выбрать"
                              cancelLabel="Отмена"
                              className="form-input date-input"
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
                           label="Сумма"
                           inputRef={register}
                           name='amount'
                           margin="normal"
                           variant="outlined"
                           defaultValue={addModalData?.editData?.amount || ''}
                           error={!!errors.amount}
                           helperText={errors.amount ? errors.amount.message : ''}
                           InputProps={{
                              inputComponent: NumberFormatCustom,
                           }}
                        />
                        <i className="icon-ruble"></i>
                     </Grid>
                  </Grid>
                  <Grid container>
                     <Grid item xs={12} sm={12}>
                        <FormControlLabel
                           control={
                              <Switch
                                 name="plan"
                                 className="form-checkbox"
                                 color="primary"
                                 inputRef={register}
                                 defaultChecked={!!addModalData?.editData?.plan || false}
                              />
                           }
                           label="Планируемая операция"
                        />
                     </Grid>

                     {
                        addModalData.type !== '1' && <Grid item xs={12} sm={12}>
                           <Autocomplete
                              options={enums.creditAccountEnum}
                              getOptionLabel={option => option.title || addModalData?.defaultValues?.bankOutName || ""}
                              onChange={(e, data) => {
                                 setCreditAccountOut(data?.id || null)
                                 setValue("bank_account_out", data ? data : '');
                              }}
                              renderOption={(option, {selected}) => {
                                 let entity = enums.contractorEnum.find(a => a.id === option.entity)?.title || ''
                                 let currency = creditAdditional.currency.find(a => a.id == option.currency)?.title || ''


                                 return <>
                                    <div className="creditListItem">
                                       <div className="creditListItemTitle">{option.title}</div>
                                       <div className="creditListItemSubitle">
                                          {entity.length > 0 && <span>{entity}</span>}
                                          <span className={entity.length === 0 ? 'no-point' : ''}>{currency}</span>
                                       </div>
                                    </div>
                                 </>
                              }}
                              freeSolo forcePopupIcon={true}
                              defaultValue={addModalData?.defaultValues?.bankOutName || ""}
                              ListboxProps={
                                 {
                                    style: {
                                       maxHeight: '190px'
                                    }
                                 }
                              }
                              renderInput={params => <TextField {...params}
                                                                label={"Со счета"}
                                                                margin="normal"
                                                                inputRef={register}
                                                                className="form-input"
                                                                error={!!errors.bank_account_out}
                                                                helperText={errors.bank_account_out ? errors.bank_account_out.message : ''}
                                                                variant="outlined" name={"bank_account_out"} fullWidth
                                                                value={params}/>}/>
                        </Grid>
                     }
                     {
                        addModalData.type === '4' && <Grid item xs={12} sm={12}>
                           <FormControlLabel
                              control={
                                 <Switch
                                    name="inner"
                                    color="primary"
                                    className="form-checkbox"
                                    inputRef={register}
                                    defaultChecked={!!addModalData?.editData?.inner || false}
                                 />
                              }
                              label="Внутренний"
                           />
                        </Grid>
                     }
                     {
                        addModalData.type === '3' && <Grid item xs={12} sm={12}>
                           <FormControlLabel
                              control={
                                 <Switch
                                    name="cashout"
                                    color="primary"
                                    className="form-checkbox"
                                    inputRef={register}
                                    defaultChecked={!!addModalData?.editData?.cashout || false}
                                 />
                              }
                              label="Вывод"
                           />
                        </Grid>
                     }
                     {
                        addModalData.type !== '2' && <Grid item xs={12} sm={12}>
                           <Autocomplete
                              options={onlyActiveCreditEnum}
                              getOptionLabel={option => option.title || addModalData?.defaultValues?.bankInName || ""}
                              onChange={(e, data) => {
                                 setCreditAccount(data?.id || null)
                                 setValue("bank_account_in", data ? data : '');
                              }}
                              renderOption={(option, {selected}) => {
                                 let entity = enums.contractorEnum.find(a => a.id === option.entity)?.title || ''
                                 let currency = creditAdditional.currency.find(a => a.id == option.currency)?.title || ''

                                 return <>
                                    <div className="creditListItem">
                                       <div className="creditListItemTitle">{option.title}</div>
                                       <div className="creditListItemSubitle">
                                          <span>{entity}</span>
                                          <span>{currency}</span>
                                       </div>
                                    </div>
                                 </>
                              }}
                              freeSolo forcePopupIcon={true}
                              defaultValue={addModalData?.defaultValues?.bankInName || ""}
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
                     }
                     {
                        addModalData.type === '1' && <Grid item xs={12} sm={12}>
                           <Autocomplete
                              options={expenseList}
                              getOptionLabel={option => option.title || addModalData?.defaultValues?.costItemName || ""}
                              onChange={(e, data) => {
                                 setExpenseItem(data?.id || null)
                                 setValue("cost_item", data ? data : '');
                              }}
                              freeSolo forcePopupIcon={true}
                              defaultValue={addModalData?.defaultValues?.costItemName || ""}
                              ListboxProps={
                                 {
                                    style: {
                                       maxHeight: '190px'
                                    }
                                 }
                              }
                              classes={{
                                 option: 'custom-option'
                              }}
                              renderOption={(option, {selected}) => {
                                 if (option.parent == 0) {
                                    return <div className="customOption customOptionParent">
                                       {option.title}
                                    </div>
                                 } else {
                                    return <div className="customOption">
                                       {option.title}
                                    </div>
                                 }
                              }}
                              renderInput={params => <TextField {...params}
                                                                label={"Статья"}
                                                                margin="normal"
                                                                inputRef={register}
                                                                className="form-input"
                                                                error={!!errors.cost_item}
                                                                helperText={errors.cost_item ? errors.cost_item.message : ''}
                                                                variant="outlined" name={"cost_item"} fullWidth
                                                                value={params}/>}/>
                        </Grid>
                     }
                     {
                        addModalData.type === '2' && <Grid item xs={12} sm={12}>
                           <Autocomplete
                              options={enums.expenseItemEnum}
                              getOptionLabel={option => option.title || addModalData?.defaultValues?.costItemName || ""}
                              onChange={(e, data) => {
                                 setExpenseItem(data?.id || null)
                                 setValue("cost_item", data ? data : '');
                              }}
                              freeSolo forcePopupIcon={true}
                              defaultValue={addModalData?.defaultValues?.costItemName || ""}
                              ListboxProps={
                                 {
                                    style: {
                                       maxHeight: '190px'
                                    }
                                 }
                              }
                              renderInput={params => <TextField {...params}
                                                                label={"Статья"}
                                                                margin="normal"
                                                                inputRef={register}
                                                                className="form-input"
                                                                error={!!errors.cost_item}
                                                                helperText={errors.cost_item ? errors.cost_item.message : ''}
                                                                variant="outlined" name={"cost_item"} fullWidth
                                                                value={params}/>}/>
                        </Grid>
                     }
                     {
                        addModalData.type === '2' && <>
                           <Grid item xs={12} sm={12}>
                              <Autocomplete
                                 options={[{id: 0, title: 'не учитывать'}, {id: 1, title: 'везде'}, {id: 2, title: 'в выбранном проекте'}]}
                                 getOptionLabel={option => option.title || addModalData?.defaultValues?.considerTitle || ""}
                                 onChange={(e, data) => {
                                    if (data?.id) {
                                       data.id === 2 ? setShowProject(true) : setShowProject(false)
                                    } else {
                                       setShowProject(false)
                                    }
                                    setConsider(data?.id || null)
                                    setValue("consider", data ? data : '');
                                 }}
                                 freeSolo forcePopupIcon={true}
                                 defaultValue={addModalData?.defaultValues?.considerTitle || ""}
                                 ListboxProps={
                                    {
                                       style: {
                                          maxHeight: '190px'
                                       }
                                    }
                                 }
                                 renderInput={params => <TextField {...params}
                                                                   label={"Учет в затратах проектов"}
                                                                   margin="normal"
                                                                   inputRef={register}
                                                                   className="form-input"
                                                                   error={!!errors.consider}
                                                                   helperText={errors.consider ? errors.consider.message : ''}
                                                                   variant="outlined" name={"consider"} fullWidth
                                                                   value={params}/>}/>
                           </Grid>
                        </>
                     }
                     {
                        addModalData.type === '1' && <Grid item xs={12} sm={12}>
                           <Autocomplete
                              options={enums.projectsToForm.data.sort((a, b) => a.title > b.title ? 1 : -1)}
                              getOptionLabel={option => option?.title || addModalData?.defaultValues?.considerIdTitle || ""}
                              onChange={(e, data) => {
                                 setProject(data?.id || null)
                                 setValue("consider_id", data ? data : '');
                                 setShowProjectList(false)
                              }}
                              onInputChange={async (e, data) => {
                                 if (data.length >= 3) {
                                    setShowProjectList(true)
                                    setLoading(true);
                                    await updateProjects(data)
                                    setLoading(false);
                                 } else {
                                    setShowProjectList(false)
                                    setLoading(false);
                                 }
                              }}
                              open={showProjectList}
                              loading={loading}
                              freeSolo forcePopupIcon={true}
                              defaultValue={addModalData?.defaultValues?.considerIdTitle || ""}
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
                                                                label={"Проект"}
                                                                margin="normal"
                                                                inputRef={register}
                                                                className="form-input"
                                                                error={!!errors.consider_id}
                                                                helperText={errors.consider_id ? errors.consider_id.message : ''}
                                                                variant="outlined" name={"consider_id"} fullWidth
                                                                value={params}/>}/>
                        </Grid>
                     }
                     {
                        showProject && <Grid item xs={12} sm={12}>
                           <Autocomplete
                              options={enums.projectsToForm.data.sort((a, b) => a.title > b.title ? 1 : -1)}
                              getOptionLabel={option => option?.title || addModalData?.defaultValues?.considerIdTitle || ""}
                              onChange={(e, data) => {
                                 setProject(data?.id || null)
                                 setValue("consider_id", data ? data : '');
                                 setShowProjectList(false)
                              }}
                              onInputChange={async (e, data) => {
                                 if (data.length >= 3) {
                                    setShowProjectList(true)
                                    setLoading(true);
                                    await updateProjects(data)
                                    setLoading(false);
                                 } else {
                                    setShowProjectList(false)
                                    setLoading(false);
                                 }
                              }}
                              open={showProjectList}
                              loading={loading}
                              freeSolo forcePopupIcon={true}
                              defaultValue={addModalData?.defaultValues?.considerIdTitle || ""}
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
                                                                label={"Проект"}
                                                                margin="normal"
                                                                inputRef={register}
                                                                className="form-input"
                                                                error={!!errors.consider_id}
                                                                helperText={errors.consider_id ? errors.consider_id.message : ''}
                                                                variant="outlined" name={"considerId"} fullWidth
                                                                value={params}/>}/>
                        </Grid>
                     }
                     {
                        addModalData.type !== '3' && <Grid item xs={12} sm={12}>
                           <Autocomplete
                              options={enums.contractorEnum.sort((a, b) => a.title > b.title ? 1 : -1)}
                              getOptionLabel={option => option.title || addModalData?.defaultValues?.contractor || ""}
                              onChange={(e, data) => {
                                 setContractor(data?.id || null)
                                 setValue("contragent", data ? data : '');
                                 setShowContractorList(false)
                              }}
                              onInputChange={async (e, data) => {
                                 if (data.length >= 3) {
                                    setShowContractorList(true)
                                 } else {
                                    setShowContractorList(false)
                                 }
                                 /*setLoading(true);
                                 await updateContractorEnum(data)
                                 setLoading(false);*/
                              }}
                              open={showContractorList}
                              loading={loading}
                              freeSolo forcePopupIcon={true}
                              defaultValue={addModalData?.defaultValues?.contractor || ""}
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
                                                                label={"Контрагент"}
                                                                margin="normal"
                                                                inputRef={register}
                                                                className="form-input"
                                                                error={!!errors.contragent}
                                                                helperText={errors.contragent ? errors.contragent.message : ''}
                                                                variant="outlined" name={"contragent"} fullWidth
                                                                value={params}/>}/>
                        </Grid>
                     }
                     {
                        addModalData.type === '1' && <Grid item xs={12} sm={12}>
                           <Autocomplete
                              options={enums.documentEnum}
                              getOptionLabel={option => option.title || addModalData?.defaultValues?.documentTitle || ''}
                              onChange={(e, data) => {
                                 setDocument(data?.id || null)
                                 setValue("document", data ? data : '');
                                 setDocumentList(false)
                              }}
                              onInputChange={async (e, data) => {
                                 if (data.length >= 1) {
                                    setDocumentList(true)
                                 } else {
                                    setDocumentList(false)
                                 }
                              }}
                              open={showDocumentList}
                              freeSolo forcePopupIcon={true}
                              defaultValue={addModalData?.defaultValues?.documentTitle || ""}
                              ListboxProps={
                                 {
                                    style: {
                                       maxHeight: '190px'
                                    }
                                 }
                              }
                              renderInput={params => <TextField {...params}
                                                                label={"Основание (счет)"}
                                                                margin="normal"
                                                                inputRef={register}
                                                                className="form-input"
                                                                error={!!errors.document}
                                                                helperText={errors.document ? errors.document.message : ''}
                                                                variant="outlined" name={"document"} fullWidth
                                                                value={params}/>}/>
                        </Grid>
                     }
                     {
                        addModalData.type === '2' && <Grid item xs={12} sm={12}>
                           <Autocomplete
                              options={enums.documentEnum}
                              getOptionLabel={option => option.title || addModalData?.defaultValues?.documentTitle || ""}
                              onChange={(e, data) => {
                                 setDocument(data?.id || null)
                                 setValue("document", data ? data : '');
                                 setDocumentList(false)
                              }}
                              onInputChange={async (e, data) => {
                                 if (data.length >= 1) {
                                    setDocumentList(true)
                                 } else {
                                    setDocumentList(false)
                                 }
                              }}
                              open={showDocumentList}
                              freeSolo forcePopupIcon={true}
                              defaultValue={addModalData?.defaultValues?.documentTitle || ""}
                              ListboxProps={
                                 {
                                    style: {
                                       maxHeight: '190px'
                                    }
                                 }
                              }
                              renderInput={params => <TextField {...params}
                                                                label={"Основание (счет)"}
                                                                margin="normal"
                                                                inputRef={register}
                                                                className="form-input"
                                                                error={!!errors.document}
                                                                helperText={errors.document ? errors.document.message : ''}
                                                                variant="outlined" name={"document"} fullWidth
                                                                value={params}/>}/>
                        </Grid>
                     }
                     <Grid item xs={12} sm={12}>
                        <TextField fullWidth inputRef={register}
                                   name='comment' id="outlined-basic"
                                   defaultValue={addModalData?.editData?.comment || ''}
                                   error={!!errors.comment}
                                   helperText={errors.comment ? errors.comment.message : ''}
                                   className="form-input"
                                   margin="normal" label="Комментарий" variant="outlined"/>
                     </Grid>
                  </Grid>
                  <Divider className={styles.divider}/>
                  <Grid container direction="row"
                        justify={addModalData?.editData ? 'space-between' : 'flex-end'}
                        alignItems="center">
                     {
                        addModalData?.editData && <div className="button-group">
                           <button onClick={onDelete} className="btn btn-red">Удалить</button>
                        </div>
                     }
                     <div className="button-group">
                        <button onClick={closeAddModalWithData} className={styles.cancelBtn}>Отмена</button>
                        <button type="submit" className="btn btn-green">
                           {addModalData.apiMethod === 'addTransaction' ? 'Добавить' : 'Изменить'}
                        </button>
                     </div>
                  </Grid>
               </form>
            </div>
         </OutsideAlerter>
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      addModalIsOpen: state.common.addModalIsOpen,
      enums: state.enum.enums,
      addModalData: state.common.addModalData,
      creditAdditional: state.enum.creditAdditional,
      transFilter: state.enum.transFilter
   }
}

export default connect(mapStateToProps, {
   updateProjects, deleteTransaction, closeAddModalWithData, updateTransaction,
   updateContractorEnum, addTransaction
})(AddModal);
