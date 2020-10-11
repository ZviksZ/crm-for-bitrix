import React, { PureComponent }                                                      from 'react';
import {connect}                                                                     from "react-redux";
import {
   BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
}                                                                                    from 'recharts';
import {addTransaction, closeAddModalWithData, deleteTransaction, updateTransaction} from "../../../../redux/appReducer.js";
import {updateContractorEnum, updateProjects}                                        from "../../../../redux/thunk/enumsThunks.js";
import styles                                                                        from './GraphMoney.module.scss'


const data = [
   {
      name: 'Февраль', uv: 4000, pv: 2400, amt: 2400,
   },
   {
      name: 'Март', uv: 3000, pv: 1398, amt: 2210,
   },
   {
      name: 'Апрель', uv: 2000, pv: 9800, amt: 2290,
   },
   {
      name: 'Май', uv: 2780, pv: 3908, amt: 2000,
   },
   {
      name: 'Июнь', uv: 1890, pv: 4800, amt: 2181,
   },
   {
      name: 'Июль', uv: 2390, pv: 3800, amt: 2500,
   }
];

class GraphMoney extends PureComponent {



   render() {
      return (
         <ResponsiveContainer width="100%" height={400}>
            <BarChart
               height={300}
               data={data}
               margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
               }}
            >
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="name" />
               <YAxis />
               <Tooltip />
               <Legend />
               <Bar dataKey="pv" name="Доход" fill="#8884d8" />
               <Bar dataKey="uv" name="Расход" fill="#82ca9d" />
               <Bar dataKey="amt" name="Другое" fill="#65c14b" />
            </BarChart>
         </ResponsiveContainer>
      );
   }
}
let mapStateToProps = (state) => {
   return {
      enums: state.enum.enums
   }
}

export default connect(mapStateToProps, {})(GraphMoney);
