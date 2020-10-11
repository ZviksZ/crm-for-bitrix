import createMuiTheme             from "@material-ui/core/styles/createMuiTheme.js";
import React, {useEffect}         from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Loader}                   from "./components/common/Loader/Loader.jsx";
import {cookieUser}               from "./redux/authReducer.js";
import {getAppEnums}              from "./redux/thunk/enumsThunks.js";
import {useRoutes}                from "./routes.js";
import HelveticaNeue              from 'helvatica-neue-lt/index.css';
import { ThemeProvider }          from '@material-ui/styles';

const theme = createMuiTheme({
   typography: {
      fontFamily: [
         'Nunito',
         'Roboto',
         '"Helvetica Neue"',
         'Arial',
         'sans-serif'
      ].join(','),
   }
});

export const App = () => {
   const {isLoading, isAuth} = useSelector(state => ({
      isAuth: state.auth.isAuth,
      isLoading: state.common.isLoading
   }))


   const dispatch = useDispatch()
   const routes = useRoutes(isAuth);

   useEffect(() => {
      dispatch(cookieUser())
      // eslint-disable-next-line
   }, [])

   useEffect(() => {
      if (isAuth) {
         dispatch(getAppEnums())
      }
      // eslint-disable-next-line
   }, [isAuth])

   if (isLoading) {
      return <Loader/>
   }

   return (
      <ThemeProvider theme={theme}>
         <div className="App">
            {routes}
         </div>
      </ThemeProvider>

   );
}

export default App;
