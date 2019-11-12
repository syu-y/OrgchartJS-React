import React, { useRef } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './component/TopMenu';
import Chart from './component/Chart';
import Home from './component/Home';

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


function Router() {
  const ref = useRef(null);
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Route path="/home" component={Home} exact/>
        <Route path="/chart" component={Chart} exact/>
      </div>
    </BrowserRouter>
  );
}

export default Router;
