import React, { useState, useEffect, useRef, useHistory } from "react";
import Notification from "./NotificationMessageModal";
import { Modal, Form, Button } from "react-bootstrap";
import { useAuth0 } from "../react-auth0-spa";
import "bootstrap/dist/css/bootstrap.css";

// 編集用のロゴ
const writeIcon =
  '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="163.96439127408954 200.55172891423138 84.39409182274292 148.89620895844013" width="24" height="24"><defs><path d="M186.97 202.37C191.4 200.32 196.66 202.25 198.72 206.68C208.06 226.84 232.37 279.28 241.72 299.44C243.77 303.87 241.84 309.13 237.41 311.19C232.43 313.49 225.52 316.7 220.53 319.01C216.1 321.06 210.84 319.14 208.79 314.7C199.44 294.55 175.13 242.1 165.79 221.95C163.73 217.51 165.66 212.25 170.09 210.2C175.07 207.89 181.99 204.68 186.97 202.37Z" id="a3teER2aq"></path><path d="M227.64 331.42L210.48 317.7L226.66 309.48L242.84 301.26L243.81 323.2L244.79 345.14L227.64 331.42Z" id="g3jHW74tnN"></path><path d="M235.5 337.7L225.64 328.94L234.24 324.57L242.84 320.2L244.1 333.32L245.36 346.45L235.5 337.7Z" id="az3uIsU9L"></path></defs><g><g><use xlink:href="#a3teER2aq" opacity="1" fill="#6172E2" fill-opacity="1"></use></g><g><use xlink:href="#g3jHW74tnN" opacity="1" fill="#E2D661" fill-opacity="1"></use></g><g><use xlink:href="#az3uIsU9L" opacity="1" fill="#000000" fill-opacity="1"></use></g></g></svg>';

  const aReadIcon = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="170.14324833059007 201.92100500827868 220.59462221993894 240.95519278064623" width="24" height="24"><defs><path d="M204.57 230.88C179.95 238.08 165.82 263.88 173.02 288.5C182.53 321.01 198.01 373.94 207.51 406.45C214.72 431.07 240.52 445.2 265.14 438C291.89 430.17 327.56 419.74 354.31 411.92C378.94 404.72 393.06 378.92 385.86 354.3C376.35 321.79 360.87 268.85 351.37 236.35C344.17 211.72 318.37 197.6 293.74 204.8C266.99 212.62 231.32 223.05 204.57 230.88Z" id="a46wO3aUV4"></path><path d="M205.09 251.78C200.79 253.08 198.36 257.62 199.67 261.92C209.75 295.18 237.65 387.17 247.73 420.43C249.03 424.72 253.57 427.15 257.87 425.85C262.54 424.43 268.76 422.54 273.43 421.13C277.73 419.83 280.16 415.29 278.85 410.99C268.77 377.73 240.87 285.74 230.79 252.48C229.48 248.19 224.95 245.76 220.65 247.06C215.98 248.48 209.75 250.36 205.09 251.78Z" id="b7mGLURg4"></path><path d="M206.84 276.68C208.16 280.98 212.7 283.39 217 282.07C234.67 276.66 279.93 262.79 297.61 257.37C301.9 256.05 304.32 251.51 303 247.21C301.57 242.55 299.66 236.33 298.23 231.66C296.92 227.37 292.37 224.96 288.08 226.27C270.4 231.69 225.14 245.56 207.47 250.98C203.17 252.3 200.76 256.84 202.08 261.14C203.51 265.8 205.41 272.02 206.84 276.68Z" id="c1pqRGJgmW"></path><path d="M287.81 226.12C283.52 227.42 281.09 231.96 282.39 236.26C292.48 269.51 320.37 361.5 330.46 394.76C331.76 399.06 336.3 401.49 340.6 400.18C345.27 398.77 351.49 396.88 356.16 395.46C360.46 394.16 362.88 389.62 361.58 385.32C351.5 352.07 323.6 260.08 313.52 226.82C312.21 222.52 307.67 220.09 303.38 221.4C298.71 222.81 292.48 224.7 287.81 226.12Z" id="bf4KQzHDo"></path><path d="M229.43 343.91C230.75 348.2 235.29 350.61 239.59 349.3C257.26 343.88 302.52 330.01 320.2 324.59C324.49 323.28 326.9 318.73 325.59 314.44C324.16 309.77 322.25 303.55 320.82 298.89C319.51 294.6 314.96 292.18 310.67 293.5C292.99 298.92 247.73 312.79 230.06 318.2C225.76 319.52 223.35 324.07 224.66 328.36C226.09 333.02 228 339.24 229.43 343.91Z" id="dcRxtOgz1"></path></defs><g><g><use xlink:href="#a46wO3aUV4" opacity="1" fill="#2cc189" fill-opacity="1"></use></g><g><use xlink:href="#b7mGLURg4" opacity="1" fill="#ffffff" fill-opacity="1"></use></g><g><use xlink:href="#c1pqRGJgmW" opacity="1" fill="#ffffff" fill-opacity="1"></use></g><g><use xlink:href="#bf4KQzHDo" opacity="1" fill="#ffffff" fill-opacity="1"></use></g><g><use xlink:href="#dcRxtOgz1" opacity="1" fill="#ffffff" fill-opacity="1"></use></g></g></svg>`;

  const pReadIcon = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="170.14324833059007 201.92100500827868 220.59462221993894 240.95519278064623" width="24" height="24"><defs><path d="M204.57 230.88C179.95 238.08 165.82 263.88 173.02 288.5C182.53 321.01 198.01 373.94 207.51 406.45C214.72 431.07 240.52 445.2 265.14 438C291.89 430.17 327.56 419.74 354.31 411.92C378.94 404.72 393.06 378.92 385.86 354.3C376.35 321.79 360.87 268.85 351.37 236.35C344.17 211.72 318.37 197.6 293.74 204.8C266.99 212.62 231.32 223.05 204.57 230.88Z" id="b1jDNLWFLA"></path><path d="M205.09 251.78C200.79 253.08 198.36 257.62 199.67 261.92C209.75 295.18 237.65 387.17 247.73 420.43C249.03 424.72 253.57 427.15 257.87 425.85C262.54 424.43 268.76 422.54 273.43 421.13C277.73 419.83 280.16 415.29 278.85 410.99C268.77 377.73 240.87 285.74 230.79 252.48C229.48 248.19 224.95 245.76 220.65 247.06C215.98 248.48 209.75 250.36 205.09 251.78Z" id="b7mGLURg4"></path><path d="M206.84 276.68C208.16 280.98 212.7 283.39 217 282.07C234.67 276.66 279.93 262.79 297.61 257.37C301.9 256.05 304.32 251.51 303 247.21C301.57 242.55 299.66 236.33 298.23 231.66C296.92 227.37 292.37 224.96 288.08 226.27C270.4 231.69 225.14 245.56 207.47 250.98C203.17 252.3 200.76 256.84 202.08 261.14C203.51 265.8 205.41 272.02 206.84 276.68Z" id="c1pqRGJgmW"></path><path d="M287.81 226.12C283.52 227.42 281.09 231.96 282.39 236.26C287.95 254.59 302.28 301.83 307.84 320.16C309.14 324.46 313.68 326.89 317.98 325.58C322.64 324.17 328.87 322.28 333.54 320.87C337.83 319.56 340.26 315.02 338.96 310.73C333.4 292.39 319.08 245.16 313.52 226.82C312.21 222.52 307.67 220.09 303.38 221.4C298.71 222.81 292.48 224.7 287.81 226.12Z" id="a11HKxDu4C"></path><path d="M229.43 343.91C230.75 348.2 235.29 350.61 239.59 349.3C257.26 343.88 302.52 330.01 320.2 324.59C324.49 323.28 326.9 318.73 325.59 314.44C324.16 309.77 322.25 303.55 320.82 298.89C319.51 294.6 314.96 292.18 310.67 293.5C292.99 298.92 247.73 312.79 230.06 318.2C225.76 319.52 223.35 324.07 224.66 328.36C226.09 333.02 228 339.24 229.43 343.91Z" id="dcRxtOgz1"></path></defs><g><g><use xlink:href="#b1jDNLWFLA" opacity="1" fill="#0e80b3" fill-opacity="1"></use></g><g><use xlink:href="#b7mGLURg4" opacity="1" fill="#ffffff" fill-opacity="1"></use></g><g><use xlink:href="#c1pqRGJgmW" opacity="1" fill="#ffffff" fill-opacity="1"></use></g><g><use xlink:href="#a11HKxDu4C" opacity="1" fill="#ffffff" fill-opacity="1"></use></g><g><use xlink:href="#dcRxtOgz1" opacity="1" fill="#ffffff" fill-opacity="1"></use></g></g></svg>`;


// const server = 'https://mq8imozqve.execute-api.ap-northeast-1.amazonaws.com/dev';
const server = 'https://mxq8pxwcvf.execute-api.ap-northeast-1.amazonaws.com/dev';
// const server = "https://ybyek1k8a1.execute-api.ap-northeast-1.amazonaws.com/dev";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*"
};
// OrgChartコンポーネント
function Chart() {
  const nodeData = {
    template: "ula",
    scaleInitial: 0.7,
    enableSearch: true,
    smooth: 1,
    speed: 100,
    nodeBinding: {
      img_0: "img",
      field_0: "text",
      field_1: "author"
    },
    tags: {
      subroot: {
        //template: "polina"
      },
      mainroot: {
        //template: "ana"
      }
    },
    nodes: [],
    nodeMenu: {
      pRead: {
        text: "ここだけ読む",
        icon:pReadIcon,
        onClick: handlePReadShow
      },
      aRread: {
        text: "全部読む",
        icon:aReadIcon,
        onClick: handleAReadShow
      },
      write: {
        text: "書く",
        icon: writeIcon,
        // onClick: writeHandler
        onClick: handleWriteShow
      }
    },
  };

  const { loading, user } = useAuth0();

  const ref = useRef(null);
  //　表示するコンテンツ(State)
  const [showData, setShowData] = useState([]);
  //　現在選択されているノード(State)
  const [selectNode, setSelectNode] = useState(null);
  //　投げ銭額(State)
  const [tipValue, setTipValue] = useState(0);
  //　執筆内容(State)
  const [writeSentence, setWriteSentence] = useState("");
  //　現在のOrgChart(State)
  const [chart, setChart] = useState(nodeData);
  // モーダルが開いているか閉じているか(State)
  const [showPReadModal, setShowPReadModal] = useState(false);
  const [showAReadModal, setShowAReadModal] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);

  // モーダルの開閉ハンドラー
  function handleWriteShow(nodeId) {
    var handleNode = this.get(nodeId);
    setSelectNode(handleNode);
    console.log(handleNode);
    setChart(this);
    console.log("set chart is ...", this);
    setShowWriteModal(true);
  }
  function handleWriteClose() {
    setShowWriteModal(false);
  }
  function handlePReadShow(nodeId) {
    var handleNode = this.get(nodeId);
    setSelectNode(handleNode);
    setShowData(handleNode["text"]);
    console.log("handleNode : ", handleNode);
    setChart(this);
    setShowPReadModal(true);
  }
  function handlePReadClose() {
    setShowPReadModal(false);
  }
  function handleAReadShow(nodeId) {
    var handleNode = this.get(nodeId);
    setSelectNode(handleNode);

    var textList = [];
    var tmpNode = handleNode;
    while(true){
      textList.push(<div class="border-bottom border-success">{tmpNode.text}</div>);
      console.log("textList : ", textList);
      if(tmpNode['pid'] == 0) break;
      tmpNode = this.get(tmpNode['pid']);
    }

    setShowData(textList.reverse());
    console.log("handleNode : ", handleNode);
    setChart(this);
    setShowAReadModal(true);
  }
  function handleAReadClose() {
    setShowAReadModal(false);
  }
  // 投げ銭実行ハンドラ
  // const handleTipping = e => {
  async function handleTipping() {
    var updateNode = selectNode;
    console.log("Before updateNode : ", updateNode);
    console.log("tipValue : ", tipValue);
    updateNode["tip"] += tipValue;
    console.log("After updateNode : ", updateNode);
    setSelectNode(updateNode);
    chart.updateNode(updateNode);
    await updateTip({ node: updateNode });
    setShowPReadModal(false);
  };

  //　投げ銭額変更ハンドラ
  const handleTipChange = e => {
    setTipValue(Number(e.target.value));
    console.log("tip : ", tipValue);
  };

  // 執筆内容変更ハンドラ
  const handleWriteSentenceChange = e => {
    setWriteSentence(e.target.value);
    console.log("now write : ", writeSentence);
  };

  // NodoListを入れておく変数と更新する関数
  const [nodeList, setNodeList] = useState([]);

  // Node追加用ハンドラー
  async function writeHandler(nodeId) {
    if(user !== undefined){
      // ここに編集時の処理を追加
      var handleNode = selectNode;
      console.log("parentNode : ", handleNode);
      console.log("NodeList", nodeList);
      var getNodes = await getNodeList();
      // 新しく追加するNode
      var newNode = {
        id: getNodes.length + 1,
        pid: handleNode["id"],
        tip: 0,
        author: user.name,
        text: writeSentence,
        tags: ["subroot"],
        img: user.picture
      };
      await createNode({ node: newNode });
      console.log("add Node :", newNode);
      console.log("now user ...\n", user);
      chart.addNode(newNode);
      handleWriteClose(false);
    }
    // add(newNode);
    // showChart();
  }
  // GET:/todoにアクセスする関数
  // 全件取得する
  const getNodeList = async () => {
    try {
      const response = await fetch(`${server}/todo`).then(res =>
        res.clone().json()
      );
      console.log("get : ", response);
      return await response;
    } catch (e) {
      console.error(e);
    }
  };
  // POST:/todoにアクセスする関数
  // 1件DBに書き込む
  const createNode = async ({ node }) => {
    try {
      console.log("POST : ", node);
      await fetch(`${server}/todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(node)
      });
    } catch (e) {
      console.log(e);
    }
  };

  const updateTip = async ({ node }) => {
    var getNodes = await getNodeList();
    var updateNode = getNodes.find(x => x.id == node['id']);
    console.log("node : ", node);
    console.log("updateNode : ", updateNode);
    updateNode['tip'] = node['tip'];
    // var updateNode = nodeList.filter(function(item, index){
    //   if (item.id == node['id']) return true;
    // });
    try {
      console.log("PUT : ", updateNode);
      await fetch(`${server}/todo/${updateNode["id"]}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateNode)
      });
    } catch (e) {
      console.log(e);
    }
  };

  const showChart = async () => {
    console.log(nodeData);
    // nodeMenuにWriteを追加
    // nodeData.nodeMenu.write = {
    //   text: "write",
    //   icon: writeLogo,
    //   onClick: writeHandler
    // }
    console.log(nodeData);
    // APIからノードの情報を取得
    var getNodes = await getNodeList();
    var length = nodeList.length;
    getNodes.map(node => {
      if (length <= node.id) {
        console.log(node);
        // delete node.passHash;
        // delete node.hashText;
        nodeList.push(node);
      }
    });
    nodeData.nodes = JSON.parse(JSON.stringify(nodeList));

    nodeData.nodes.map( node => {
      delete node.passHash;
      delete node.hashText;
    });

    // new window.OrgChart(ref.current, data);
    console.log("nodeData : ", nodeData);
    console.log("nodeList : ", nodeList);
    console.log("now chart is ...\n", chart);
    setChart(new window.OrgChart(ref.current, nodeData));
  };

  useEffect(() => {
    console.log("initial chart", window.OrgChart);
    showChart();
  }, []);

  return (
    <div>
      <h1> 吾輩は猫である　</h1>
      <div ref={ref} />
      {/* 書く用のモーダル */}
      <div>
        <Modal show={showWriteModal} onHide={handleWriteClose}>
          <Modal.Header closeButton>
            <Modal.Title>みんなで書こう！</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Write!</Form.Label>
                <Form.Control
                  as="textarea"
                  size="lg"
                  onChange={handleWriteSentenceChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={writeHandler}>
                書く
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleWriteClose}>
              閉じる
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Modal show={showPReadModal} onHide={handlePReadClose}>
          <Modal.Header closeButton>
            <Modal.Title>読む</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{showData}</p>
            <div
              class="border-secondary border-top"
              style={{ padding: "10px" }}
            ></div>
            <Form>
              <Form.Group controlId="formBasicNumber">
                <Form.Label>投げ銭</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  onChange={handleTipChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleTipping}>
                投げる
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlePReadClose}>
              閉じる
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Modal show={showAReadModal} onHide={handleAReadClose}>
          <Modal.Header closeButton>
            <Modal.Title>読む</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showData}
            <div
              class="border-secondary border-top"
              style={{ padding: "10px" }}
            ></div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAReadClose}>
              閉じる
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
export default Chart;
