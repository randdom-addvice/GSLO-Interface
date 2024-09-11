import React, { useContext, useEffect, useMemo, useState } from "react";
import { TradeContext } from "../contexts/TradeContext";

const TradeInput = ({ currentMarketPrices }) => {
  const {
    tradeInputValues,
    handleTradeInputChange,
    // tradeValues,
    calculateLotSize,
  } = useContext(TradeContext);

  const tradeValues = useMemo(
    () =>
      calculateLotSize(
        currentMarketPrices.bid,
        tradeInputValues.stopLoss,
        tradeInputValues.riskUsd,
        10,
        tradeInputValues.commissionUsd
      ),
    [currentMarketPrices, tradeInputValues]
  );

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
                  name="entry"
                  disabled
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
                  name="stopLoss"
                  onChange={handleTradeInputChange}
                  value={tradeInputValues.stopLoss}
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
                  name="equity"
                  onChange={handleTradeInputChange}
                  value={tradeInputValues.equity}
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
                  name="riskPercent"
                  onChange={handleTradeInputChange}
                  value={tradeInputValues.riskPercent}
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
                  name="riskUsd"
                  onChange={handleTradeInputChange}
                  value={tradeInputValues.riskUsd}
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
                  name="commissionUsd"
                  onChange={handleTradeInputChange}
                  value={tradeInputValues.commissionUsd}
                />
              </span>
            </div>
          </li>
          <li>
            <div>
              <span>Position Size</span>
              <span>
                <input
                  type="number"
                  value={tradeValues?.lotSize}
                  className="sl-input"
                  placeholder="Position Size"
                  name="position_size"
                  disabled
                />
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TradeInput;
