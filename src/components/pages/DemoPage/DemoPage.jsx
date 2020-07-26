import React        from 'react';
import ExampleGraph from "../../common/Graphs/ExampleGraph/ExampleGraph.jsx";
import MainGraph    from "../../common/Graphs/MainGraph/MainGraph.jsx";
import InfoBlocks   from "../../common/InfoBlocks/InfoBlocks.jsx";
import styles       from './DemoPage.module.scss'

export const DemoPage = (props) => {
   return (
      <div className="section">
         <div className="mb3 mt3">
            <a href="http://recharts.org/en-US/examples" target="_blank">Больше вариантов тут</a>
         </div>
         <div>
            <MainGraph/>
         </div>
         <div>
            <ExampleGraph/>
         </div>
      </div>
   );
}

