import React from "react";

const tradeOutput = () => {
  return (
    <div className="tradeBlock-output">
      <h3>Output</h3>
      <div className="card">
        <ul>
          <li>
            <div>
              <span>Entry</span>
            </div>
          </li>
          <li>
            <div>
              <span>Direction</span>
            </div>
          </li>
          <li>
            <div>
              <span>Stop Loss</span>
            </div>
          </li>
          <li>
            <div>
              <span>Account Equity</span>
            </div>
          </li>
          <li>
            <div>
              <span>Risk %</span>
            </div>
          </li>
          <li>
            <div>
              <span>Risk USD</span>
            </div>
          </li>
          <li>
            <div>
              <span>Commission USD</span>
            </div>
          </li>
          <li>
            <div>
              <span>Position Size</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default tradeOutput;
