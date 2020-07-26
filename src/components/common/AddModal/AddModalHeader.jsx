import Divider    from "@material-ui/core/Divider";
import Grid       from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React      from 'react';
import styles     from './AddModal.module.scss'


export const AddModalHeader = ({type}) => {
   return (
      <Grid item xs={12} sm={12}>
         <Typography component="h1" variant="h5" className={styles.addModalHeader}>
            {(() => {
               switch (type) {
                  case '1':
                     return <>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <circle cx="10" cy="10" r="10" fill="#00C999"/>
                           <path d="M9.99989 15L4.44434 9.52465L6.111 7.88205L8.82151 10.5534L8.82137 5.00013L11.1783 5L11.1783 10.5533L13.8888 7.88205L15.5554 9.52465L9.99989 15Z" fill="white"/>
                        </svg>
                        <span>Поступление</span>
                     </>
                  case '2':
                     return <>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <circle cx="10" cy="10" r="10" fill="#E04A77"/>
                           <path d="M10.0001 5L15.5557 10.4753L13.889 12.118L11.1785 9.44658L11.1786 14.9999L8.82172 15L8.82166 9.44665L6.11122 12.118L4.44455 10.4754L10.0001 5Z" fill="white"/>
                        </svg>
                        <span>Расход</span>
                     </>
                  case '3':
                     return <>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <circle cx="10" cy="10" r="10" fill="#263238"/>
                           <path d="M11.5155 13.6033L16.2635 8.78574L11.5155 3.96817L10.0911 5.41344L12.4076 7.76383L7.85565 7.76387V7.76129H5.54412V7.76389H5.5332L5.53332 9.80771H5.54412V16.0318H7.85565V9.80767L12.4076 9.80759L10.0911 12.158L11.5155 13.6033Z"
                                 fill="white"/>
                        </svg>
                        <span>Перевод</span>
                     </>
                  case '4':
                     return <>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <circle cx="10" cy="10" r="10" fill="#FFA05B"/>
                           <path d="M13.8734 6.54952L9.99971 2.73178L6.12605 6.54952L7.28814 7.69484L9.17802 5.83225L9.17807 9.70438L10.8214 9.70428L10.8213 5.8322L12.7113 7.69484L13.8734 6.54952ZM6.12598 13.4505L9.99964 17.2683L13.8733 13.4505L12.7112 12.3052L10.8213 14.1678L10.8213 10.2957L9.17791 10.2958L9.178 14.1678L7.28808 12.3052L6.12598 13.4505Z"
                                 fill="white"/>
                        </svg>
                        <span>Долг</span>
                     </>
                  default:
                     return false
               }
            })()}
         </Typography>
         <Divider className={styles.divider}/>
      </Grid>
   )
}
