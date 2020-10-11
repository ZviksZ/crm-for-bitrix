import {enumsAPI}    from "../api/api.js";
import {setFormData} from "../helpers/utils.js";
import {setTrans}    from "./enumsReducer.js";

const SET_GLOBAL_ERROR = 'marginlab/app/SET_GLOBAL_ERROR';
const SET_LOADING = 'marginlab/app/SET_LOADING';
const SET_ENUMS_LOADED = 'marginlab/app/SET_ENUMS_LOADED';
const TOGGLE_MENU = 'marginlab/app/TOGGLE_MENU';
const CLOSE_ADD_MODAL = 'marginlab/app/CLOSE_ADD_MODAL';
const OPEN_ADD_MODAL = 'marginlab/app/OPEN_ADD_MODAL';
const SET_ADD_MODAL_DATA = 'marginlab/app/SET_ADD_MODAL_DATA';

let initialState = {
   isLoading: false,
   isEnumsLoaded: false,
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
      case SET_ENUMS_LOADED:
         return {
            ...state,
            isEnumsLoaded: action.isEnumsLoaded
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
export const setEnumsLoaded = (isEnumsLoaded) => ({type: SET_ENUMS_LOADED, isEnumsLoaded})
export const toggleMenu = () => ({type: TOGGLE_MENU})
export const closeAddModal = () => ({type: CLOSE_ADD_MODAL})
export const openAddModal = () => ({type: OPEN_ADD_MODAL})
export const setAddModalData = (type, apiMethod, editData = null, defaultValues) => ({type: SET_ADD_MODAL_DATA, payload: {type, apiMethod, editData, defaultValues}})

/**
 * Открытие формы транзакций
 */
export const openAddModalWithData = (type, apiMethod, editData, defaultValues) => async (dispatch) => {
   dispatch(setLoading(true))
   dispatch(setAddModalData(type, apiMethod, editData, defaultValues))
   dispatch(openAddModal())
   dispatch(setLoading(false))
}
/**
 * Закрытие формы транзакций
 */
export const closeAddModalWithData = () => async (dispatch) => {
   dispatch(closeAddModal())
}

/**
 * Вывод сообщения об успехе или ошибке
 */
export const getGlobalError = (message, type) => async (dispatch) => {
   dispatch(setGlobalMessage(message, type))
   setTimeout(() => {
      dispatch(setGlobalMessage('', ''))
   }, 3000)
}

/**
 * Обновить транзакцию
 */
export const updateTransaction = (data) => async (dispatch, getState) => {
   let amount = data.amount.replace(/\s+/g, '');
   let state = getState()
   const formData = setFormData({...data, amount})
   const formDataEnum = setFormData({...state.enum.transFilter})
   try {

      await enumsAPI.editTransaction(formData)
      let payload = await enumsAPI.getTransEnum(formDataEnum)
      dispatch(setTrans(payload))
      dispatch(getGlobalError('Данные обновлены', 'success'))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}
/**
 * Добавить транзакцию
 */
export const addTransaction = (data) => async (dispatch, getState) => {
   let amount = data.amount.replace(/\s+/g, '');
   let state = getState()
   const formData = setFormData({...data, amount})
   const formDataEnum = setFormData({...state.enum.transFilter})
   try {
      await enumsAPI.addTransaction(formData)
      let payload = await enumsAPI.getTransEnum(formDataEnum)
      dispatch(setTrans(payload))
      dispatch(getGlobalError('Транзакция создана', 'success'))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}
/**
 * Удалить транзакцию
 */
export const deleteTransaction = id => async (dispatch, getState) => {
   let state = getState()
   const formData = setFormData({id})
   const formDataEnum = setFormData({...state.enum.transFilter})
   try {
      await enumsAPI.deleteTransaction(formData)
      let payload = await enumsAPI.getTransEnum(formDataEnum)
      dispatch(setTrans(payload))
      dispatch(getGlobalError('Транзакция удалена', 'success'))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}


export default appReducer;
