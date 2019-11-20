import React, { useState, useEffect } from 'react';
// import Router from './router'
import NavBar from "./component/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import Headers from './component/TopMenu';
import Chart from './component/Chart';
import Home from './component/Home';
import PrivateRoute from './component/PrivateRoute'

// OrgChart.templates.ana.field_2 = '<text class="field_2"  style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">{val}</text>';

// OrgChartをローカルで試すためのデータ
const localData = {
  // template: "luba",
  scaleInitial: 0.5,
  enableSearch:true,
  // ノードに持たせる要素
  nodeBinding: {
    field_0: "text",
    field_1: 'author',
  },
  // タグを使うことでindex.scssで表示を分岐が可能
  tags: {
    "subroot": {
      template: "luba"
    },
    "mainroot": {
      template: "luba"
    }
  },
  nodes: [
    { id: 1, pid: 0, author: 'Amber McKenzie', text: "あいうえお", tags: ["mainroot"]},
    { id: 2, pid: 1, author: 'Ava Field', text: "かきくけこ", tags: ["mainroot"]},
    { id: 3, pid: 1, author: 'Peter Stevens', text: "さしすせそ", tags: ["subroot"]},
  ],
  nodeMenu:{
    details: {text:"Details"},
    // edit: {text:"Edit"},
    // add: {text:"Add"},
    // remove: {text:"Remove"}
  //   write: {
  //     text: "Write",
  //     onClick: writeHandler
  //   }
  },
};

// function App() {
  // return <Router />;
  // return (
  //   <div>
  //     <div>
  //       <TopMenu />
  //     </div>
  //     <div style={{ height:'500px', width:'1200px', margin: '0 30px' }}>
  //       <Chart data={localData} />
  //     </div>
  //   </div>
  // );
// }

function App() {

  return (
    <div className="App">
      <Router history={history}>
        <header>
          <Headers/>
        </header>
        <Switch>
          <Route path="/" component={Home} exact/>
          <PrivateRoute path="/chart" component={Chart} exact/>
        </Switch>
      </Router>
      </div>
  );

}

export default App;
