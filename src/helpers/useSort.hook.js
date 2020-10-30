import _                                          from "lodash";
import {useState, useEffect, useCallback, useRef} from 'react'

export const useSort = (enums, countOnPage, filterFn, filter) => {
   const [sortedData, setSortedData] = useState(enums?.data || []);
   const [allData, setAllData] = useState([]);

   const [sort, setSort] = useState('asc');
   const [sortField, setSortField] = useState('');
   const [count, setCount] = useState(countOnPage);
   const [pages, setPages] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const [apiPromises, setApiPromises] = useState([])
   const [loaded, setLoaded] = useState(false)

   const setAllEnumPromises = () => {
      const pageNum = Math.ceil(enums.size / 50);

      let promises = []
      if (!loaded) {

         if (pageNum >= 2) {
            for (let i = 2; i <= pageNum; i++) {
               promises.push(filterFn({...filter, page: +i}))
            }
            setApiPromises(promises)
         }

      }
   }
   const loadEnumPages = async () => {
      if (!loaded) {
         for (let key of await Promise.all(apiPromises)) {
            console.log(key)
         }
      }
      setLoaded(true)
      setApiPromises([])
   }
   const setItemCount = value => {
      setCount(value);

      const pageNum = Math.ceil(enums.size / value);

      setPages(pageNum)
   }

   const onSort = (sortField, sortable) => {
      let clonedData = [...allData];
      let sorting;
      if (sortable) {
         sorting = sort === 'asc' ? 'desc' : 'asc'
      } else {
         sorting = sort
      }
      let displayData = [];

      if (sortField !== '') {
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

         displayData = _.chunk(data, count)[currentPage - 1]
      } else {

         displayData = _.chunk(clonedData, count)[currentPage - 1];
      }
      setSortedData(displayData || [])

      setSort(sorting)
      setSortField(sortField)
   }

   useEffect(() => {
      onSort(sortField);
   }, [count, currentPage])

   useEffect(() => {
      setItemCount(count);
      onSort();
   }, [allData])

   useEffect(() => {
      if (currentPage === 1 && Object.keys(enums).length > 0) {
         setAllEnumPromises();
         loadEnumPages().then(() => console.log());
      }
   }, [currentPage, enums.size, loaded])

   useEffect(() => {
      if (Object.keys(enums).length > 0) {
         setAllData(enums?.data || []);
         setItemCount(count);

         if (enums.page == '1') {
            setLoaded(false)
            setCurrentPage(1)
         }
      }
   }, [enums, filter])

   return {
      sortedData,
      sortField,
      sort,
      onSort,
      count,
      setCount,
      pages,
      setItemCount,
      currentPage,
      setCurrentPage,
      loaded
   }
}

