import React, { useState, useEffect, useRef, useHistory } from "react";
import CustomeModal from "./CustomModal";
import Notification from "./NotificationMessageModal";
import FormModal from "./FormModal";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
// 編集用のロゴ
const writeLogo =
  '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="163.96439127408954 200.55172891423138 84.39409182274292 148.89620895844013" width="24" height="24"><defs><path d="M186.97 202.37C191.4 200.32 196.66 202.25 198.72 206.68C208.06 226.84 232.37 279.28 241.72 299.44C243.77 303.87 241.84 309.13 237.41 311.19C232.43 313.49 225.52 316.7 220.53 319.01C216.1 321.06 210.84 319.14 208.79 314.7C199.44 294.55 175.13 242.1 165.79 221.95C163.73 217.51 165.66 212.25 170.09 210.2C175.07 207.89 181.99 204.68 186.97 202.37Z" id="a3teER2aq"></path><path d="M227.64 331.42L210.48 317.7L226.66 309.48L242.84 301.26L243.81 323.2L244.79 345.14L227.64 331.42Z" id="g3jHW74tnN"></path><path d="M235.5 337.7L225.64 328.94L234.24 324.57L242.84 320.2L244.1 333.32L245.36 346.45L235.5 337.7Z" id="az3uIsU9L"></path></defs><g><g><use xlink:href="#a3teER2aq" opacity="1" fill="#6172E2" fill-opacity="1"></use></g><g><use xlink:href="#g3jHW74tnN" opacity="1" fill="#E2D661" fill-opacity="1"></use></g><g><use xlink:href="#az3uIsU9L" opacity="1" fill="#000000" fill-opacity="1"></use></g></g></svg>';
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
      read: {
        text: "読む",
        icon: writeLogo,
        onClick: handleReadShow
      },
      write: {
        text: "書く",
        icon: writeLogo,
        // onClick: writeHandler
        onClick: handleWriteShow
      }
    },
  };

  const ref = useRef(null);
  //　表示するコンテンツ(State)
  const [showData, setShowData] = useState("");
  //　現在選択されているノード(State)
  const [selectNode, setSelectNode] = useState(null);
  //　投げ銭額(State)
  const [tipValue, setTipValue] = useState(0);
  //　執筆内容(State)
  const [writeSentence, setWriteSentence] = useState("");
  //　現在のOrgChart(State)
  const [chart, setChart] = useState(nodeData);
  // モーダルが開いているか閉じているか(State)
  const [showReadModal, setShowReadModal] = useState(false);
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
  function handleReadShow(nodeId) {
    var handleNode = this.get(nodeId);
    setSelectNode(handleNode);
    setShowData(handleNode["text"]);
    console.log("handleNode : ", handleNode);
    setChart(this);
    setShowReadModal(true);
  }
  function handleReadClose() {
    setShowReadModal(false);
  }
  // 投げ銭実行ハンドラ
  const handleTipping = e => {
    var updateNode = selectNode;
    console.log("Before updateNode : ", updateNode);
    console.log("tipValue : ", tipValue);
    updateNode["tip"] += tipValue;
    console.log("After updateNode : ", updateNode);
    setSelectNode(updateNode);
    chart.updateNode(updateNode);
    setShowReadModal(false);
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
    // ここに編集時の処理を追加
    var handleNode = selectNode;
    console.log("parentNode : ", handleNode);
    // 新しく追加するNode
    var newNode = {
      id: nodeList.length + 1,
      pid: handleNode["id"],
      tip: 0,
      author: "someone",
      text: writeSentence,
      tags: ["subroot"],
      img: "https://www.silhouette-illust.com/wp-content/uploads/2019/10/person_beginner_46673-101x101.jpg"
    };
    await createNode({ node: newNode });
    console.log("add Node :", newNode);
    chart.addNode(newNode);
    handleWriteClose(false);
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
    // var getNodes = [
    //   { id: 1, pid: 0, tip: 10, author: 'Amber McKenzie', text: "吾輩わがはいは猫である。名前はまだ無い。どこで生れたかとんと見当けんとうがつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪どうあくな種族であったそうだ。この書生というのは時々我々を捕つかまえて煮にて食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌てのひらに載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。", tags: ["mainroot"]},
    //   { id: 2, pid: 1, tip: 30, author: 'Ava Field', text: "掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始みはじめであろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶やかんだ。その後ご猫にもだいぶ逢あったがこんな片輪かたわには一度も出会でくわした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙けむりを吹く。どうも咽むせぽくて実に弱った。これが人間の飲む煙草たばこというものである事はようやくこの頃知った。", tags: ["mainroot"]},
    //   { id: 3, pid: 1, tip: 5, author: 'Peter Stevens', text: "まだ春は浅く、そしてその日は曇くもっていて、西空に密雲がたれこみ、日が早く暮れかけていた。青二は、すきな歌を、かたっぱしから口笛で吹いて、いい気持で歩いていった。そのとき、道ばたで、「にゃーお」と、猫のなき声がした。青二は猫が大好きだった。この間まで、青二の家にもミイという猫がいたが、それは近所の犬の群れにかこまれて、むざんにもかみ殺されてしまった。青二はそのとき、わあわあと泣いたものだ。ミイが殺されてから、青二の家には猫がいない。", tags: ["subroot"]},
    // ];
    var length = nodeList.length;
    getNodes.map(node => {
      if (length <= node.id) {
        console.log(node);
        delete node.passHash;
        delete node.hashText;
        nodeList.push(node);
        // setNodeList([...nodeList, node]);
      }
      // setNodeList(nodeList.concat(node));
    });
    console.log("nodeList : ", nodeList);
    nodeData.nodes = nodeList;
    // new window.OrgChart(ref.current, data);
    console.log("nodeData : ", nodeData);
    console.log("now chart is ...\n", chart);
    setChart(new window.OrgChart(ref.current, nodeData));
  };

  useEffect(() => {
    console.log("initial chart", window.OrgChart);
    showChart();
  }, []);

  return (
    <div>
      <h1> タイトル　</h1>
      <div ref={ref} />
      {/* 書く用のモーダル */}
      <div>
        <Modal show={showWriteModal} onHide={handleWriteClose}>
          <Modal.Header closeButton>
            <Modal.Title>Write</Modal.Title>
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
                write
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleWriteClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Modal show={showReadModal} onHide={handleReadClose}>
          <Modal.Header closeButton>
            <Modal.Title>Read</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{showData}</p>
            <div
              class="border-secondary border-top"
              style={{ padding: "10px" }}
            ></div>
            <Form>
              <Form.Group controlId="formBasicNumber">
                <Form.Label>Tipping!</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  onChange={handleTipChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleTipping}>
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleReadClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* <Notification in={true} /> */}
      {/* <CustomeModal show={show}/> */}
    </div>
  );
}
export default Chart;
