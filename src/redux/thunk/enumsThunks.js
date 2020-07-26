/* Thunks, functions */
import {enumsAPI}                                                from "../../api/api.js";
import {addObjectToArray, formatDate, getArrayOfId, setFormData} from "../../helpers/utils.js";
import {getGlobalError, setLoading}                              from "../appReducer.js";
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
export const getAppEnums = () => async (dispatch) => {
   dispatch(setLoading(true))
   let projFormData = setFormData({
      start: formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1), true),
      finish: formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), true),
      status: [1, 2, 3]
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
   }).then(() => dispatch(setLoading(false))).catch((e) => {
      dispatch(getGlobalError('Загрузка одного или нескольких справочников не удалась', 'error'))
      dispatch(setLoading(false))
   })
}
export const getAllProjects = (startProjects) => async (dispatch) => {
   dispatch(setAllProjects(startProjects))
   const pageNum = Math.ceil(startProjects.size / 50);

   if (pageNum >= 2) {
      for (let i = 2; i <= pageNum; i++) {
         let formData = setFormData({
            client: null,
            status: null,
            budgetMin: null,
            budgetMax: null,
            start: null,
            finish: null,
            page: +i
         })
         let payload = await enumsAPI.getProjectsEnum(formData)

         await dispatch(setAllProjects(payload))
      }
   }
}
export const updateProjects = query => async (dispatch) => {
   try {
      const formData = setFormData({query})

      let payload = await enumsAPI.getProjectsEnum(formData)


      dispatch(setProjectsToForm(payload))
   } catch (e) {

   }
}

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
export const getMyContractorEnum = () => async (dispatch) => {
   const formData = setFormData({my: 1})
   try {
      let payload = await enumsAPI.getContractorEnum(formData)
      dispatch(setCreditEnum(payload))
   } catch (e) {
      //dispatch(setCreditEnum(payload))
   }
}

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
export const updateContractorName = (id) => async (dispatch) => {
   const formData = setFormData({id})
   let payload
   try {
      payload = await enumsAPI.getContractorInfo(formData)
   } catch (e) {
   }

   return payload
}

export const getGroupInfo = (id) => async (dispatch) => {
   const formData = setFormData({id})
   let payload
   try {
      payload = await enumsAPI.getGroupInfo(formData)
   } catch (e) {

   }

   return payload
}

export const projectEnumFilter = data => async (dispatch) => {
   //let status = JSON.stringify(getArrayOfId(data.status))
   //let client = JSON.stringify(getArrayOfId(data.client))

   let status = getArrayOfId(data.status)
   let client = getArrayOfId(data.client)
   console.log(status)
   console.log(client)
   const formData = setFormData({...data, status, client})
   try {
      let payload = await enumsAPI.getProjectsEnum(formData);


      dispatch(setProjectFilter(data))
      dispatch(updateProjectEnum(payload))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}

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

export const transEnumFilter = data => async (dispatch) => {


   const formData = setFormData({...data})
   try {
      let payload = await enumsAPI.getTransEnum(formData);

      dispatch(setTransFilter(data))
      dispatch(updateTransEnum(payload))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}
export const downloadAdditionalTransPages = data => async (dispatch) => {
   const formData = setFormData({...data})
   try {
      let payload = await enumsAPI.getTransEnum(formData);


      dispatch(additionalTransPages(payload))
   } catch (e) {
      dispatch(getGlobalError('Ошибка', 'error'))
   }
}
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
