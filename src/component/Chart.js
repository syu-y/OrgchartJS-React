import React, { useState, useEffect, useRef, useHistory } from 'react';
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

  // 編集用のロゴ
  const writeLogo  = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="163.96439127408954 200.55172891423138 84.39409182274292 148.89620895844013" width="24" height="24"><defs><path d="M186.97 202.37C191.4 200.32 196.66 202.25 198.72 206.68C208.06 226.84 232.37 279.28 241.72 299.44C243.77 303.87 241.84 309.13 237.41 311.19C232.43 313.49 225.52 316.7 220.53 319.01C216.1 321.06 210.84 319.14 208.79 314.7C199.44 294.55 175.13 242.1 165.79 221.95C163.73 217.51 165.66 212.25 170.09 210.2C175.07 207.89 181.99 204.68 186.97 202.37Z" id="a3teER2aq"></path><path d="M227.64 331.42L210.48 317.7L226.66 309.48L242.84 301.26L243.81 323.2L244.79 345.14L227.64 331.42Z" id="g3jHW74tnN"></path><path d="M235.5 337.7L225.64 328.94L234.24 324.57L242.84 320.2L244.1 333.32L245.36 346.45L235.5 337.7Z" id="az3uIsU9L"></path></defs><g><g><use xlink:href="#a3teER2aq" opacity="1" fill="#6172e2" fill-opacity="1"></use></g><g><use xlink:href="#g3jHW74tnN" opacity="1" fill="#e2d661" fill-opacity="1"></use></g><g><use xlink:href="#az3uIsU9L" opacity="1" fill="#000000" fill-opacity="1"></use></g></g></svg>'

const server = 'https://mq8imozqve.execute-api.ap-northeast-1.amazonaws.com/dev';

const headers = {
  "Content-Type": 'application/json',
  "Access-Control-Allow-Origin": "*"
}

// GET:/todoにアクセスする関数
const getNodeList = async () => {
  try {
    const response = await fetch(`${server}/todo`)
                            .then(res=>res.clone().json())
    console.log("get : ",response);
    return await response;
  } catch (e) {
    console.error(e);
  }
};

// POST:/todoにアクセスする関数
const createNode = async ({ node }) => {
  try {
    await fetch(`${server}/todo`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(node),
    });
  } catch (e) {
    console.log(e);
  }
};


// OrgChartコンポーネント
function Chart({ data }) {
  // モーダルが開いているか閉じているか
  const [open, setOpen] = useState(false);

  // NodoListを入れておく変数と更新する関数
  const [nodeList, setNodeList] = useState([]);

  async function writeHandler(nodeId){
    // ここに編集時の処理を追加
    var handlerNode = this.get(nodeId);

    setOpen(true);

    // 新しく追加するNode
    var newNode = {
      id: data.nodes.length + 1,
      pid: handlerNode["id"],
      author: handlerNode["author"],
      text: handlerNode["text"],
      tags: ["subroot"]
    }
    // DBにPOST処理
    //postNode({ text: newNode });

    // axios.post(server, newNode, headers)
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch(console.error);
    // console.log(newNode);
    await createNode(newNode);
    showChart();
    this.addNode(newNode);
  }

  const nodeData = {
    template: "luba",
    scaleInitial: 0.5,
    enableSearch:true,
    nodeBinding: {
      field_0: "text",
      field_1: 'author',
      field_2: "id",
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
      edit: {text: "Edit"},
      write: {
        text: "write",
        onClick: writeHandler
      }
    },
  };

  const ref = useRef(null);

  const showChart = async () => {
    console.log(data);
    // console.log(nodeData);

    // nodeMenuにWriteを追加
    data.nodeMenu.write = {
      text: "write",
      icon: writeLogo,
      onClick: writeHandler
    }
    console.log(data);
    // console.log(nodeData);

    // APIからノードの情報を取得
    var getNodes = await getNodeList();

    getNodes.map(node => {
      if (nodeList.length <= node.id){
        console.log(node);
        nodeList.push(node);
      }
      // setNodeList(nodeList.concat(node));
    } );

    console.log("nodeList : ", nodeList);
    // data.nodes = nodeList;
    nodeData.nodes = nodeList;
    // new window.OrgChart(ref.current, data);
    console.log("nodeData : ", nodeData);
    this.templates.luba.field_2 = '<Button variant="primary" onClick={() => setOpen(true)}>Write</Button>';
    new window.OrgChart(ref.current, nodeData);
  };

  useEffect(() => {
    showChart();
  }, []);

  return(
    <div>
      <div ref={ref} />
      <div>
        <Modal show={open} onHide={() => setOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Chart;
