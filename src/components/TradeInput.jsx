import React from "react";

const TradeInput = ({ currentMarketPrices }) => {
  return (
    <div className="tradeBlock-input">
      <h3>Input</h3>
      <div className="card">
        <ul>
          <li>
            <div>
              <span>Entry</span>
              <span>
                <input
                  type="number"
                  value={currentMarketPrices.bid}
                  className="sl-input"
                  placeholder="Entry"
                />
              </span>
            </div>
          </li>
          <li>
            <div>
              <span>Stop Loss</span>
              <span>
                <input
                  type="number"
                  className="sl-input"
                  placeholder="stop loss"
                />
              </span>
            </div>
          </li>
          <li>
            <div>
              <span>Account Equity</span>
              <span>
                <input
                  type="number"
                  className="sl-input"
                  placeholder="Account Equity"
                />
              </span>
            </div>
          </li>
          <li>
            <div>
              <span>Risk %</span>
              <span>
                <input
                  type="number"
                  className="sl-input"
                  placeholder="Risk %"
                />
              </span>
            </div>
          </li>
          <li>
            <div>
              <span>Risk USD</span>
              <span>
                <input
                  type="number"
                  className="sl-input"
                  placeholder="Risk USD"
                />
              </span>
            </div>
          </li>
          <li>
            <div>
              <span>Commission USD</span>
              <span>
                <input
                  type="number"
                  className="sl-input"
                  placeholder="Commission USD"
                />
              </span>
            </div>
          </li>
          <li>
            <div>
              <span>Position Size</span>
              <span></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TradeInput;
