import React, { useState, useEffect, useRef, useHistory } from 'react';
import axios from "axios";

const server = 'https://mq8imozqve.execute-api.ap-northeast-1.amazonaws.com/dev/todo';

const defaultNodeButton = [
  { id: 1, author: 'Amber McKenzie', text: "あいうえお", tags: ["mainroot"] },
  { id: 2, pid: 1, author: 'Ava Field', text: "かきくけこ", tags: ["mainroot"] },
  { id: 3, pid: 1, author: 'Peter Stevens', text: "さしすせそ", tags: ["subroot"] },
]

function NodeList() {
  let history = useHistory();

  //　状態管理
  const [nodeList, setNodeList] = React.useState(defaultNodeButton);

  const addNode = () => {
    const node = {
      text: "sample",
      author: "hoge"
    };
    setNodeList([...nodeList, node]);
  }
}

function Chart({ data }) {

  function writeHandler(nodeId) {
    var nodeData = this.get(nodeId);
    var employeeName = nodeData["name"];
    window.open('https://webcall.me/' + employeeName, employeeName, 'width=340px, height=670px, top=50px, left=50px');
  }

  const nodeData = {
    // template: "luba",
    scaleInitial: 0.5,
    enableSearch:true,
    nodeBinding: {
      field_0: "text",
      field_1: 'author',
    },
    tags: {
      "subroot": {
          template: "polina"
      },
      "mainroot": {
          template: "ana"
      }
    },
    nodes: [],
    nodeMenu:{
      details: {text:"Details"},
      edit: { text:"Edit"},
      add: { text:"Add"},
      remove: { text:"Remove"},
      write: {
        text: "write",
        onClick: writeHandler
      }
    },
  };

  const ref = useRef(null);
  const showChart = () => {
    // APIを叩いてデータ取得
    axios.get(server)
        .then((res) => {
          res.data.map( function(node) {
            nodeData.nodes.push(node);
          });
          console.log(res.data)
          console.log(nodeData)
          // console.log(res);
        })
        .catch(console.error);
//    new window.OrgChart(ref.current, nodeData);
    new window.OrgChart(ref.current, data);
  };

  useEffect(() => {
    showChart();
  }, []);
  return <div ref={ref} />;
}

export default Chart;
