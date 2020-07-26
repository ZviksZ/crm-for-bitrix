import {createSelector} from "reselect";

export const getCreditAccountEnum = state => state.enum.enums.creditAccountEnum;
export const getTransactionEnum = state => state.enum.enums.transactionEnum;
export const getMainTopDataFilter = state => state.mainData.mainTopData;


export const getTotalMoney = createSelector(
   getCreditAccountEnum,
   (creditAccounts) => {
      let sum = 0;
      if (creditAccounts) {
         creditAccounts.forEach(function(item) {
            sum += +item.balance
         })
      }
      return sum;
   }
)
export const getTotalIn = createSelector(
   getTransactionEnum,
   getMainTopDataFilter,
   (trans, filter) => {
      let sum = 0;
      if (trans?.data) {
         trans.data.forEach(function(item) {
            if (new Date(item.date) <= new Date(filter.moneyIn.finish) && new Date(item.date) >= new Date(filter.moneyIn.start)) {

               if(item.type == 1) {
                  sum += +item.amount
               }
            }

         })
      }
      return sum;
   }
)
export const getTotalOut = createSelector(
   getTransactionEnum,
   getMainTopDataFilter,
   (trans, filter) => {
      let sum = 0;
      if (trans?.data) {
         trans.data.forEach(function(item) {
            if (new Date(item.date) <= new Date(filter.moneyOut.finish) && new Date(item.date) >= new Date(filter.moneyOut.start)) {
               if(item.type == 2) {
                  sum += +item.amount
               }
            }
         })
      }
      return sum;
   }
)
export const getTotalDebt = createSelector(
   getTransactionEnum,
   (trans) => {
      let sum = 0;
      if (trans?.data) {
         trans.data.forEach(function(item) {
            if(item.type == 4) {
               sum += +item.amount
            }
         })
      }
      return sum;
   }
)
