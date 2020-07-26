import {enumsAPI}       from "../api/api.js";
import {formatDate}     from "../helpers/utils.js";

const SET_TOP_IN_FILTER = 'marginlab/main/SET_TOP_IN_FILTER';
const SET_TOP_OUT_FILTER = 'marginlab/main/SET_TOP_OUT_FILTER';

let initialState = {
   mainTopData: {
      moneyIn: {
         start: new Date(new Date().setDate(new Date().getDate() - 30)),
         finish: new Date()
      },
      moneyOut: {
         start: new Date(new Date().setDate(new Date().getDate() - 30)),
         finish: new Date()
      }
   }
};

const mainDataReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_TOP_IN_FILTER:
         return {
            ...state,
            mainTopData: {
               ...state.mainTopData,
               moneyIn: action.payload
            }
         }
      case SET_TOP_OUT_FILTER:
         return {
            ...state,
            mainTopData: {
               ...state.mainTopData,
               moneyOut: action.payload
            }
         }

      default:
         return state;
   }
}


export const setTopInFilter = (start, finish) => ({
   type: SET_TOP_IN_FILTER,
   payload: {start, finish}
})
export const setTopOutFilter = (start, finish) => ({
   type: SET_TOP_OUT_FILTER,
   payload: {start, finish}
})

export const setTopInOutFilter = (start, finish, isIn = false) => async (dispatch) => {

   if(isIn) {
      dispatch(setTopInFilter(start, finish))
   } else {
      dispatch(setTopOutFilter(start, finish))
   }
}


export default mainDataReducer;
