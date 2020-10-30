import _                     from "lodash";
import {useState, useEffect} from 'react'

export const useSort = (data, dateFilter, isProjectsPage = false) => {

   const [sortedData, setSortedData] = useState([])
   const [sort, setSort] = useState('asc')
   const [sortField, setSortField] = useState('')

   const onSort = (sortField, isNumber = false, sortSecondLevel = false) => {
      let clonedData = [...sortedData]
      const sorting = sort === 'asc' ? 'desc' : 'asc';

      if (isProjectsPage && sortField === 'title') {
         sortField = 'name'
      }

      if (isNumber) {
         clonedData = clonedData.map(item => {
            let numberItem = _.parseInt(item[sortField])
            return {
               ...item,
               [sortField]: numberItem
            }
         })
      }
      let data = _.orderBy(clonedData, sortField, sorting);

      if (sortSecondLevel) {
         let sortFieildSecondLevel = sortField
         if (isProjectsPage && sortField === 'name') {
            sortFieildSecondLevel = 'title'
         }
         data = data.map(item => {
            let projects = item.projects;

            if (isNumber) {
               projects = projects.map(item => {
                  let numberItem = _.parseInt(item[sortFieildSecondLevel])
                  return {
                     ...item,
                     [sortFieildSecondLevel]: numberItem
                  }
               })
            }

            return {
               ...item,
               projects: _.orderBy(projects, sortFieildSecondLevel, sorting)
            }
         })
      }

      setSortedData(data)
      setSort(sorting)
      setSortField(sortField)
   }

   const setFilter = (from, to) => {
      if (dateFilter) {
         const clonedData = [...data]
         let periodFormFrom = new Date(from);
         let periodFormTo = new Date(to);

         let newData = clonedData.filter(item => {
            let itemFrom = new Date(item.start);
            let itemTo;
            if (!item.finish) {
               itemTo = new Date();
            } else {
               itemTo = new Date(item.finish);
            }

            if (itemFrom >= periodFormFrom && itemFrom <= periodFormTo && itemTo >= periodFormFrom && itemTo <= periodFormTo) {
               return item
            }
         })

         setSortedData(newData)
      }
   }

   useEffect(() => {
      if (data.length > 0) {
         setSortedData(data)
      }
   }, [data])

   return {sortedData, setFilter, sortField, sort, onSort}
}

