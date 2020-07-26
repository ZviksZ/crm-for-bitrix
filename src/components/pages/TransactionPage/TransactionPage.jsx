import React            from 'react';
import TransactionTable from "./TransactionTable/TransactionTable.jsx";

export const TransactionPage = (props) => {
   return (
      <div className="section">
         <h2 className="mb2">Транзакции</h2>

         <TransactionTable/>
      </div>
   );
}

