import React                     from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import AddModal                  from "./components/common/AddModal/AddModal.jsx";
import {GlobalMessage}   from "./components/common/GlobalMessage/GlobalMessage.jsx";
import Navbar            from "./components/common/Navbar/Navbar.jsx";
import Sidebar           from "./components/common/Sidebar/Sidebar.jsx";
import {AuthPage}        from "./components/pages/AuthPage/AuthPage.jsx";
import {AwardsPage}      from "./components/pages/AwardsPage/AwardsPage.jsx";
import {DemoPage}                         from "./components/pages/DemoPage/DemoPage.jsx";
import {EnumsPage}                        from "./components/pages/EnumsPage/EnumsPage.jsx";
import {KanbanPage}                       from "./components/pages/KanbanPage/KanbanPage.jsx";
import {MainPage}                         from "./components/pages/MainPage/MainPage.jsx";
import {MembersPage}                      from "./components/pages/MembersPage/MembersPage.jsx";
import {ProjectsPage}                     from "./components/pages/ProjectsPage/ProjectsPage.jsx";
import {TransactionPage}                  from "./components/pages/TransactionPage/TransactionPage.jsx";
import {getRoutesChilds, getUniqueRoutes} from "./helpers/utils.js";

export const useRoutes = (isAuthenticated = false, accessItems = []) => {
   if (isAuthenticated && accessItems.length) {
      return (
         <div>
            <Navbar/>
            {
               accessItems.includes(7) || accessItems.includes(8) ? <AddModal/> : ''
            }
            <GlobalMessage />
            <div className="main__wrapper">
               <Sidebar/>
               <div className="main__content">
                  <Switch>
                     {
                        accessItems.includes(2) &&  <Route exact path="/">
                           <MainPage/>
                        </Route>
                     }

                    {/* <Route exact path="/demo-graph">
                       <DemoPage/>
                     </Route>*/}
                     {
                        accessItems.includes(1) && <Route path="/transactions">
                           <TransactionPage/>
                        </Route>
                     }
                     {
                        accessItems.includes(4) && <Route path="/projects">
                           <ProjectsPage />
                        </Route>
                     }
                     {
                        accessItems.includes(5) &&  <Route path="/members">
                           <MembersPage />
                        </Route>
                     }
                     {
                        accessItems.includes(3) &&  <Route path="/enums">
                           <EnumsPage/>
                        </Route>
                     }
                     {
                        accessItems.includes(6) &&  <Route path="/awards">
                           <AwardsPage/>
                        </Route>
                     }
                     {
                        accessItems.includes(9) &&  <Route path="/kanban">
                           <KanbanPage/>
                        </Route>
                     }
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
