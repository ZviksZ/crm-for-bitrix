import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware                                          from 'redux-thunk';
import appReducer                                               from "./appReducer.js";
import authReducer                                              from "./authReducer.js";
import enumsReducer                                             from "./enumsReducer.js";
import mainDataReducer                                             from "./mainDataReducer.js";


let reducers = combineReducers({
   common: appReducer,
   enum: enumsReducer,
   auth: authReducer,
   mainData: mainDataReducer
});


let store = createStore(reducers, compose(
   applyMiddleware(thunkMiddleware)
));
/*window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/
export default store;
