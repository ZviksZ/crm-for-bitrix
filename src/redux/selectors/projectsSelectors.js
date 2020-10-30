import {createSelector} from "reselect";
import _                from "lodash";

export const getProjectsClientData = state => state.projects.projectsClient;

export const getProjectsClientList = createSelector(getProjectsClientData, (projects) => {
      let result = [];
      let uniqueClientIds = [];

      if (projects && projects.data) {
         let data = projects.data.clients
         for (let i = 0; i < data.length; i++) {
            let id = data[i].id;
            let title = data[i]?.name ? data[i]?.name : '';
            if (!uniqueClientIds.includes(id)) {
               uniqueClientIds.push(id)
               result.push({id, title})
            }

         }
      }

      return result;
   })
export const getProjectsClientNames = createSelector(getProjectsClientData,(projects) => {
      let result = [];
      let uniqueClientIds = [];

      if (projects && projects.data) {
         let data = projects.data.clients
         for (let i = 0; i < data.length; i++) {
            let projectsList = data[i].projects;

            projectsList.forEach(item => {
               if (item.id && item.title) {
                  if (!uniqueClientIds.includes(item.id)) {
                     uniqueClientIds.push(item.id)
                     result.push({id: item.id, title: item.title})
                  }

               }
            })
         }
      }


      return result;
   })
export const getMinMaxProjectClient = createSelector(getProjectsClientData,(projects) => {
     let budgets = [];

      if (projects && projects.data) {
         let data = projects.data.clients
         for (let i = 0; i < data.length; i++) {
            let projectsList = data[i].projects;
            projectsList.forEach(item => {
               budgets.push(item.budget)
            })
         }
      }

      if (budgets.length === 0) {
         return {min: 0, max: 999999}
      }
      let min = _.minBy(budgets, function(o) { return _.parseInt(o); });
      let max = _.maxBy(budgets, function(o) { return _.parseInt(o); });

      return {
         min, max
      }
   })
export const getProjectsClientsSize = createSelector(getProjectsClientData,(projects) => {
      let size = 0;

      if (projects && projects.data) {
         let data = projects.data.clients;
         for (let i = 0; i < data.length; i++) {
            let projectsList = data[i].projects;
            projectsList.forEach(item => {
               size += 1;
            })
         }
      }


      return size
   })
export const getProjectsSummary = createSelector(getProjectsClientData, (projects) => {
      let sumData = {
         budget: 0,
         expenses: 0,
         expensesPeriod: 0,
         rest: 0,
         cost: 0,
         paid: 0,
         profit: 0
      };

      if (projects && projects.data) {
         let data = projects.data.clients;
         for (let i = 0; i < data.length; i++) {
            if (data[i].budget) {
               sumData.budget += _.parseInt(data[i].budget)
            }
            if (data[i].expenses) {
               sumData.expenses += _.parseInt(data[i].expenses)
            }
            if (data[i].expensesPeriod) {
               sumData.expensesPeriod += _.parseInt(data[i].expensesPeriod)
            }
            if (data[i].rest) {
               sumData.rest += _.parseInt(data[i].rest)
            }
            if (data[i].cost) {
               sumData.cost += _.parseInt(data[i].cost)
            }
            if (data[i].paid) {
               sumData.paid += _.parseInt(data[i].paid)
            }
            if (data[i].profit) {
               sumData.profit += _.parseInt(data[i].profit)
            }
         }
      }

      return sumData
   })
