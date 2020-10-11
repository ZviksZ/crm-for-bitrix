import React            from 'react';
import TransactionTable from "./TransactionTable/TransactionTable.jsx";

export const TransactionPage = (props) => {
   return (
      <div className="section">
         <h1 className="h1 mb25">
            Транзакции
         </h1>

         <TransactionTable/>
      </div>
   );
}

