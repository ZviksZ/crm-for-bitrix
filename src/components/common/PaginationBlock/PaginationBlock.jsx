import FormControl                  from "@material-ui/core/FormControl";
import MenuItem                     from "@material-ui/core/MenuItem";
import Select                       from "@material-ui/core/Select";
import Pagination                   from "@material-ui/lab/Pagination";
import React from 'react';

export const PaginationBlock = ({withCount, filterFn,
                                setCurrentPage, currentPage,
                                pagesNum, countOnPage, setItemCount}) => {
   const pageChange = (e, pageNumber) => {
      setCurrentPage(pageNumber)
   }

   const countChange = (event) => {
      setItemCount(event.target.value)
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
                     <MenuItem value={10}>10</MenuItem>
                     <MenuItem value={25}>25</MenuItem>
                     <MenuItem value={50}>50</MenuItem>
                  </Select>
               </FormControl>
            </div>
         }

      </div>
   );
}

