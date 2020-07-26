import {createSelector} from "reselect";
import _                     from "lodash";

export const getCreditAccountEnum = state => state.enum.enums.creditAccountEnum;
export const getProjectStatuses = state => state.enum.projectStatuses;
export const getAllProjects = state => state.enum.enums.allProjects;

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

export const getMinMaxBudget = createSelector(
   getAllProjects,
   (projects) => {

      if (!projects) {
         return {min: 0, max: 999999}
      }
      let min = _.minBy(projects?.data, function(o) { return _.parseInt(o.budget); }).budget;
      let max = _.maxBy(projects?.data, function(o) { return _.parseInt(o.budget); }).budget;

      return {
         min, max
      }
   }
)
