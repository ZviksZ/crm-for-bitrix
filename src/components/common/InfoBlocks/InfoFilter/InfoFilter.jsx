import FormControl       from "@material-ui/core/FormControl";
import MenuItem          from "@material-ui/core/MenuItem";
import Select            from "@material-ui/core/Select";
import cn                from "classnames";
import React, {useState} from 'react';
import styles            from "../InfoBlocks.module.scss";

export const InfoFilter = (props) => {
   const [period, setPeriod] = useState(1)

   const handlePeriodChange = (event) => {
      setPeriod(event.target.value);
   };

   return (
      <FormControl variant="outlined" className={cn(styles.pagination, 'pagination-select pagination-select-gray')}>
         <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={period}
            onChange={handlePeriodChange}
            label="Age"
            IconComponent={props => (
               <i {...props} className="icon-outline-keyboard-arrow-down-24px-default"></i>
            )}
         >
            <MenuItem value={1}>Нам должны</MenuItem>
            <MenuItem value={2}>Мы должны</MenuItem>
         </Select>
      </FormControl>
   );
}

