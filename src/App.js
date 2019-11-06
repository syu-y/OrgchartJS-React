import React, { useState, useEffect } from 'react';
import Chart from './component/Chart';
import TopMenu from './component/TopMenu';

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
    write: {
      text: "Write",
      onClick: writeHandler
    }
  },
};


function writeHandler(nodeId) {
  var nodeData = this.get(nodeId);
  var employeeName = nodeData["name"];
  window.open('https://webcall.me/' + employeeName, employeeName, 'width=340px, height=670px, top=50px, left=50px');
}

const data1 = {
  nodeBinding: {
    field_0: 'name',
  },
  nodes: [
    { id: 1, name: 'Amber McKenzie' },
    { id: 2, pid: 1, name: 'Ava Field' },
    { id: 3, pid: 1, name: 'Peter Stevens' },
  ],
};

function App() {
  return (
    <div>
      <div>
        <TopMenu />
      </div>
      {/* チャートを表示する */}
      <div style={{ height:'500px', width:'1200px', margin: '0 30px' }}>
        <Chart data={localData} />
      </div>
    </div>
  );
}

export default App;
