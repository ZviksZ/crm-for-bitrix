import {$contractorEnum, $documentEnum, $groupEnum} from "../helpers/enums.js";
import {formatDate}                                 from "../helpers/utils.js";

/* Constants */
const SET_ENUMS = 'marginlab/enums/SET_ENUMS';
const SET_BITRIX_ENUMS = 'marginlab/enums/SET_BITRIX_ENUMS';
const SET_PROJECT_MEMBER_FORM = 'marginlab/enums/SET_PROJECT_MEMBER_FORM';
const CLOSE_PROJECT_MEMBER_FORM = 'marginlab/enums/CLOSE_PROJECT_MEMBER_FORM';
const SET_PROJECT_BUDGET = 'marginlab/enums/SET_PROJECT_BUDGET';
const SET_MEMBER_PRICE = 'marginlab/enums/SET_MEMBER_PRICE';
const OPEN_CREDIT_FORM = 'marginlab/enums/OPEN_CREDIT_FORM';
const CLOSE_CREDIT_FORM = 'marginlab/enums/CLOSE_CREDIT_FORM';
const OPEN_EXPENSE_FORM = 'marginlab/enums/OPEN_EXPENSE_FORM';
const CLOSE_EXPENSE_FORM = 'marginlab/enums/CLOSE_EXPENSE_FORM';
const SET_PROJECT_STATUSES = 'marginlab/enums/SET_PROJECT_STATUSES';
const SET_CREDIT_ADDITIONAL = 'marginlab/enums/SET_CREDIT_ADDITIONAL';
const SET_CREDIT_ADDITIONAL_BASIC = 'marginlab/enums/SET_CREDIT_ADDITIONAL_BASIC';
const SET_IMPORT_STAFF = 'marginlab/enums/SET_IMPORT_STAFF';
const ADD_CREDIT = 'marginlab/enums/ADD_CREDIT';
const ADD_EXPENSE = 'marginlab/enums/ADD_EXPENSE';
const QUERY_CONTACTOR = 'marginlab/enums/QUERY_CONTACTOR';
const SET_TRANS = 'marginlab/enums/SET_TRANS';
const UPDATE_PROJECT_ENUM = 'marginlab/enums/UPDATE_PROJECT_ENUM';
const UPDATE_MEMBERS_ENUM = 'marginlab/enums/UPDATE_MEMBERS_ENUM';
const ADDITIONAL_PROJECT_PAGES = 'marginlab/enums/ADDITIONAL_PROJECT_PAGES';
const SET_PROJECT_FILTER = 'marginlab/enums/SET_PROJECT_FILTER';
const UPDATE_TRANS_ENUM = 'marginlab/enums/UPDATE_TRANS_ENUM';
const ADDITIONAL_TRANS_PAGES = 'marginlab/enums/ADDITIONAL_TRANS_PAGES';
const SET_TRANS_FILTER = 'marginlab/enums/SET_TRANS_FILTER';
const SET_MY_CREDIT_ENUM = 'marginlab/enums/SET_MY_CREDIT_ENUM';
const SET_PROJECTS_TO_FORM = 'marginlab/enums/SET_PROJECTS_TO_FORM';
const SET_ALL_PROJECTS = 'marginlab/enums/SET_ALL_PROJECTS';
/* END--Constants */


let initialState = {
   enums: {
      creditAccountEnum: [],
      expenseItemEnum: [],
      projectsEnum: {},
      contractorEnum: [],
      documentEnum: [],
      membersEnum: [],
      transactionEnum: {},
      groupEnum: [],
      projectsToForm: {},
      allProjects: {
         data: []
      }
   },
   importStaff: [],
   projectStatuses: null,
   projectMemberForm: {
      isOpen: false,
      itemId: '',
      title: '',
      comments: '',
      apiMethod: ''
   },
   projectFilter: {
      client: null,
      status: [
         {id: '1', title: "Новый"},
         {id: '2', title: "Ожидает выполнения"},
         {id: '3', title: "В работе"}
      ],
      period: [{id: 1, title: 'Разовый'}, {id: 2, title: 'Ежемесячный'}],
      budgetMin: null,
      budgetMax: null,
      start: formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1), true),
      finish: formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), true),
      page: 1
   },
   creditAdditional: {
      statuses: [],
      currency: [],
      type: []
   },
   creditAdditionalBasic: {
      statuses: null,
      currency: null,
      type: null
   },
   creditForm: {
      isOpen: false,
      entityData: {},
      itemData: null,
      entityTitle: ''
   },
   myCreditEnum: [],
   expenseForm: {
      isOpen: false,
      expenseData: {},
      itemData: null
   },
   transFilter: {
      contragent: null,
      type: null,
      bank_account_in: null,
      plan: null,
      start: null,
      finish: null,
      page: 1
   }
};
/* Reducer */
const enumsReducer = (state = initialState, action) => {
   switch (action.type) {
      case QUERY_CONTACTOR:
         return {
            ...state,
            enums: {
               ...state.enums,
               contractorEnum: action.payload
            }
         }
      case SET_ENUMS:
         return {
            ...state,
            enums: {...state.enums, ...action.payload}
         }
      case SET_BITRIX_ENUMS:
         return {
            ...state,
            enums: {...state.enums, ...action.payload}
         }
      case SET_PROJECTS_TO_FORM:
         return {
            ...state,
            enums: {...state.enums, projectsToForm: action.payload}
         }
      case SET_ALL_PROJECTS:
         return {
            ...state,
            enums: {
               ...state.enums,
               allProjects: {
                  ...state.enums.allProjects,
                  data: [...state.enums.allProjects.data, ...action.payload.data],
                  size: action.payload.size,
                  page: action.payload.page
               }
            }
         }
      case SET_PROJECT_MEMBER_FORM:
         return {
            ...state,
            projectMemberForm: {
               isOpen: true,
               itemId: action.item.id,
               title: action.title,
               budgetHistory: action.item.budgetHistory,
               apiMethod: action.apiMethod
            }
         }
      case CLOSE_PROJECT_MEMBER_FORM:
         return {
            ...state,
            projectMemberForm: {
               isOpen: false,
               itemId: '',
               title: '',
               budgetHistory: '',
               apiMethod: ''
            }
         }
      case SET_PROJECT_BUDGET:
         return {
            ...state,
            enums: {
               ...state.enums,
               projectsEnum: {
                  ...state.enums.projectsEnum, data: state.enums.projectsEnum.data.map(item => {
                     if (item.id === action.itemId) {
                        return {
                           ...item,
                           budget: action.newBudget.budget,
                           budgetHistory: [action.newBudget, ...item.budgetHistory]
                        }
                     }
                     return item
                  })
               }
            }
         }
      case SET_MEMBER_PRICE:
         return {
            ...state,
            enums: {
               ...state.enums,
               membersEnum: state.enums.membersEnum.map(item => {
                  if (item.id === action.itemId) {
                     return {
                        ...item,
                        budget: action.newBudget.budget,
                        budgetHistory: [action.newBudget, ...item.budgetHistory]
                     }
                  } else {
                     return item
                  }
               })
            }
         }
      case OPEN_CREDIT_FORM:
         return {
            ...state,
            creditForm: {
               isOpen: true,
               entityData: action.entityData,
               itemData: action.itemData,
               entityTitle: action.entityTitle
            }
         }
      case CLOSE_CREDIT_FORM:
         return {
            ...state,
            creditForm: {
               isOpen: false,
               entityData: {},
               itemData: {}
            }
         }
      case OPEN_EXPENSE_FORM:
         return {
            ...state,
            expenseForm: {
               isOpen: true,
               expenseData: action.expenseData,
               itemData: action.itemData
            }
         }
      case CLOSE_EXPENSE_FORM:
         return {
            ...state,
            expenseForm: {
               isOpen: false,
               expenseData: {},
               itemData: {}
            }
         }
      case SET_PROJECT_STATUSES:
         return {
            ...state,
            projectStatuses: action.payload
         }
      case SET_CREDIT_ADDITIONAL:
         return {
            ...state,
            creditAdditional: {
               statuses: action.statuses,
               currency: action.currency,
               type: action.types
            }
         }
      case SET_CREDIT_ADDITIONAL_BASIC:
         return {
            ...state,
            creditAdditionalBasic: {
               statuses: action.statuses,
               currency: action.currency,
               type: action.types
            }
         }
      case SET_IMPORT_STAFF:
         return {
            ...state,
            importStaff: action.payload
         }
      case ADD_CREDIT:
         return {
            ...state,
            enums: {
               ...state.enums,
               creditAccountEnum: action.payload
            }
         }
      case ADD_EXPENSE:
         return {
            ...state,
            enums: {
               ...state.enums,
               expenseItemEnum: action.payload
            }
         }
      case SET_TRANS:
         return {
            ...state,
            enums: {
               ...state.enums,
               transactionEnum: action.payload
            }
         }
      case UPDATE_PROJECT_ENUM:
         return {
            ...state,
            enums: {
               ...state.enums,
               projectsEnum: action.payload
            }
         }
      case UPDATE_MEMBERS_ENUM:
         return {
            ...state,
            enums: {
               ...state.enums,
               membersEnum: action.payload
            }
         }
      case ADDITIONAL_PROJECT_PAGES:
         return {
            ...state,
            enums: {
               ...state.enums,
               projectsEnum: {
                  ...state.enums.projectsEnum,
                  data: [...state.enums.projectsEnum.data, ...action.payload.data],
                  size: action.payload.size,
                  page: action.payload.page
               }
            }
         }
      case SET_PROJECT_FILTER:
         return {
            ...state,
            projectFilter: {...state.projectFilter, ...action.payload},
         }
      case UPDATE_TRANS_ENUM:
         return {
            ...state,
            enums: {
               ...state.enums,
               transactionEnum: action.payload
            }
         }
      case ADDITIONAL_TRANS_PAGES:
         return {
            ...state,
            enums: {
               ...state.enums,
               transactionEnum: {
                  ...state.enums.transactionEnum,
                  data: [...state.enums.transactionEnum.data, ...action.payload.data],
                  size: action.payload.size,
                  page: action.payload.page
               }
            }
         }
      case SET_TRANS_FILTER:
         return {
            ...state,
            transFilter: {...state.transFilter, ...action.payload},
         }
      case SET_MY_CREDIT_ENUM:
         return {
            ...state,
            myCreditEnum: action.payload
         }
      default:
         return state;
   }
}
/* END -- Reducer */

/* Action creators */
export const setEnums = (creditAccountEnum = [], expenseItemEnum = [], projectsEnum = {}, membersEnum = [], transactionEnum = {}) => ({
   type: SET_ENUMS,
   payload: {creditAccountEnum, expenseItemEnum, projectsEnum, membersEnum, transactionEnum}
})
export const setBitrixEnums = (groupEnum = $groupEnum, contractorEnum = $contractorEnum, documentEnum = $documentEnum) => ({
   type: SET_BITRIX_ENUMS,
   payload: {groupEnum, contractorEnum, documentEnum}
})
export const openProjectMemberForm = (item, apiMethod, title) => ({type: SET_PROJECT_MEMBER_FORM, item, apiMethod, title})
export const closeProjectMemberForm = () => ({type: CLOSE_PROJECT_MEMBER_FORM})
export const setProjectBudget = (itemId, newBudget) => ({type: SET_PROJECT_BUDGET, itemId, newBudget})
export const setMemberPrice = (itemId, newBudget) => ({type: SET_MEMBER_PRICE, itemId, newBudget})
export const openCreditForm = (entityData, itemData, entityTitle) => ({type: OPEN_CREDIT_FORM, entityData, itemData, entityTitle})
export const closeCreditForm = () => ({type: CLOSE_CREDIT_FORM})
export const openExpenseForm = (expenseData, itemData) => ({type: OPEN_EXPENSE_FORM, expenseData, itemData})
export const closeExpenseForm = () => ({type: CLOSE_EXPENSE_FORM})
export const setProjectStatuses = (payload) => ({type: SET_PROJECT_STATUSES, payload})
export const setImportStaff = (payload) => ({type: SET_IMPORT_STAFF, payload})
export const setCreditAdditional = (statuses, currency, types) => ({type: SET_CREDIT_ADDITIONAL, statuses, currency, types})
export const setCreditAdditionalBasic = (statuses, currency, types) => ({type: SET_CREDIT_ADDITIONAL_BASIC, statuses, currency, types})
export const addCredit = (payload) => ({type: ADD_CREDIT, payload})
export const addExpense = (payload) => ({type: ADD_EXPENSE, payload})
export const queryContactor = (payload) => ({type: QUERY_CONTACTOR, payload})
export const setTrans = (payload) => ({type: SET_TRANS, payload})
export const updateProjectEnum = (payload) => ({type: UPDATE_PROJECT_ENUM, payload})
export const updateMembersEnum = (payload) => ({type: UPDATE_MEMBERS_ENUM, payload})
export const additionalProjectPages = (payload) => ({type: ADDITIONAL_PROJECT_PAGES, payload})
export const setProjectFilter = (payload) => ({type: SET_PROJECT_FILTER, payload})
export const updateTransEnum = (payload) => ({type: UPDATE_TRANS_ENUM, payload})
export const additionalTransPages = (payload) => ({type: ADDITIONAL_TRANS_PAGES, payload})
export const setTransFilter = (payload) => ({type: SET_TRANS_FILTER, payload})
export const setCreditEnum = (payload) => ({type: SET_MY_CREDIT_ENUM, payload})
export const setProjectsToForm = payload => ({type: SET_PROJECTS_TO_FORM, payload})
export const setAllProjects = payload => ({type: SET_ALL_PROJECTS, payload})
/* END -- Action creators */


export default enumsReducer;
