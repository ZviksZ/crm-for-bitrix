import React        from 'react';
import ExampleGraph from "../../common/Graphs/ExampleGraph/ExampleGraph.jsx";
import MainGraph    from "../../common/Graphs/MainGraph/MainGraph.jsx";
import InfoBlocks   from "../../common/InfoBlocks/InfoBlocks.jsx";
import styles       from './MainPage.module.scss'

export const MainPage = (props) => {
   return (
      <div className="section">
         <div>
            <InfoBlocks/>
         </div>
         {/*<div>
            <MainGraph/>
         </div>
         <div>
            <ExampleGraph/>
         </div>*/}
      </div>
   );
}

