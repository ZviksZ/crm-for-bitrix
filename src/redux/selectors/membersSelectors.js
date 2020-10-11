import _                       from "lodash";
import {createSelector}        from "reselect";
import {getProjectsClientData} from "./projectsSelectors.js";

export const getMembersData = state => state.members.members;
export const getAwardsData = state => state.members.awards;


export const getMembersClientList = createSelector(
   getMembersData,
   (members) => {
      let result = [];
      let uniqueClientIds = [];

      if (members && members.data) {
         let data = members.data.members
         for (let i = 0; i < data.length; i++) {
            let projectsList = data[i].projects;

            projectsList.forEach(item => {
               if (!uniqueClientIds.includes(item.clientId)) {
                  if (item.clientId && item.client) {
                     uniqueClientIds.push(item.clientId)
                     result.push({id: item.clientId, title: item.client})
                  }
               }
            })
         }
      }



      return result;
   }
)
export const getMembersProjects = createSelector(
   getMembersData,
   (members) => {
      let result = [];
      let uniqueIds = []

      if (members && members.data) {
         let data = members.data.members
         for (let i = 0; i < data.length; i++) {
            let projectsList = data[i].projects;

            projectsList.forEach(item => {
               if (!uniqueIds.includes(item.id)) {
                  if (item.id && item.title) {
                     result.push({id: item.id, title: item.title})
                     uniqueIds.push(item.id)
                  }
               }

            })
         }
      }


      return result;
   }
)
export const getMembers = createSelector(
   getMembersData,
   (members) => {
      let result = [];

      if (members && members.data) {
         let data = members.data.members;

         for (let i = 0; i < data.length; i++) {
            if (data[i].id && data[i].title) {
               result.push({id: data[i].id, title: data[i].title})
            }
         }
      }


      return result;
   }
)

export const getMembersSummary = createSelector(
   getMembersData,
   (members) => {
      let sumData = {
         time: 0,
         timeFact: 0,
         payment: 0,
      };

      if (members && members.data) {
         let data = members.data.members;
         for (let i = 0; i < data.length; i++) {
            sumData.time += _.parseInt(data[i].time)
            sumData.timeFact += _.parseInt(data[i].timeFact)
            sumData.payment += _.parseInt(data[i].payment)
         }
      }

      return sumData
   }
)


export const getAwardsSummary = createSelector(
   getAwardsData,
   (awards) => {
      let sumData = {
         award: 0,
         awardAdditional: 0,
         payoff: 0
      };

      if (awards && awards.data) {
         let data = awards.data.awards;

         for (let i = 0; i < data.length; i++) {
            let projectsList = data[i].projects;

            projectsList.forEach(item => {
               if (item.award) {
                  sumData.award += _.parseInt(item.award)
               }
               if (item.awardAdditional) {
                  sumData.awardAdditional += _.parseInt(item.awardAdditional)
               }
               if (item.payoff) {
                  sumData.payoff += _.parseInt(item.payoff)
               }
            })
         }
      }

      return sumData
   }
)

export const getAwardsProjects = createSelector(
   getAwardsData,
   (awards) => {
      let result = [];
      let uniqueProjectsIds = [];

      if (awards && awards.data) {
         let data = awards.data.awards
         for (let i = 0; i < data.length; i++) {
            let projectsList = data[i].projects;

            projectsList.forEach(item => {
               if (item.id && item.title) {
                  if (!uniqueProjectsIds.includes(item.id)) {
                     result.push({id: item.id, title: item.title})
                     uniqueProjectsIds.push(item.id)
                  }
               }
            })
         }
      }


      return result;
   }
)

export const getAwardsMembers = createSelector(
   getAwardsData,
   (awards) => {
      let result = [];

      if (awards && awards.data) {
         let data = awards.data.awards;

         for (let i = 0; i < data.length; i++) {
            result.push({id: data[i].id, title: data[i].title})
         }
      }


      return result;
   }
)

export const getAwardsProjectsSize = createSelector(
   getAwardsData,
   (awards) => {
      let result = 0;
      let uniqueProjectsIds = [];

      if (awards && awards.data) {
         let data = awards.data.awards
         for (let i = 0; i < data.length; i++) {
            let projectsList = data[i].projects;

            projectsList.forEach(item => {
               if (item.id && item.title) {
                  if (!uniqueProjectsIds.includes(item.id)) {
                     result += 1
                     uniqueProjectsIds.push(item.id)
                  }
               }
            })
         }
      }


      return result;
   }
)

