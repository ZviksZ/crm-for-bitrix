import {formatDate} from './utils.js'

export function getQuartersDate(quarter) {
   let dateFrom;
   let dateTo;
   let currentYear = new Date().getFullYear();

   switch (quarter) {
      case 1:
         dateFrom = new Date(currentYear, 0, 1)
         dateTo = new Date(currentYear, 2, 31)
         break;
      case 2:
         dateFrom = new Date(currentYear, 3, 1)
         dateTo = new Date(currentYear, 5, 30)
         break;
      case 3:
         dateFrom = new Date(currentYear, 6, 1)
         dateTo = new Date(currentYear, 8, 30)
         break;
      case 4:
         dateFrom = new Date(currentYear, 9, 1)
         dateTo = new Date(currentYear, 11, 31)
         break;
      default:
         dateFrom = new Date(currentYear, 9, 1)
         dateTo = new Date(currentYear, 11, 31)
         break;
   }

   return {dateFrom, dateTo}
}

export function getDatePeriod(value) {
   let dateFrom = new Date();
   let dateTo = new Date();

   let currentMonth = new Date().getMonth();
   let currentYear = new Date().getFullYear();
   let quarter = parseInt(new Date().getMonth() / 3) + 1;

   const quarterObj = getQuartersDate(quarter)
   const quarterPrevObj = getQuartersDate(quarter - 1)


   switch (value) {
      case 1:
         dateFrom = new Date(currentYear, currentMonth, 1);
         dateTo = new Date(currentYear, currentMonth + 1, 0);
         break;
      case 2:
         dateFrom = quarterObj.dateFrom;
         dateTo = quarterObj.dateTo;
         break;
      case 3:
         dateFrom = new Date(currentYear, 0, 1);
         dateTo = new Date(currentYear, 11, 31);
         break;
      case 4:
         dateFrom = new Date(currentYear, currentMonth - 1, 1);
         dateTo = new Date(currentYear, currentMonth, 0);
         break;
      case 5:
         dateFrom = quarterPrevObj.dateFrom;
         dateTo = quarterPrevObj.dateTo;
         break;
      case 6:
         dateFrom = new Date(currentYear - 1, 0, 1);
         dateTo = new Date(currentYear - 1, 11, 31);
         break;
      case 7:
         break;
      case 8:
         dateFrom = new Date(currentYear - 2, 0, 1);
         dateTo = new Date(currentYear + 10, 0, 1);
         break;
      default:
         break;
   }

   if (value === 8) {
      /*dateFrom = null
      dateTo = null*/
      dateFrom = new Date(currentYear - 2, 0, 1);
      dateTo = new Date(currentYear, currentMonth + 1, 0);
   }

   dateFrom = formatDate(dateFrom, true)
   dateTo = formatDate(dateTo, true)



   return {dateFrom, dateTo}

}


export function getSmallDatePeriod (value) {
   let dateFrom = new Date();
   let dateTo = new Date();

   switch (value) {
      case 1:
         dateFrom = new Date(new Date().setDate(new Date().getDate() - 1));
         dateTo = new Date();
         break;
      case 2:
         dateFrom = new Date(new Date().setDate(new Date().getDate() - 7));
         dateTo = new Date();
         break;
      case 3:
         dateFrom = new Date(new Date().setDate(new Date().getDate() - 14));
         dateTo = new Date();
         break;
      case 4:
         dateFrom = new Date(new Date().setDate(new Date().getDate() - 30));
         dateTo = new Date();
         break;
      default:
         break;
   }

  /* dateFrom = formatDate(dateFrom, true)
   dateTo = formatDate(dateTo, true)*/

   return {dateFrom, dateTo}
}
