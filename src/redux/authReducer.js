import {authAPI}                    from "../api/api.js";
import {Cookie}                     from "../helpers/cookie.js";
import {setFormData}                from "../helpers/utils.js";
import {getGlobalError, setLoading} from "./appReducer.js";

const SET_USER_DATA = 'marginlab/auth/SET_USER_DATA';
const SET_AUTH = 'marginlab/auth/SET_AUTH';

let initialState = {
   token: '',
   userId: null,
   img: '',
   name: '',
   isAuth: false
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
      default:
         return state;
   }
}
export const setUserData = (payload) => ({type: SET_USER_DATA, payload})
const setAuth = (isAuth) => ({type: SET_AUTH, isAuth})


export const login = (login, password) => async (dispatch) => {
   const formData = setFormData({login, password})
   dispatch(setLoading(true))
   try {
      let response = await authAPI.login(formData)

      await dispatch(setUserData(response))
      dispatch(setLoading(false))
      if (response?.token) {
         dispatch(setAuth(true))
         let jsonResponse = await JSON.stringify(response)
         await Cookie.setCookie('userData', jsonResponse, {expires: 2147483647});
      } else {
         dispatch(getGlobalError('Введенные данные неверны', 'error'))
      }

      /*

       */
   } catch (e) {
      dispatch(getGlobalError('Бюджет не изменен', 'error'))
   }

};
export const logoutUser = () => async (dispatch) => {
   dispatch(setAuth(false))
   dispatch(setUserData({token: '',userId: '',name: '',img: ''}))
   Cookie.deleteCookie('userData');
};

export const cookieUser = () => async (dispatch) => {
   try {
      const cookies = Cookie.getCookie('userData');
      const data = JSON.parse(cookies + '')
      if (data && data.token) {
         dispatch(setUserData(data))
         dispatch(setAuth(true))
      }
   } catch (e) {

   }

}


export default authReducer;
