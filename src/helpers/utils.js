export function setFormData(args) {
   const formData = new FormData();

   for(let key in args) {
      if (Array.isArray(args[key])) {
         for (var i = 0; i < args[key].length; i++) {
            formData.append(key + '[]', args[key][i]);
         }
      } else {
         formData.append(key, args[key]);
      }

   }

   return formData
}


export function formatDate(data, fullYear) {
   let date = new Date(data);

   var dd = date.getDate();
   if (dd < 10) dd = '0' + dd;

   var mm = date.getMonth() + 1;
   if (mm < 10) mm = '0' + mm;

   var yy;

   if (fullYear) {
      yy = date.getFullYear()
   } else {
      yy = date.getFullYear() % 100;
      if (yy < 10) yy = '0' + yy;
   }


   return dd + '.' + mm + '.' + yy;
}


export function addObjectToArray(obj) {
   let array = [];
   for (let key in obj) {
      array.push({id: key, title: obj[key]})
   }

   return array
}

export function numberWithSpace(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function countDigits(n) {
   for(var i = 0; n > 1; i++) {
      n /= 10;
   }
   return i;
}

export function removeDigits(x, n) {
   /*if (countDigits(x) <= 3) {
      return x;
   } else {
      return (x-(x%Math.pow(10, n)))/Math.pow(10, n)
   }*/

   return (x-(x%Math.pow(10, n)))/Math.pow(10, n)
}

export function getArrayOfId(array) {
   if (!array) {
      return null
   }

   let ids = []

   array.forEach(function (item) {
      if (!ids.includes(+item.id)) {
         ids.push(+item.id)
      }
   })

   return ids
}


export function sortExpenseEnum(expenseEnum) {
   let newObj = []

   let parentsExpense = expenseEnum.filter(item => item.parent === 0)

   parentsExpense.forEach((item) => {
      newObj.push(item)
      let childObj = expenseEnum.filter(child => child.parent === item.id)


      newObj = [...newObj, ...childObj]
   })

   return newObj
}
