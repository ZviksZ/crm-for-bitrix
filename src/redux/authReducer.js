import {authAPI}                    from "../api/api.js";
import {Cookie}                     from "../helpers/cookie.js";
import {setFormData}                from "../helpers/utils.js";
import {getGlobalError, setLoading} from "./appReducer.js";

const SET_USER_DATA = 'marginlab/auth/SET_USER_DATA';
const SET_AUTH = 'marginlab/auth/SET_AUTH';
const SET_ACCESS = 'marginlab/auth/SET_ACCESS';

let initialState = {
   token: '',
   userId: null,
   img: '',
   name: '',
   isAuth: false,
   acl: null,
   accessItems: []
};

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_AUTH:
         return {
            ...state,
            isAuth: action.isAuth
         }
      case SET_USER_DATA:
         return {
            ...state,
            ...action.payload
         }
      case SET_ACCESS:
         return {
            ...state,
            accessItems: action.payload
         }
      default:
         return state;
   }
}
export const setUserData = (payload) => ({type: SET_USER_DATA, payload})
const setAuth = (isAuth) => ({type: SET_AUTH, isAuth})
const setAccess = (payload) => ({type: SET_ACCESS, payload})

/**
 * Вход в систему
 */
export const login = (login, password) => async (dispatch) => {
   const formData = setFormData({login, password})
   dispatch(setLoading(true))
   try {
      let response = await authAPI.login(formData)

      if (response?.token) {
         await dispatch(setUserData(response))
         let jsonResponse = await JSON.stringify(response)
         await Cookie.setCookie('userData', jsonResponse, {expires: 2147483647});
         let aclData = await authAPI.getAcl();
         dispatch(setAccess(aclData))
         dispatch(setAuth(true))
      } else {
         dispatch(setLoading(false))
         dispatch(getGlobalError('Введенные данные неверны', 'error'))
      }
   } catch (e) {
      dispatch(setLoading(false))
      dispatch(getGlobalError('Не удалось войти в систему', 'error'))

   }

};
/**
 * Выход из системы
 */
export const logoutUser = () => async (dispatch) => {
   dispatch(setAuth(false))
   dispatch(setUserData({token: '', userId: '', name: '', img: ''}))
   Cookie.deleteCookie('userData');
};
/**
 * Проверка, если в куках сохранен пользователь, то войти в систему
 */
export const cookieUser = () => async (dispatch) => {
   try {
      const cookies = Cookie.getCookie('userData');
      const data = JSON.parse(cookies + '')
      if (data && data.token) {
         dispatch(setUserData(data))
         dispatch(setAuth(true))
         let aclData = await authAPI.getAcl();
         dispatch(setAccess(aclData))
      }
   } catch (e) {

   }

}


export default authReducer;
