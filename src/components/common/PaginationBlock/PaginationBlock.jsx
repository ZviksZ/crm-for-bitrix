import FormControl              from "@material-ui/core/FormControl";
import MenuItem                 from "@material-ui/core/MenuItem";
import Select                   from "@material-ui/core/Select";
import Pagination               from "@material-ui/lab/Pagination";
import React, {useEffect}       from 'react';
import {useDispatch}            from "react-redux";
import {Cookie}                 from "../../../helpers/cookie.js";
import {setProjectPeriodFilter} from "../../../redux/enumsReducer.js";

export const PaginationBlock = ({withCount, filterFn,
                                setCurrentPage, currentPage,
                                pagesNum, countOnPage, setItemCount, projectFilterPeriod}) => {

   const dispatch = useDispatch();
   const pageChange = (e, pageNumber) => {
      setCurrentPage(pageNumber)
   }

   const countChange = (event) => {
      setItemCount(event.target.value)

      let jsonResponse = JSON.stringify({...projectFilterPeriod, pageCount: event.target.value})
      Cookie.setCookie('projectEnumPeriodFilter', jsonResponse, {expires: 2147483647});
      dispatch(setProjectPeriodFilter({...projectFilterPeriod, pageCount: event.target.value}))
   }



   return (
      <div className="pagination-wrap">
         <Pagination className="pagination" count={pagesNum} page={currentPage} onChange={pageChange}/>

         {
            withCount && <div className="pagination-select__wrap">
               <span>Показывать на странице:</span>
               <FormControl variant="outlined" className="pagination-select">
                  <Select
                     labelId="demo-simple-select-outlined-label"
                     id="demo-simple-select-outlined"
                     value={countOnPage}
                     onChange={countChange}
                     label="Age"
                     IconComponent={props => (
                        <i {...props} className="icon-outline-keyboard-arrow-down-24px-default"></i>
                     )}
                  >
                     <MenuItem value={50}>50</MenuItem>
                     <MenuItem value={100}>100</MenuItem>
                     <MenuItem value={200}>200</MenuItem>
                  </Select>
               </FormControl>
            </div>
         }

      </div>
   );
}

