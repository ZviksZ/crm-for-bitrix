import {createSelector} from "reselect";
import _                     from "lodash";

export const getCreditAccountEnum = state => state.enum.enums.creditAccountEnum;
export const getProjectStatuses = state => state.enum.projectStatuses;
export const getAllProjects = state => state.enum.enums.projectsEnum;
export const getTransactionEnum = state => state.enum.enums.transactionEnum;
export const getAllEnums = state => state.enum.enums;
export const getGroupEnum = state => state.enum.enums.groupEnum;

export const getUniqueEntity = createSelector(
   getCreditAccountEnum,
   (creditAccountEnum) => {
         let result = [];

         for (let item of creditAccountEnum) {
            if (!result.includes(item.entity)) {
               result.push(item.entity);
            }
         }
         return result;
   }
)

export const getProjectStatusesArray = createSelector(
   getProjectStatuses,
   (projectStatuses) => {
      let result = [];
      if (projectStatuses) {
         for (let key in projectStatuses) {
            result.push({id: key, title: projectStatuses[key]})
         }
      }
      return result;
   }
)

export const getTransactionsWithNames = createSelector(
   getTransactionEnum,
   getAllEnums,
   (transEnum, allEnums) => {
      if (transEnum && transEnum.data) {
         for (let i = 0; i < transEnum.data.length; i++) {
            let contractorName = '';
            let projectName = '';

            if (transEnum.data[i]?.contragent) {
               contractorName = allEnums.contractorEnum.find(item => item.id == transEnum.data[i].contragent)?.title || '';
            }
            if (transEnum.data[i]?.consider_id) {
               allEnums.allProjects.data.forEach(val => {
                  if (val.id == transEnum.data[i].consider_id) {
                     projectName = val.title
                  }
               })
            }
            transEnum.data[i] = {...transEnum.data[i], contractorName, projectName}
         }
      }


      return transEnum;
   }
)

export const getMinMaxBudget = createSelector(
   getAllProjects,
   (projects) => {
      if (!projects || projects.data.length === 0) {
         return {min: 0, max: 999999}
      }
      let min = _.minBy(projects?.data, function(o) { return _.parseInt(o.budget); }).budget || 0;
      let max = _.maxBy(projects?.data, function(o) { return _.parseInt(o.budget); }).budget || 0;

      return {
         min, max
      }
   }
)

export const getFilterClientsEnum = createSelector(
   getAllProjects,
   getGroupEnum,
   (projects, clients) => {

      let uniqueEntity = [];

      projects.data.forEach(item => {
         if (!uniqueEntity.includes(item.client)) {
            uniqueEntity.push(item.client);
         }
      })

      let clientsArr = [];

      clients.forEach(item => {
         if (uniqueEntity.includes(item.id)) {
            clientsArr.push(item)
         }
      })

      return clientsArr
   }
)

export const getFilterStatusEnum = createSelector(
   getAllProjects,
   getProjectStatuses,
   (projects, statuses) => {
     let uniqueEntity = [];

      projects.data.forEach(item => {
         if (!uniqueEntity.includes(item.status)) {
            uniqueEntity.push(item.status);
         }
      })

      let result = [];
      if (statuses) {
         for (let key in statuses) {
            result.push({id: key, title: statuses[key]})
         }
      }

      let statusesArr = [];

      result.forEach(item => {
         if (uniqueEntity.includes(+item.id)) {
            statusesArr.push(item)
         }
      })

      return statusesArr
   }
)
