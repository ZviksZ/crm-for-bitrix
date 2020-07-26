import FormControl                         from "@material-ui/core/FormControl";
import MenuItem                            from "@material-ui/core/MenuItem";
import Select                              from "@material-ui/core/Select";
import cn                                  from "classnames";
import React, {useState}                   from 'react';
import { getSmallDatePeriod} from "../../../../helpers/getDatePeriod.js";
import styles                              from "../InfoBlocks.module.scss";

export const DaysFilter = ({filterFn, isIn = false}) => {
   const [period, setPeriod] = useState(4)

   const handlePeriodChange = (event) => {
      setPeriod(event.target.value);

      let {dateFrom, dateTo} = getSmallDatePeriod(event.target.value);

      if (isIn) {
         filterFn(dateFrom, dateTo, true)
      } else {
         filterFn(dateFrom, dateTo)
      }

   };

   return (
      <FormControl variant="outlined" className={cn(styles.pagination, 'pagination-select pagination-select-gray')}>
         <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={period}
            onChange={handlePeriodChange}
            label="Date"
            IconComponent={props => (
               <i {...props} className="icon-outline-keyboard-arrow-down-24px-default"></i>
            )}
         >
            <MenuItem value={1}>1 день</MenuItem>
            <MenuItem value={2}>7 дней</MenuItem>
            <MenuItem value={3}>14 дней</MenuItem>
            <MenuItem value={4}>30 дней</MenuItem>
         </Select>
      </FormControl>
   );
}

