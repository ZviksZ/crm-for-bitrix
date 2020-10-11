import React                     from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import AddModal                  from "./components/common/AddModal/AddModal.jsx";
import {GlobalMessage}           from "./components/common/GlobalMessage/GlobalMessage.jsx";
import Navbar                    from "./components/common/Navbar/Navbar.jsx";
import Sidebar                   from "./components/common/Sidebar/Sidebar.jsx";
import {AuthPage}                from "./components/pages/AuthPage/AuthPage.jsx";
import {AwardsPage}              from "./components/pages/AwardsPage/AwardsPage.jsx";
import {DemoPage}                from "./components/pages/DemoPage/DemoPage.jsx";
import {EnumsPage}               from "./components/pages/EnumsPage/EnumsPage.jsx";
import {MainPage}                from "./components/pages/MainPage/MainPage.jsx";
import {MembersPage}             from "./components/pages/MembersPage/MembersPage.jsx";
import {ProjectsPage}            from "./components/pages/ProjectsPage/ProjectsPage.jsx";
import {TransactionPage}         from "./components/pages/TransactionPage/TransactionPage.jsx";

export const useRoutes = (isAuthenticated = false) => {
   if (isAuthenticated) {
      return (
         <div>
            <Navbar/>
            <AddModal/>
            <GlobalMessage />
            <div className="main__wrapper">
               <Sidebar/>
               <div className="main__content">
                  <Switch>
                     <Route exact path="/">
                       <MainPage/>
                     </Route>
                     <Route exact path="/demo-graph">
                       <DemoPage/>
                     </Route>
                     <Route path="/transactions">
                        <TransactionPage/>
                     </Route>
                     <Route path="/projects">
                        <ProjectsPage />
                     </Route>
                     <Route path="/members">
                        <MembersPage />
                     </Route>
                     <Route path="/enums">
                        <EnumsPage/>
                     </Route>
                     <Route path="/awards">
                        <AwardsPage/>
                     </Route>

                     <Route path="/"
                            render={() => <Redirect to='/'/>}/>
                  </Switch>
               </div>

            </div>
         </div>
      )
   }

   return (
      <div className="main__wrapper-outer flex-center">
         <Navbar/>
         <GlobalMessage />
         <Switch>
            <Route path="/" >
               <AuthPage/>
            </Route>
         </Switch>
      </div>
   )
}
