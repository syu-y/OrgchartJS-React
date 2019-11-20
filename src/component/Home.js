import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import withDraggableColumns from 'react-table-hoc-draggable-columns';
import 'react-table-hoc-draggable-columns/dist/styles.css';
import { LinkContainer } from 'react-router-bootstrap'

function Home () {
  const ReactTableDraggableColumns = withDraggableColumns(ReactTable);

  return (
    <div>
      <h1>みんなで書く小説</h1>

      <ReactTableDraggableColumns
        draggableColumns= {{
          mode: 'reorder',
          draggable: ['title', 'totalTip']
        }}
        data={[
          {
            title: "吾輩は猫である",
            totalTip: 320,
            blockNumber: 10,
            // link: (<a href="/chart">Click Me!</a>)
            link: (<Link to="/chart">Click Me!</Link>)
          },
          {
            title: "銀河鉄道の夜",
            totalTip: 120,
            blockNumber: 7,
            // link: (<a href="/chart">Click Me!</a>)
            link: (<LinkContainer to="/chart"><Link >Click Me!</Link></LinkContainer>)
          },
          {
            title: "舞姫",
            totalTip: 87,
            blockNumber: 6,
            // link: (<a href="/chart">Click Me!</a>)
            link: (<LinkContainer to="/chart"><Link >Click Me!</Link></LinkContainer>)
          },
          {
            title: "走れメロス",
            totalTip: 6,
            blockNumber: 1,
            // link: (<a href="/chart">Click Me!</a>)
            link: (<LinkContainer to="/chart"><Link >Click Me!</Link></LinkContainer>)
          }
        ]}

        columns={[
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Total Tip',
            accessor: 'totalTip',
          },
          {
            Header: 'Block Number',
            accessor: 'blockNumber',
          },
          {
            Header: 'link',
            accessor: 'link',
          }
        ]}
      />
    </div>
  );
}

export default Home;
