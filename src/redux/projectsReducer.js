import {projectsAPI}                           from "../api/api.js";
import {formatDate, getArrayOfId, setFormData} from "../helpers/utils.js";
import {getGlobalError, setLoading}            from "./appReducer.js";

const SET_PROJECTS_CLIENT_DATA = 'marginlab/projects/SET_PROJECTS_CLIENT_DATA';
const SET_PROJECTS_CLIENT_FILTER = 'marginlab/projects/SET_PROJECTS_CLIENT_FILTER';

let initialState = {
   projectsClient: null,
   projectsClientFilter: {
      client: null,
      name: null,
      budgetMin: null,
      budgetMax: null,
      start: null,
      finish: null,
      page: 1
   }
};

const projectsReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_PROJECTS_CLIENT_DATA:
         return {
            ...state,
            projectsClient: action.payload
         }
      case SET_PROJECTS_CLIENT_FILTER:
         return {
            ...state,
            projectsClientFilter: action.payload
         }
      default:
         return state;
   }
}
export const setProjectsClientData = (payload) => ({type: SET_PROJECTS_CLIENT_DATA, payload})
export const setProjectsClientFilter = (payload) => ({type: SET_PROJECTS_CLIENT_FILTER, payload})

/**
 * Получить все проекты по клиентам
 */
export const getProjectClient = (data) => async (dispatch) => {

   let formData = setFormData(data)

   try {
      let payload = await projectsAPI.getProjectsData(formData)
      dispatch(setProjectsClientData(payload))
   } catch (e) {
      dispatch(getGlobalError('Загрузка проектов не удалась', 'error'))
   }
}
/**
 * Фильтрация проектов
 */
export const getProjectClientFilter = (data, isDateChange = false) => async (dispatch) => {
   let client = getArrayOfId(data.client)
   let name = getArrayOfId(data.name)

   if (isDateChange) {
      data = {
         ...data,
         page: 1,
         budgetMin: null,
         budgetMax: null,
         client:null,
         name: null
      }
   }
   let formData;
   if (isDateChange) {
      formData = setFormData({...data})
   } else {
      formData = setFormData({...data, name, client})
   }

   try {
      dispatch(setProjectsClientData(null))

      let payload = await projectsAPI.getProjectsData(formData);

      dispatch(setProjectsClientFilter(data))
      dispatch(setProjectsClientData(payload))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}

export default projectsReducer;
