import React        from 'react';
import ExampleGraph from "../../common/Graphs/ExampleGraph/ExampleGraph.jsx";
import GraphMoney   from "../../common/Graphs/GraphMoney/GraphMoney.jsx";
import GraphParts   from "../../common/Graphs/GraphParts/GraphParts.jsx";
import MainGraph    from "../../common/Graphs/MainGraph/MainGraph.jsx";
import InfoBlocks   from "../../common/InfoBlocks/InfoBlocks.jsx";
import styles       from './MainPage.module.scss'

export const MainPage = (props) => {
   return (
      <div className="section">
         <div>
            <InfoBlocks/>
         </div>
         <div className={styles.graphBlock}>
            <GraphMoney />
         </div>
        {/* <div className={styles.graphBlock}>
            <GraphParts />
         </div>*/}
         {/*<div>
            <MainGraph/>
         </div>
         <div>
            <ExampleGraph/>
         </div>*/}
      </div>
   );
}

