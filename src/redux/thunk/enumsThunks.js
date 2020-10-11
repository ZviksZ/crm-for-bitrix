/* Thunks, functions */
import {enumsAPI}                                                from "../../api/api.js";
import {getDatePeriod}                                           from "../../helpers/getDatePeriod.js";
import {addObjectToArray, formatDate, getArrayOfId, setFormData} from "../../helpers/utils.js";
import {getGlobalError, setEnumsLoaded, setLoading}              from "../appReducer.js";
import {
   addCredit, addExpense, additionalProjectPages, additionalTransPages, queryContactor,
   setAllProjects,
   setBitrixEnums,
   setCreditAdditional,
   setCreditAdditionalBasic, setCreditEnum,
   setEnums,
   setMemberPrice,
   setProjectBudget, setProjectFilter,
   setProjectStatuses,
   setProjectsToForm, setTransFilter, updateMembersEnum, updateProjectEnum, updateTransEnum
}                                                                from "../enumsReducer.js";
/**
 * Получение справочников битрикса
 */
export const getBitrixEnums = () => async (dispatch) => {
   try {
      await Promise.all([
         enumsAPI.getGroupEnum(),
         enumsAPI.getContractorEnum(),
         enumsAPI.getDocumentEnum()
      ]).then(async (res) => {

         //dispatch(setBitrixEnums(res[0], res[1]))
         dispatch(setBitrixEnums(res[0], res[1], res[2]))
      })
   } catch (e) {
      dispatch(setBitrixEnums())
   }
}
/**
 * Получение всех необходимых справочников при загрузке приложения
 */
export const getAppEnums = () => async (dispatch) => {
   dispatch(setLoading(true))
   let projFormData = setFormData({
      start: formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1), true),
      finish: formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), true),
      status: [1, 2, 3],
      period: [1, 2]
   })
   Promise.all([
      enumsAPI.getCreditAccountEnum(),
      enumsAPI.getExpenseItemEnum(),
      enumsAPI.getProjectsEnum(projFormData),
      enumsAPI.getMembersEnum(),
      enumsAPI.getProjectStatuses(),
      enumsAPI.getCreditStatuses(),
      enumsAPI.getCreditCurrency(),
      enumsAPI.getCreditType(),
      enumsAPI.getTransEnum(),

      enumsAPI.getProjectsEnum(),
   ]).then(async (res) => {
      await dispatch(getBitrixEnums())

      dispatch(setEnums(res[0], res[1], res[2], res[3], res[8]))
      dispatch(setProjectsToForm(res[9]))
      await dispatch(getAllProjects(res[9]))
      dispatch(setProjectStatuses(res[4]))

      dispatch(setCreditAdditional(addObjectToArray(res[5]), addObjectToArray(res[6]), addObjectToArray(res[7])))
      dispatch(setCreditAdditionalBasic(res[5], res[6], res[7]))
      //dispatch(setImportStaff(res[10]))
   }).then(() => {
      dispatch(setLoading(false))
      dispatch(setEnumsLoaded(true))
   }).catch((e) => {
      dispatch(getGlobalError('Загрузка одного или нескольких справочников не удалась', 'error'))
      dispatch(setLoading(false))
   })
}
/**
 * Получить все проекты
 */
export const getAllProjects = (startProjects) => async (dispatch) => {
   dispatch(setAllProjects(startProjects))
   const pageNum = Math.ceil(startProjects.size / 50);

   if (pageNum >= 2) {
      for (let i = 2; i <= pageNum; i++) {
         let {dateFrom, dateTo} = getDatePeriod(8);
         let formData = setFormData({
            client: null,
            status: null,
            budgetMin: null,
            budgetMax: null,
            start: dateFrom,
            finish: dateTo,
            page: +i
         })
         let payload = await enumsAPI.getProjectsEnum(formData)

         await dispatch(setAllProjects(payload))
      }
   }
}
/**
 * Обновить справочник проектов
 */
export const updateProjects = query => async (dispatch) => {
   try {
      const formData = setFormData({query})

      let payload = await enumsAPI.getProjectsEnum(formData)


      dispatch(setProjectsToForm(payload))
   } catch (e) {

   }
}
/**
 * Изменение бюджета проекта
 */
export const changeBudget = (projectId, newBudget) => async (dispatch) => {
   let {date, budget, comment, author} = newBudget
   budget = budget.replace(/\s+/g, '');
   newBudget = {date, budget, comment, author}
   const formData = setFormData({id: projectId, date, budget, comment, author})

   try {
      await enumsAPI.changeProjectBudget(formData)
      dispatch(setProjectBudget(projectId, newBudget))

      let projUpdate = await enumsAPI.getProjectsEnum()
      await dispatch(getAllProjects(projUpdate))
      dispatch(getGlobalError('Бюджет изменен', 'success'))
   } catch (e) {
      dispatch(getGlobalError('Бюджет не изменен', 'error'))
   }
}
/**
 * Изменение ставки сотрудника
 */
export const changeMemberPrice = (memberId, newBudget) => async (dispatch) => {
   let {date, budget, comment, author} = newBudget
   budget = budget.replace(/\s+/g, '');
   newBudget = {date, budget, comment, author}
   const formData = setFormData({id: memberId, date, budget, comment, author})
   try {
      await enumsAPI.changeMemberPrice(formData)
      dispatch(setMemberPrice(memberId, newBudget))
      dispatch(getGlobalError('Ставка изменена', 'success'))
   } catch (e) {
      dispatch(getGlobalError('Ставка не изменена', 'error'))
   }
}
/**
 * Обновить счет
 */
export const updateCreditItem = (data) => async (dispatch) => {
   try {
      let {title, entity, type, currency, balance, status, id, comment} = data;
      balance = balance.replace(/\s+/g, '');
      const formData = setFormData({title, entity, type, currency, status, id, balance, comment})

      await enumsAPI.updateCredit(formData)
      let payload = await enumsAPI.getCreditAccountEnum()
      dispatch(addCredit(payload))
      dispatch(getGlobalError('Данные обновлены', 'success'))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}
/**
 * Добавить счет
 */
export const addCreditItem = (data) => async (dispatch) => {
   let {title, entity, type, status, currency, balance,comment} = data;

   balance = balance.replace(/\s+/g, '');

   const formData = setFormData({title, entity, type, status, currency, balance,comment})
   try {
      await enumsAPI.addCredit(formData)
      let payload = await enumsAPI.getCreditAccountEnum()
      dispatch(addCredit(payload))
      dispatch(getGlobalError('Счет создан', 'success'))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}
/**
 * Удалить счет
 */
export const deleteCreditItem = id => async (dispatch) => {
   const formData = setFormData({id})
   try {
      await enumsAPI.deleteCredit(formData)
      let payload = await enumsAPI.getCreditAccountEnum()
      dispatch(addCredit(payload))
      dispatch(getGlobalError('Счет удален', 'success'))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}
/**
 * Получение своих юр.лиц
 */
export const getMyContractorEnum = () => async (dispatch) => {
   const formData = setFormData({my: 1})
   try {
      let payload = await enumsAPI.getContractorEnum(formData)
      dispatch(setCreditEnum(payload))
   } catch (e) {
      //dispatch(setCreditEnum(payload))
   }
}
/**
 * Обновить статью
 */
export const updateExpenseItem = (data) => async (dispatch) => {
   let {title, parent, consumption, income, id} = data;
   parent = parent === '' ? 0 : parent

   const formData = setFormData({title, parent, consumption, income, id})
   try {
      await enumsAPI.updateExpense(formData)
      let payload = await enumsAPI.getExpenseItemEnum()
      dispatch(addExpense(payload))
      dispatch(getGlobalError('Данные обновлены', 'success'))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}
/**
 * Добавить статью
 */
export const addExpenseItem = (data) => async (dispatch) => {
   let {title, parent, consumption, income} = data;
   parent = parent === '' ? 0 : parent

   const formData = setFormData({title, parent, consumption, income})
   try {
      await enumsAPI.addExpense(formData);
      let payload = await enumsAPI.getExpenseItemEnum()
      dispatch(addExpense(payload))
      dispatch(getGlobalError('Статья создана', 'success'))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}
/**
 * Удаление статей
 */
export const deleteExpenseItem = id => async (dispatch) => {
   const formData = setFormData({id})
   try {
      await enumsAPI.deleteExpense(formData)
      let payload = await enumsAPI.getExpenseItemEnum()
      dispatch(addExpense(payload))
      dispatch(getGlobalError('Статья удалена', 'success'))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}
/**
 * Загрузка данных юр.лица
 */
export const updateContractorEnum = (query) => async (dispatch) => {
   const formData = setFormData({query})
   let payload = []
   try {
      await enumsAPI.getContractorEnum(formData).then(res => {
         payload = res
      });
      dispatch(queryContactor(payload))
   } catch (e) {
   }
}
/**
 * Загрузка данных юр.лица
 */
export const updateContractorName = (id) => async (dispatch) => {
   const formData = setFormData({id})
   let payload
   try {
      payload = await enumsAPI.getContractorInfo(formData)
   } catch (e) {
   }

   return payload
}
/**
 * Загрузка справочника клиентов
 */
export const getGroupInfo = (id) => async (dispatch) => {
   const formData = setFormData({id})
   let payload
   try {
      payload = await enumsAPI.getGroupInfo(formData)
   } catch (e) {

   }

   return payload
}
/**
 * Фильтрация проектов
 */
export const projectEnumFilter = (data, isDateChange = false) => async (dispatch) => {
   let status = getArrayOfId(data.status)
   let client = getArrayOfId(data.client)
   let period = getArrayOfId(data.period)

   if (isDateChange) {
      data = {
         ...data,
         page: 1,
         client: null,
         status: null,
         budgetMin: null,
         budgetMax: null,
         period: null
      }
   }

   const formData = setFormData({...data, status, client, period})

   try {
      let payload = await enumsAPI.getProjectsEnum(formData);

      dispatch(setProjectFilter(data))
      dispatch(updateProjectEnum(payload))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}
/**
 * Загрузка дополнительных страниц для проектов
 */
export const downloadAdditionalProjectPages = data => async (dispatch) => {
   let status = getArrayOfId(data.status)
   let client = getArrayOfId(data.client)

   const formData = setFormData({...data, status, client})
   try {
      let payload = await enumsAPI.getProjectsEnum(formData);


      dispatch(additionalProjectPages(payload))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}
/**
 * Фильтрация транзакций
 */
export const transEnumFilter = (data, isDateChange = false) => async (dispatch) => {
   if (isDateChange) {
      data = {
         ...data,
         page: 1,
         contragent: null,
         type: null,
         bank_account_in: null,
         plan: null
      }
   }
   const formData = setFormData({...data})
   try {
      let payload = await enumsAPI.getTransEnum(formData);

      dispatch(setTransFilter(data))
      dispatch(updateTransEnum(payload))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}
/**
 * Загрузка дополнительных страниц для транзакций
 */
export const downloadAdditionalTransPages = data => async (dispatch) => {
   const formData = setFormData({...data})
   try {
      let payload = await enumsAPI.getTransEnum(formData);


      dispatch(additionalTransPages(payload))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}
/**
 * Фильтрация справочника сотрудников
 */
export const membersEnumFilter = data => async (dispatch) => {
   const formData = setFormData({...data})
   try {
      let payload = await enumsAPI.getMembersEnum(formData);


      dispatch(updateMembersEnum(payload))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}
/* END--Thunks, functions */
