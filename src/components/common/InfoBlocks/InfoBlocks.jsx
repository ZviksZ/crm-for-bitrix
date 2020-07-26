import cn                                                     from "classnames";
import React                                                  from 'react';
import Grid                                                   from '@material-ui/core/Grid';
import {connect}                                              from "react-redux";
import {numberWithSpace}                                      from "../../../helpers/utils.js";
import {setTopInOutFilter}                                    from "../../../redux/mainDataReducer.js";
import {getTotalDebt, getTotalIn, getTotalMoney, getTotalOut} from "../../../redux/selectors/mainDataSelectors.js";
import {DaysFilter}                                           from "./DaysFilter/DaysFilter.jsx";
import styles                                                 from './InfoBlocks.module.scss';
import {InfoFilter}                                           from "./InfoFilter/InfoFilter.jsx";



export const InfoBlocks = ({totalSum, totalIn, totalOut, totalDebt, setTopInOutFilter}) => {

   return (
      <div className={styles.infoBlocks}>
         <Grid container spacing={3} wrap={'wrap'}>
            <Grid item lg={3} sm={12} md={6} xs={12}>
               <div className={styles.item}>
                  <div className={styles.itemTop}>
                     <span>Денег всего</span>
                  </div>
                  <div className={styles.itemBottom}>
                     <span className={cn(styles.circle,styles.circleBlue)}></span>
                     <span className={styles.amount}>{numberWithSpace(totalSum)} <span className={styles.ruble}>₽</span></span>
                  </div>
               </div>
            </Grid>
            <Grid item lg={3} sm={12} md={6} xs={12}>
               <div className={styles.item}>
                  <div className={styles.itemTop}>
                     <span>Ожид. доходы за:</span>
                     <DaysFilter filterFn={setTopInOutFilter} isIn={true}/>
                  </div>
                  <div className={styles.itemBottom}>
                     <span className={cn(styles.circle,styles.circleGreen)}></span>
                     <span className={styles.amount}>{numberWithSpace(totalIn)} <span className={styles.ruble}>₽</span></span>
                  </div>
               </div>
            </Grid>
            <Grid item lg={3} sm={12} md={6} xs={12}>
               <div className={styles.item}>
                  <div className={styles.itemTop}>
                     <span>Ожид. расходы за:</span>
                     <DaysFilter filterFn={setTopInOutFilter}/>
                  </div>
                  <div className={styles.itemBottom}>
                     <span className={cn(styles.circle,styles.circleRed)}></span>
                     <span className={styles.amount}>{numberWithSpace(totalOut)} <span className={styles.ruble}>₽</span></span>
                  </div>
               </div>
            </Grid>
            <Grid item lg={3} sm={12} md={6} xs={12}>
               <div className={styles.item}>
                  <div className={styles.itemTop}>
                     <span>Долги</span>
                     <InfoFilter/>
                  </div>
                  <div className={styles.itemBottom}>
                     <span className={cn(styles.circle,styles.circleOrange)}></span>
                     <span className={styles.amount}>{numberWithSpace(totalDebt)} <span className={styles.ruble}>₽</span></span>
                  </div>
               </div>
            </Grid>
         </Grid>
      </div>
   );
}

let mapStateToProps = (state) => {
   return {
      totalSum: getTotalMoney(state),
      totalIn: getTotalIn(state),
      totalOut: getTotalOut(state),
      totalDebt: getTotalDebt(state),
   }
}

export default connect(mapStateToProps, {setTopInOutFilter})(InfoBlocks);
