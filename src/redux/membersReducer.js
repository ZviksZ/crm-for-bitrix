import _                                       from "lodash";
import {kanbanAPI, membersAPI}                 from "../api/api.js";
import {formatDate, getArrayOfId, setFormData} from "../helpers/utils.js";
import {getGlobalError}                        from "./appReducer.js";

const SET_MEMBERS_DATA = 'marginlab/members/SET_MEMBERS_DATA';
const SET_MEMBERS_FILTER = 'marginlab/members/SET_MEMBERS_FILTER';
const SET_AWARDS_DATA = 'marginlab/members/SET_AWARDS_DATA';
const SET_AWARDS_FILTER = 'marginlab/members/SET_AWARDS_FILTER';
const SET_KANBAN = 'marginlab/members/SET_KANBAN';

let initialState = {
   members: null,
   membersFilter: {
      client: null,
      member: null,
      project: null,
      budgetMin: null,
      budgetMax: null,
      start: null,
      finish: null,
      page: 1
   },
   awards: null,
   awardsFilter: {
      client: null,
      member: null,
      start: null,
      finish: null,
      page: 1
   },
   kanban: null
};

const membersReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_MEMBERS_DATA:
         return {
            ...state,
            members: action.payload
         }
      case SET_MEMBERS_FILTER:
         return {
            ...state,
            membersFilter: action.payload
         }
      case SET_AWARDS_DATA:
         return {
            ...state,
            awards: action.payload
         }
      case SET_AWARDS_FILTER:
         return {
            ...state,
            awardsFilter: action.payload
         }
      case SET_KANBAN:
         return {
            ...state,
            kanban: action.payload
         }
      default:
         return state;
   }
}
export const setMembersData = (payload) => ({type: SET_MEMBERS_DATA, payload})
export const setMembersFilter = (payload) => ({type: SET_MEMBERS_FILTER, payload})
export const setAwardsData = (payload) => ({type: SET_AWARDS_DATA, payload})
export const setAwardsFilter = (payload) => ({type: SET_AWARDS_FILTER, payload})
export const setKanban = (payload) => ({type: SET_KANBAN, payload})


/**
 * Получить канбан
 */
export const getKanbanData = (data) => async (dispatch, getState) => {
   let formData = {}
   let state = getState()

   if (!data) {
      let members = _.orderBy(state.enum.enums.membersEnum, 'name', 'asc');
      let user = members.find(item => item.id == state.auth.userId);
      if (user.kanban === 1) {
         formData = setFormData({
            id: state.auth.userId,
            start: formatDate(new Date(), true)
         })
      } else {
         formData = setFormData({
            id: members[0].id,
            start: formatDate(new Date(), true)
         })
      }
   } else {
      formData = setFormData(data)
   }   try {
      dispatch(setKanban(null))
      let payload = await kanbanAPI.getKanbanData(formData)

      dispatch(setKanban(payload))
   } catch (e) {
      dispatch(getGlobalError('Загрузка данных канбана не удалась', 'error'))
   }
}
/**
 * Получить все данные по сотрудникам
 */
export const getMembersData = (data) => async (dispatch) => {

   let formData = setFormData(data)

   try {
      dispatch(setMembersData(null))
      let payload = await membersAPI.getMembersData(formData)

      dispatch(setMembersData(payload))
   } catch (e) {
      dispatch(getGlobalError('Загрузка данных по сотрудникам не удалась', 'error'))
   }
}
/**
 * Фильтрация сотрудников
 */
export const getMembersFilter = (data, isDateChange = false) => async (dispatch) => {
   let client = getArrayOfId(data.client)
   let project = getArrayOfId(data.project)
   let member = getArrayOfId(data.member)


   if (isDateChange) {
      data = {
         ...data,
         client: null,
         member: null,
         project: null,
         budgetMin: null,
         budgetMax: null,
         page: 1
      }
   }
   let formData;
   if (isDateChange) {
      formData = setFormData({...data})
   } else {
      formData = setFormData({...data, project, client, member})
   }

   try {
      dispatch(setMembersData(null))
      let payload = await membersAPI.getMembersData(formData);

      dispatch(setMembersFilter(data))
      dispatch(setMembersData(payload))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}

/**
 * Получить все данные по сотрудникам
 */
export const getAwardsData = (data) => async (dispatch) => {

   let formData = setFormData(data)

   try {
      let payload = await membersAPI.getAwardsData(formData)

      dispatch(setAwardsData(payload))
   } catch (e) {
      dispatch(getGlobalError('Загрузка премий не удалась', 'error'))
   }
}
/**
 * Фильтрация сотрудников
 */
export const getAwardsFilter = (data, isDateChange = false) => async (dispatch) => {
   let member = getArrayOfId(data.member)
   let project = getArrayOfId(data.project)

   if (isDateChange) {
      data = {
         ...data,
         project: null,
         member: null,
         page: 1
      }
   }
   let formData;
   if (isDateChange) {
      formData = setFormData({...data})
   } else {
      formData = setFormData({...data, member, project})
   }

   try {
      dispatch(setAwardsData(null))
      let payload = await membersAPI.getAwardsData(formData);

      dispatch(setAwardsFilter(data))
      dispatch(setAwardsData(payload))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}

export default membersReducer;
