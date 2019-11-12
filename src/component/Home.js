import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home () {
  return (
    <div>
      <h1>Home画面</h1>
      <Link to="/chart">
        <button type="button">
            Click Me!
        </button>
      </Link>
    </div>
  );
}

export default Home;
