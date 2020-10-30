import * as axios from "axios";
import {Cookie}   from "../helpers/cookie.js";
import {kanban} from './kanban';

const BASE_URL = 'https://margin.internetlab.ru/api'

const instance = axios.create({
   baseURL: BASE_URL,
   headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      'Content-Type': 'multipart/form-data'
   }
})


instance.interceptors.request.use(config => {

   const cookies = Cookie.getCookie('userData');
   const data = JSON.parse(cookies + '');

   if (data && data.token) {
      config.headers['X-AUTH-TOKEN'] = `${data.token}`
   }

   return config
})


export const enumsAPI = {
   /**
    * Листинг групп клиентов
    */
   getGroupEnum(formData) {
      return instance.post(`/getGroupEnum`, formData).then(response => response.data);
   },
   /**
    * Клиент
    *  @param { Object } formData - данные формы
    */
   getGroupInfo(formData) {
      return instance.post(`/getGroupInfo`, formData);
   },
   /**
    * Листинг транзакций
    */
   getTransEnum(formData) {
      return instance.post(`/getTransaction`, formData).then(response => response.data);
   },

   /**
    * Новая транзакция
    * * @param { Object } formData - данные формы
    */
   addTransaction(formData) {
      return instance.post(`/addTransaction`, formData);
   },
   /**
    * Обновление транзакции
    * * @param { Object } formData - данные формы
    */
   editTransaction(formData) {
      return instance.post(`/editTransaction`, formData);
   },
   /**
    * Удаление транзакции
    * * @param { Object } formData - данные формы
    */
   deleteTransaction(formData) {
      return instance.post(`/delTransaction`, formData);
   },
   /**
    * Запрос на справочник Счет зачисления
    */
   getCreditAccountEnum(formData) {
      return instance.post(`/getCreditAccountEnum`, formData).then(response => response.data);
   },
   /**
    * Запрос на справочник Статусы счетов
    */
   getCreditStatuses(formData) {
      return instance.post(`/statusCredit`, formData).then(response => response.data);
   },
   /**
    * Запрос на справочник Валюты счетов
    */
   getCreditCurrency(formData) {
      return instance.post(`/currencyCredit`, formData).then(response => response.data);
   },
   /**
    * Запрос на справочник Типы счетов
    */
   getCreditType(formData) {
      return instance.post(`/typeCredit`, formData).then(response => response.data);
   },
   /**
    * Счет зачисления - новый
    * * @param { Object } formData - данные формы
    */
   addCredit(formData) {
      return instance.post(`/addCredit`, formData);
   },
   /**
    * Счет зачисления - обновление счета
    * * @param { Object } formData - данные формы
    */
   updateCredit(formData) {
      return instance.post(`/editCredit`, formData);
   },
   /**
    * Удаление Счет зачисления
    * * @param { Object } formData - данные формы
    */
   deleteCredit(formData) {
      return instance.post(`/delCredit`, formData);
   },
   /**
    * Запрос на справочник Статья расходов
    */
   getExpenseItemEnum(formData) {
      return instance.post(`/getExpenseItemEnum`, formData).then(response => response.data);
   },
   /**
    * Статья расходов - новый
    * * @param { Object } formData - новый счет
    */
   addExpense(formData) {
      return instance.post(`/addExpenseItemEnum`, formData);
   },
   /**
    * Статья расходов - обновление счета
    * * @param { Object } formData - данные из формы
    */
   updateExpense(formData) {
      return instance.post(`/editExpenseItemEnum`, formData);
   },
   /**
    * Удаление Статья расходов
    * * @param { Object } formData - данные формы
    */
   deleteExpense(formData) {
      return instance.post(`/delExpenseItemEnum`, formData);
   },
   /**
    * Запрос на справочник Проекты
    */
   getProjectsEnum(formData) {
      return instance.post(`/getProjectsEnum`, formData).then(response => response.data);
   },
   /**
    * Запрос на статусы Проекты
    */
   getProjectStatuses(formData) {
      return instance.post(`/getProjectsStatus`, formData).then(response => response.data);
   },
   /**
    * Проекты - изменение бюджета проекта
    * * @param { Object } formData данные из формы
    */
   changeProjectBudget(formData) {
      return instance.post(`/changeProjectBudget`, formData);
   },
   /**
    * Запрос на справочник Контрагент
    * * * @param { Object } formData данные из формы
    */
   getContractorEnum(formData = '') {
      return instance.post(`/getContractorEnum`, formData).then(response => response.data);
   },
   /**
    * Запрос на имя Контрагент
    */
   getContractorInfo(formData) {
      return instance.post(`/getContractorInfo`, formData);
   },
   /**
    * Запрос на справочник Основание (документ)
    * @param { Object } formData - строка запроса в api
    */
   getDocumentEnum(formData) {
      return instance.post(`/getDocumentEnum`, formData).then(response => response.data);
   },
   /**
    * Запрос на справочник Сотрудники
    * * @param { Object } formData - строка запроса в api
    */
   getMembersEnum(formData) {
      return instance.post(`/getMembersEnum`, formData).then(response => response.data);
   },
   /**
    * Проекты - изменение бюджета проекта
    * * @param { Object } formData данные из формы + id проекта
    */
   changeMemberPrice(formData) {
      return instance.post(`/changeMemberPrice`, formData)
   },
   /**
    * Первоначальный импорт из битрикса департаментов и пользователей
    */
   importStaff(formData) {
      return instance.formData(`/importStaff`, formData).then(response => response.data);
   }
}

export const authAPI = {
   /**
    * Отправка формы авторизации
    * @param { Object } formData(login, password) - данные авторизации
    */
   login(formData) {
      return axios.post(`${BASE_URL}/login`, formData).then(response => response.data);
   },
   /**
    * Справочник ACL, с данными, какие разделы отображать
    */
   getAcl() {
      return instance.post(`/getAcl`).then(response => response.data);
   },

}


export const projectsAPI = {
   /**
    * Данные по проектам, распределенные по клиентам
    */
   getProjectsData(formData) {
      //return projectsData
      return instance.post(`/reportProject`, formData).then(response => response.data);
   },
}
export const membersAPI = {
   /**
    * Данные по сотрудникам(проекты, время)
    */
   getMembersData(formData) {
      //return membersData
      return instance.post(`/reportStaff`, formData).then(response => response.data);
   },
   /**
    * Данные по премиям
    */
   getAwardsData(formData) {
      //return awardsData
      return instance.post(`/reportAward`, formData).then(response => response.data);
   },
}


export const kanbanAPI = {
   /**
    * Данные по сотрудникам, Канбан(проекты, время)
    */
   getKanbanData(formData) {
      //return kanban
      return instance.post(`/kanban`, formData).then(response => response.data);
   },
}
