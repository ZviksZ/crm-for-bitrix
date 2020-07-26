import {enumsAPI}             from "../api/api.js";
import {setFormData}          from "../helpers/utils.js";
import {addExpense, setTrans} from "./enumsReducer.js";

const SET_GLOBAL_ERROR = 'marginlab/app/SET_GLOBAL_ERROR';
const SET_LOADING = 'marginlab/app/SET_LOADING';
const TOGGLE_MENU = 'marginlab/app/TOGGLE_MENU';
const CLOSE_ADD_MODAL = 'marginlab/app/CLOSE_ADD_MODAL';
const OPEN_ADD_MODAL = 'marginlab/app/OPEN_ADD_MODAL';
const SET_ADD_MODAL_DATA = 'marginlab/app/SET_ADD_MODAL_DATA';

let initialState = {
   isLoading: false,
   globalErrorMessage: {
      message: '',
      type: ''
   },
   sidebarIsOpen: false,
   addModalIsOpen: false,
   addModalData: {
      type: '',
      apiMethod: '',
      editData: null,
      defaultValues: {
         bankInName: '',
         bankOutName: '',
         costItemName: '',
         considerTitle: '',
         considerIdTitle: '',
         documentTitle: '',
         contractor: ''
      }
   }
};

const appReducer = (state = initialState, action) => {
   switch (action.type) {
      case TOGGLE_MENU:
         return {
            ...state,
            sidebarIsOpen: !state.sidebarIsOpen
         }
      case CLOSE_ADD_MODAL:
         return {
            ...state,
            addModalIsOpen: false
         }
      case OPEN_ADD_MODAL:
         return {
            ...state,
            addModalIsOpen: true
         }
      case SET_ADD_MODAL_DATA:
         return {
            ...state,
            addModalData: action.payload
         }
      case SET_LOADING:
         return {
            ...state,
            isLoading: action.isLoading
         }
      case SET_GLOBAL_ERROR:
         return {
            ...state,
            globalErrorMessage: action.payload
         }
      default:
         return state;
   }
}
export const setGlobalMessage = (message, type) => ({type: SET_GLOBAL_ERROR, payload: {message, type}})
export const setLoading = (isLoading) => ({type: SET_LOADING, isLoading})
export const toggleMenu = () => ({type: TOGGLE_MENU})
export const closeAddModal = () => ({type: CLOSE_ADD_MODAL})
export const openAddModal = () => ({type: OPEN_ADD_MODAL})
export const setAddModalData = (type, apiMethod, editData = null, defaultValues) => ({type: SET_ADD_MODAL_DATA, payload: {type, apiMethod, editData, defaultValues}})


export const openAddModalWithData = (type, apiMethod, editData, defaultValues) => async (dispatch) => {
   dispatch(setLoading(true))
   dispatch(setAddModalData(type, apiMethod, editData, defaultValues))
   dispatch(openAddModal())
   dispatch(setLoading(false))
}
export const closeAddModalWithData = () => async (dispatch) => {
   /*dispatch(setAddModalData('', '', null, {
      bankInName: '',
      bankOutName: '',
      costItemName: '',
      considerTitle: '',
      considerIdTitle: '',
      documentTitle: '',
      contractor: ''
   }))*/
   dispatch(closeAddModal())
}


export const getGlobalError = (message, type) => async (dispatch) => {
   dispatch(setGlobalMessage(message, type))
   setTimeout(() => {
      dispatch(setGlobalMessage('', ''))
   }, 3000)
}


export const updateTransaction = (data) => async (dispatch) => {
   let amount = data.amount.replace(/\s+/g, '');
   const formData = setFormData({...data, amount})
   try {

      await enumsAPI.editTransaction(formData)
      let payload = await enumsAPI.getTransEnum()
      dispatch(setTrans(payload))
      dispatch(getGlobalError('Данные обновлены', 'success'))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}
export const addTransaction = (data) => async (dispatch) => {
   let amount = data.amount.replace(/\s+/g, '');

   const formData = setFormData({...data, amount})
   try {
      await enumsAPI.addTransaction(formData)
      let payload = await enumsAPI.getTransEnum()
      dispatch(setTrans(payload))
      dispatch(getGlobalError('Транзакция создана', 'success'))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}

export const deleteTransaction = id => async (dispatch) => {
   const formData = setFormData({id})
   try {
      await enumsAPI.deleteTransaction(formData)
      let payload = await enumsAPI.getTransEnum()
      dispatch(setTrans(payload))
      dispatch(getGlobalError('Транзакция удалена', 'success'))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}


export default appReducer;
