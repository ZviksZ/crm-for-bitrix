import _                     from "lodash";
import {useState, useEffect} from 'react'

export const useSort = (data, dateFilter) => {

   const [sortedData, setSortedData] = useState(data)
   const [sort, setSort] = useState('asc')
   const [sortField, setSortField] = useState('')

   const onSort = sortField => {
      let clonedData = [...sortedData]
      const sorting = sort === 'asc' ? 'desc' : 'asc'
      if (sortField === 'budget') {
         clonedData = clonedData.map(item => {
            let budget = _.parseInt(item.budget)
            return {
               ...item,
               budget
            }
         })
      }
      if (sortField === 'amount') {
         clonedData = clonedData.map(item => {
            let amount = _.parseInt(item.amount)
            return {
               ...item,
               amount
            }
         })
      }
      const data = _.orderBy(clonedData, sortField, sorting);

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
      setSortedData(data)
   }, [data])

   return {sortedData, setFilter, sortField, sort, onSort}
}

